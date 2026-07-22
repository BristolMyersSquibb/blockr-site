/* Tutorial 01 pipeline: drives a fresh blockr app through the "Build your
 * first app" flow, recording a video (burned-in captions, fake cursor) and
 * taking screenshots at each beat.
 *
 * Usage: node tutorial-01.cjs <app-url> <out-dir>
 * Output: <out-dir>/shots/*.png and <out-dir>/video/*.webm
 */
const { chromium } = require('/workspace/node_modules/playwright');
const path = require('path');
const fs = require('fs');

const URL = process.argv[2] || 'http://127.0.0.1:4848/';
const OUT = process.argv[3] || path.join(__dirname, 'tut01-out');
const SHOTS = path.join(OUT, 'shots');
const VIDEO = path.join(OUT, 'video');
fs.mkdirSync(SHOTS, { recursive: true });
fs.mkdirSync(VIDEO, { recursive: true });

const VP = { width: 1152, height: 780 };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Fake cursor + caption bar: headless recordings have no pointer, and the
// captions narrate what is happening.
const OVERLAY_JS = `
  (() => {
    if (window.__cursor) return;
    const c = document.createElement('div');
    c.style.cssText = 'position:fixed;z-index:99999;width:14px;height:14px;' +
      'border-radius:50%;background:rgba(30,30,40,0.75);border:2px solid #fff;' +
      'box-shadow:0 1px 4px rgba(0,0,0,0.4);pointer-events:none;' +
      'transform:translate(-50%,-50%);left:-50px;top:-50px';
    document.body.appendChild(c);
    window.__cursor = c;
    document.addEventListener('mousemove', (e) => {
      c.style.left = e.clientX + 'px';
      c.style.top = e.clientY + 'px';
    }, true);
    document.addEventListener('mousedown', () => { c.style.background = '#2E6BE6'; }, true);
    document.addEventListener('mouseup', () => { c.style.background = 'rgba(30,30,40,0.75)'; }, true);

    const cap = document.createElement('div');
    cap.style.cssText = 'position:fixed;z-index:99998;left:50%;bottom:26px;' +
      'transform:translateX(-50%);max-width:70%;padding:10px 22px;' +
      'background:rgba(24,24,32,0.85);color:#fff;border-radius:10px;' +
      'font:500 20px/1.4 system-ui,sans-serif;text-align:center;' +
      'pointer-events:none;opacity:0;transition:opacity 0.25s';
    document.body.appendChild(cap);
    window.__caption = (t) => {
      if (!t) { cap.style.opacity = '0'; return; }
      cap.textContent = t;
      cap.style.opacity = '1';
    };
  })();
`;

async function caption(page, text) {
  await page.evaluate((t) => window.__caption(t), text);
  await sleep(700); // give viewers a beat to read before action starts
}

async function smoothMove(page, x, y, steps = 16) {
  await page.mouse.move(x, y, { steps });
}

async function shot(page, name) {
  await page.screenshot({ path: path.join(SHOTS, name) });
  console.log('shot:', name);
}

// Node coords straight from the g6 graph (no hardcoded pixels).
async function nodeBounds(page) {
  return page.evaluate(() => {
    const el = document.querySelector('.g6');
    const w = HTMLWidgets.find('#' + el.id);
    const g = w.getWidget();
    const rect = el.getBoundingClientRect();
    const out = {};
    for (const n of g.getNodeData()) {
      const b = g.getElementRenderBounds(n.id);
      const [x0, y0] = g.getViewportByCanvas([b.min[0], b.min[1]]);
      const [x1, y1] = g.getViewportByCanvas([b.max[0], b.max[1]]);
      out[n.id] = {
        cx: rect.x + (x0 + x1) / 2,
        top: rect.y + y0,
        bottom: rect.y + y1,
        cy: rect.y + (y0 + y1) / 2
      };
    }
    return out;
  });
}

async function autoFit(page) {
  await page.evaluate(() => window.dispatchEvent(new Event('resize')));
  await sleep(500);
  await page.evaluate(async () => {
    const el = document.querySelector('.g6');
    const g = HTMLWidgets.find('#' + el.id).getWidget();
    await g.fitView();
    if (g.getZoom() > 1.1) { await g.zoomTo(1); await g.fitCenter(); }
  });
  await sleep(700);
}

async function connect(page, from, to) {
  await smoothMove(page, from.cx, from.cy, 14);
  await sleep(400);
  await smoothMove(page, from.cx, from.bottom - 4, 8);
  await sleep(250);
  await page.mouse.down();
  await sleep(150);
  await smoothMove(page, to.cx, to.top + 4, 22);
  await sleep(350);
}

async function pickFromBrowser(page, query, cardText) {
  // Both the add-mode and append-mode sidebar can exist in the DOM at once;
  // target the visible (latest) instance of search box and card.
  const search = page.locator('input[placeholder*="Search"]:visible').last();
  await search.click();
  await search.fill(''); // the box keeps the previous query
  await search.pressSequentially(query, { delay: 45 });
  await sleep(700);
  const card = page
    .locator('.blockr-block-browser-card:visible')
    .filter({ has: page.locator('.blockr-block-browser-card-name', { hasText: cardText }) })
    .last();
  await card.hover();
  await sleep(250);
  return card;
}

async function addBlockViaMenu(page, cx, cy, query, cardText) {
  await smoothMove(page, cx, cy);
  await page.mouse.click(cx, cy, { button: 'right' });
  await sleep(600);
  const menu = page.getByText('Add block', { exact: true }).first();
  await menu.hover();
  await sleep(200);
  await menu.click();
  await sleep(800);
  return pickFromBrowser(page, query, cardText);
}

