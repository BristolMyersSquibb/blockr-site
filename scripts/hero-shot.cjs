const { chromium } = require('/workspace/node_modules/playwright');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const browser = await chromium.launch({ executablePath: '/usr/bin/chromium', args: ['--no-sandbox'], headless: true });
  const page = await (await browser.newContext({ viewport: { width: 1400, height: 980 }, deviceScaleFactor: 2 })).newPage();
  await page.goto('http://127.0.0.1:4848/');
  await page.waitForSelector('.g6', { timeout: 60000 });
  await sleep(11000);
  await page.evaluate(() => window.dispatchEvent(new Event('resize')));
  await sleep(800);
  await page.evaluate(async () => {
    const el = document.querySelector('.g6');
    const g = HTMLWidgets.find('#' + el.id).getWidget();
    await g.fitView();
    if (g.getZoom() > 1.1) { await g.zoomTo(1); await g.fitCenter(); }
  });
  await sleep(1500);
  const box = await page.evaluate(() => {
    const el = document.querySelector('.g6');
    const g = HTMLWidgets.find('#' + el.id).getWidget();
    const rect = el.getBoundingClientRect();
    let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
    for (const n of g.getNodeData()) {
      const b = g.getElementRenderBounds(n.id);
      const [ax, ay] = g.getViewportByCanvas([b.min[0], b.min[1]]);
      const [bx, by] = g.getViewportByCanvas([b.max[0], b.max[1]]);
      x0 = Math.min(x0, ax); y0 = Math.min(y0, ay);
      x1 = Math.max(x1, bx); y1 = Math.max(y1, by);
    }
    return { x: rect.x + x0 - 50, y: rect.y + y0 - 40, width: x1 - x0 + 100, height: y1 - y0 + 80 };
  });
  console.log('clip:', JSON.stringify(box));
  await page.screenshot({ path: 'hero-new.png', clip: box });
  console.log('done');
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
