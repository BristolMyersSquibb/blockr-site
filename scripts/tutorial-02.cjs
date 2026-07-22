/* Tutorial 02 pipeline: starts from the tutorial-01 end-state board and
 * turns it into a dashboard: split panels, close chrome, resize, toggle
 * Controls/Preview. Records video + screenshots.
 *
 * Usage: node tutorial-02.cjs <app-url> <out-dir>
 */
const { chromium } = require('/workspace/node_modules/playwright');
const path = require('path');
const fs = require('fs');

const URL = process.argv[2] || 'http://127.0.0.1:4848/';
const OUT = process.argv[3] || path.join(__dirname, 'tut02-out');
const SHOTS = path.join(OUT, 'shots');
const VIDEO = path.join(OUT, 'video');
fs.mkdirSync(SHOTS, { recursive: true });
fs.mkdirSync(VIDEO, { recursive: true });

const VP = { width: 1152, height: 780 };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

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
      c.style.left = e.clientX + 'px'; c.style.top = e.clientY + 'px';
    }, true);
    document.addEventListener('mousedown', () => { c.style.background = '#2E6BE6'; }, true);
    document.addEventListener('mouseup', () => { c.style.background = 'rgba(30,30,40,0.75)'; }, true);
    const cap = document.createElement('div');
    cap.style.cssText = 'position:fixed;z-index:99998;left:50%;bottom:26px;' +
      'transform:translateX(-50%);max-width:75%;padding:10px 22px;' +
      'background:rgba(24,24,32,0.85);color:#fff;border-radius:10px;' +
      'font:500 20px/1.4 system-ui,sans-serif;text-align:center;' +
      'pointer-events:none;opacity:0;transition:opacity 0.25s';
    document.body.appendChild(cap);
    window.__caption = (t) => {
      if (!t) { cap.style.opacity = '0'; return; }
      cap.textContent = t; cap.style.opacity = '1';
    };
  })();
`;

async function shot(page, name) {
  await page.screenshot({ path: path.join(SHOTS, name) });
  console.log('shot:', name);
}

(async () => {
  const browser = await chromium.launch({
    executablePath: '/usr/bin/chromium',
    args: ['--no-sandbox'],
    headless: true
  });
  const context = await browser.newContext({ viewport: VP, recordVideo: { dir: VIDEO, size: VP } });
  const page = await context.newPage();
  const caption = async (t) => { await page.evaluate((x) => window.__caption(x), t); await sleep(900); };
  await page.goto(URL);
  await page.waitForSelector('.g6', { timeout: 60000 });
  await sleep(8000);
  await page.evaluate(OVERLAY_JS);

  // Beat A: starting point
  await caption('The workflow from the last tutorial');
  await shot(page, '01-start.png');
  await sleep(800);

  // Beat B: give the plot its own panel (drag tab to the right edge)
  await caption('Drag the Ggplot tab to the right edge');
  const plotTab = await page.locator('[id*="dock-tab"][id*="plot"]').first().boundingBox();
  await page.mouse.move(plotTab.x + plotTab.width / 2, plotTab.y + plotTab.height / 2, { steps: 10 });
  await page.mouse.down();
  await sleep(300);
  await page.mouse.move(1130, 420, { steps: 30 });
  await sleep(600);
  await shot(page, '02-drag-split.png');
  await page.mouse.up();
  await sleep(2500);
  await shot(page, '03-split.png');

  // Beat C: close what dashboard users don't need
  await caption('Close the panels your users don’t need');
  const wfTab = page.locator('.dv-default-tab', { hasText: 'Workflow' }).first();
  await wfTab.hover();
  await sleep(300);
  await wfTab.locator('.dv-default-tab-action').click();
  await sleep(1800);
  const dsTab = page.locator('.dv-default-tab', { hasText: 'Dataset' }).first();
  await dsTab.hover();
  await sleep(300);
  await dsTab.locator('.dv-default-tab-action').click();
  await sleep(1800);
  await shot(page, '04-closed.png');

  // Beat D: resize (drag the sash between the two panels)
  await caption('Resize panels by dragging the divider');
  const sash = await page.evaluate(() => {
    const sashes = Array.from(document.querySelectorAll('.dv-sash'))
      .map((el) => { const r = el.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2, w: r.width, h: r.height }; })
      .filter((s) => s.h > 100); // vertical sashes only
    sashes.sort((a, b) => a.x - b.x);
    return sashes[sashes.length - 1] || null;
  });
  if (sash) {
    await page.mouse.move(sash.x, 400, { steps: 10 });
    await page.mouse.down();
    await sleep(200);
    await page.mouse.move(sash.x - 160, 400, { steps: 20 });
    await sleep(300);
    await page.mouse.up();
    await sleep(1500);
  }

  // Beat E: toggles — hide the filter's preview, then the plot's controls
  await caption('Hide the filter’s preview: the eye toggle');
  const filterPanel = page.locator('[id*="block_panel-filter"]');
  await filterPanel.locator('.blockr-section-toggle .btn').nth(1).click();
  await sleep(1800);
  await caption('Hide the plot’s controls: the sliders toggle');
  const plotPanel = page.locator('[id*="block_panel-plot"]');
  await plotPanel.locator('.blockr-section-toggle .btn').nth(0).click();
  await sleep(1800);
  await shot(page, '05-toggles.png');

  // Beat F: use it — change the filter, watch the plot
  await caption('It stays live: drop a species and the plot follows');
  try {
    const chip = filterPanel
      .locator('.blockr-select__tag', { hasText: 'Chinstrap' })
      .locator('.blockr-select__tag-remove')
      .first();
    const chipBox = await chip.boundingBox();
    await page.mouse.move(chipBox.x + chipBox.width / 2, chipBox.y + chipBox.height / 2, { steps: 12 });
    await sleep(300);
    await chip.click();
    await sleep(600);
    await page.keyboard.press('Escape'); // close the dropdown if it opened
    await page.mouse.move(576, 500, { steps: 8 });
    await sleep(2500);
  } catch (e) {
    console.log('chip removal skipped:', e.message.slice(0, 80));
  }
  await caption('A dashboard: controls and chart, nothing else');
  await shot(page, '06-final.png');
  await sleep(1600);
  await caption(null);

  await context.close();
  await browser.close();
  console.log('video:', fs.readdirSync(VIDEO));
})().catch((e) => { console.error(e); process.exit(1); });
