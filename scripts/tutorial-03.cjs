/* Tutorial 03 pipeline: many linked tables with blockr.dm.
 * Model view -> flatten -> chart -> filter the model -> drill.
 * Usage: node tutorial-03.cjs <app-url> <out-dir>
 */
const { chromium } = require('/workspace/node_modules/playwright');
const path = require('path');
const fs = require('fs');

const URL = process.argv[2] || 'http://127.0.0.1:4848/';
const OUT = process.argv[3] || path.join(__dirname, 'tut03-out');
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

async function barPoint(page, category) {
  return page.evaluate((cat) => {
    const div = Array.from(document.querySelectorAll('div'))
      .find((el) => el.getAttribute && el.getAttribute('_echarts_instance_') && el.offsetParent);
    if (!div || !window.echarts) return null;
    const inst = echarts.getInstanceByDom(div);
    if (!inst) return null;
    const opt = inst.getOption();
    const cats = (opt.yAxis && opt.yAxis[0] && opt.yAxis[0].data) ||
                 (opt.xAxis && opt.xAxis[0] && opt.xAxis[0].data) || [];
    const idx = cats.indexOf(cat);
    if (idx < 0) return null;
    const raw = opt.series[0].data[idx];
    const val = (raw && raw.value !== undefined) ? raw.value : raw;
    const p = inst.convertToPixel({ seriesIndex: 0 }, [val / 2, idx]);
    const r = div.getBoundingClientRect();
    return { x: r.x + p[0], y: r.y + p[1] };
  }, category);
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

  // Beat A: the data model
  await caption('One source, four linked tables: a data model');
  await page.locator('[id*="dock-tab"][id*="model"]').first().click();
  await sleep(3000);
  await shot(page, '01-model.png');
  await sleep(1200);

  // Beat B: flattened orders
  await caption('One block joins orders across all the keys');
  await page.locator('[id*="dock-tab"][id*="flat"]').first().click();
  await sleep(3000);
  await shot(page, '02-flat.png');
  await sleep(800);

  // Beat C: chart on the flat table
  await caption('Revenue by category, straight from the model');
  await page.locator('[id*="dock-tab"][id*="chart"]').first().click();
  await sleep(3000);
  await shot(page, '03-chart.png');
  await sleep(800);

  // Beat E: drill into a category
  await caption('Click a bar: the table shows those orders');
  const pt = await barPoint(page, 'Electronics');
  if (pt) {
    await page.mouse.move(pt.x, pt.y, { steps: 14 });
    await sleep(400);
    await page.mouse.click(pt.x, pt.y);
    await sleep(3000);
  }
  await page.locator('[id*="dock-tab"][id*="table"]').first().click();
  await sleep(2500);
  await shot(page, '05-drill.png');

  await caption('Many tables, one workflow');
  await sleep(1800);
  await caption(null);

  await context.close();
  await browser.close();
  console.log('video:', fs.readdirSync(VIDEO));
})().catch((e) => { console.error(e); process.exit(1); });