// Drag from a node's output port to empty canvas: the picker opens in
// append mode and the chosen block arrives already connected.
async function appendViaPort(page, from, query, cardText) {
  await smoothMove(page, from.cx, from.cy, 14);
  await sleep(400);
  await smoothMove(page, from.cx, from.bottom - 4, 8);
  await sleep(250);
  await page.mouse.down();
  await sleep(150);
  await smoothMove(page, from.cx + 150, from.bottom + 140, 20);
  await sleep(300);
  await page.mouse.up();
  await sleep(1000);
  return pickFromBrowser(page, query, cardText);
}

async function pickRole(page, rowSel, optionText) {
  await page.locator(`${rowSel} .blockr-select__control`).first().click();
  await sleep(450);
  await page.locator('.blockr-select__option:visible', { hasText: optionText }).first().click();
  await sleep(900);
}

(async () => {
  const browser = await chromium.launch({
    executablePath: '/usr/bin/chromium',
    args: ['--no-sandbox'],
    headless: true
  });
  const context = await browser.newContext({
    viewport: VP,
    recordVideo: { dir: VIDEO, size: VP }
  });
  const page = await context.newPage();
  await page.goto(URL);
  await page.waitForSelector('.g6', { timeout: 60000 });
  await page.getByText('Start building your workflow').waitFor({ timeout: 30000 });
  await sleep(1200);
  await page.evaluate(OVERLAY_JS);

  // Beat A: blank canvas
  await caption(page, 'Every blockr app starts with a blank canvas');
  await shot(page, '01-blank-canvas.png');
  await sleep(900);

  // Beat B: add the dataset block
  await caption(page, 'Right-click the canvas and pick "Add block"');
  const dataCard = await addBlockViaMenu(page, 360, 420, 'dataset', 'dataset block');
  await caption(page, 'Search, then click the "dataset block"');
  await shot(page, '02-picker-search.png');
  await dataCard.click();
  await sleep(2200);
  const dataId = Object.keys(await nodeBounds(page))[0];

  // Beat C: pick penguins
  await caption(page, 'Choose the penguins dataset');
  await autoFit(page);
  await page.locator('.selectize-control .selectize-input').first().click();
  await sleep(500);
  await page.locator('.selectize-input input:visible').first()
    .pressSequentially('penguins', { delay: 45 });
  await sleep(600);
  await page.locator('.selectize-dropdown-content .option:visible')
    .filter({ hasText: 'penguins' }).first().click();
  await sleep(2200);
  await shot(page, '03-penguins.png');

  // Beat D: drag from the output port to add a connected filter block
  await caption(page, 'Drag from the output port to add a connected block');
  const nb0 = await nodeBounds(page);
  const filtCard = await appendViaPort(page, nb0[dataId], 'Filter Rows', 'Filter Rows');
  await shot(page, '04-append-picker.png');
  await filtCard.click();
  await sleep(2200);
  await autoFit(page);
  await shot(page, '05-filter-appended.png');
  const filterId = Object.keys(await nodeBounds(page)).find((i) => i !== dataId);

  // Beat F: configure the filter via its JS API
  await caption(page, 'Keep only the Adelie and Chinstrap penguins');
  await page.evaluate(() => {
    const el = document.querySelector('.filter-block-container');
    el._block.setState({
      conditions: [{ type: 'values', column: 'species',
                     values: ['Adelie', 'Chinstrap'], mode: 'include',
                     colType: 'factor' }],
      operator: '&'
    });
    el._block._submit();
  });
  await sleep(2400);
  await shot(page, '07-filter-values.png');

  // Beat G: add the ggplot block unconnected, then connect port to port
  await caption(page, 'Add a ggplot block, unconnected this time');
  const nb1 = await nodeBounds(page);
  const emptyY2 = Math.min(700, Math.max(...Object.values(nb1).map((n) => n.bottom)) + 120);
  const ggCard = await addBlockViaMenu(page, 420, emptyY2, 'ggplot', 'ggplot');
  await ggCard.click();
  await sleep(2200);
  await autoFit(page);
  await caption(page, 'Connect: drag from output port to input port');
  const nb2 = await nodeBounds(page);
  const plotId = Object.keys(nb2).find((i) => i !== dataId && i !== filterId);
  await connect(page, nb2[filterId], nb2[plotId]);
  await shot(page, '08-connect-drag.png');
  await page.mouse.up();
  await sleep(2200);

  // Beat H: map x, y, and color
  await caption(page, 'Map the axes, then color by species');
  await pickRole(page, '.dd-role-x', 'bill_len');
  await pickRole(page, '.dd-role-y', 'bill_dep');
  await page.locator('.dd-add-trigger:visible').first().click();
  await sleep(500);
  await page.getByText('Color by', { exact: true }).first().click();
  await sleep(600);
  await pickRole(page, '.dd-role-color', 'species');
  await sleep(1800);

  // Hide the controls so the plot fills the panel (Controls toggle).
  await caption(page, 'Hide the controls: the block shows just the plot');
  await page.locator('.blockr-section-toggle:visible .btn').first().click();
  await sleep(1500);
  await caption(page, 'A live pipeline: change the filter and the plot follows');
  await shot(page, '09-scatter.png');
  await sleep(1600);
  await caption(page, null);

  await context.close(); // flushes the video
  await browser.close();
  const vids = fs.readdirSync(VIDEO);
  console.log('video:', vids);
})().catch((e) => { console.error(e); process.exit(1); });
