/* Tutorial 04 pipeline: custom code with the function block.
 * Chart missing a column -> write 3 lines of R -> Run -> chart lives.
 * Usage: node tutorial-04.cjs <app-url> <out-dir>
 */
const { chromium } = require('/workspace/node_modules/playwright');
const path = require('path');
const fs = require('fs');

const URL = process.argv[2] || 'http://127.0.0.1:4848/';
const OUT = process.argv[3] || path.join(__dirname, 'tut04-out');
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
  await sleep(10000);
  await page.evaluate(OVERLAY_JS);

  // Beat A: the function block, plain R inside the workflow
  await caption('Penguins has no bill-ratio column, and no block computes one');
  await page.locator('[id*="dock-tab"][id*="fn"]').first().click();
  await sleep(3000);
  await shot(page, '01-fn-panel.png');
  await sleep(800);
  await caption('The function block: plain R, inside the workflow');
  await page.locator('[title="Edit function"]').first().click();
  await sleep(2500);

  // Beat C: type the function
  await caption('Three lines of plain R');
  await page.locator('.cm-content').click();
  await page.keyboard.press('Control+a');
  await page.keyboard.press('Delete');
  await page.keyboard.type(
    'function(data) {\n  data$bill_ratio <- data$bill_len / data$bill_dep\n  data\n}',
    { delay: 35 }
  );
  await sleep(800);
  await shot(page, '02-code.png');

  // Beat D: run it
  await caption('Run: the block adds the column');
  await page.locator('[id*="block_panel-fn"] button', { hasText: 'Run' }).first().click();
  await sleep(4000);
  await shot(page, '03-run.png');

  // Beat E: the chart springs to life
  await caption('Downstream, it works like any column');
  await page.locator('[id*="dock-tab"][id*="chart"]').first().click();
  await sleep(4000);
  await shot(page, '04-chart.png');

  await caption('One-off logic lives in the board; reusable ideas become blocks');
  await sleep(2000);
  await caption(null);

  await context.close();
  await browser.close();
  console.log('video:', fs.readdirSync(VIDEO));
})().catch((e) => { console.error(e); process.exit(1); });
