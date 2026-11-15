// Tutorial 3 (learn/03-many-tables.md), recorded on an empty board from the
// one-line install (blockr::run_app(), see README.md). One take gives the
// video and the stills the page uses.
// usage: node story-tutorial-03.cjs <out> [url] [--no-record]
const fs = require('fs');
const { film } = require('./film.cjs');
const { board } = require('./story-lib.cjs');
const out = process.argv[2] || 'tut03';
const url = process.argv[3] && !process.argv[3].startsWith('--') ? process.argv[3] : 'http://127.0.0.1:4010/';
const record = !process.argv.includes('--no-record');
const STILLS = out + '-stills';

(async () => {
  fs.mkdirSync(STILLS, { recursive: true });
  const S = await film({ url, out, captions: false, record, viewport: { width: 1152, height: 780 } });
  const { p, f } = S;
  global.__page = p;
  const B = board(S, STILLS);
  await f.waitForSelector('text=No blocks yet', { timeout: 60000 });
  await S.settle(1500, 800);

  await S.start();
  await S.wait(1200);

  // 1. data model
  await S.caption('Add an "Example data model" block');
  const c = await B.canvas();
  await B.addViaMenu(c.x + c.width / 2, c.y + 200, 'data model', 'Example data model');
  await f.waitForSelector('text=orders', { timeout: 20000 });
  await S.settle(1500);
  await S.moveTo(800, 650);
  await S.wait(600);
  await B.still('03-img-model.png');
  await S.wait(2200);

  // 2. flatten
  await S.caption('Append "Flatten dm", start from "orders"');
  await B.append('flatten', 'Flatten dm');
  await S.settle(1200);
  await B.choose(f.locator('.blockr-select__control:visible').first(), /^\s*orders\s*$/);
  await S.settle(1500);
  const rec = f.locator('label:visible', { hasText: /Recursive/ }).first();
  if (await rec.count()) { const [x, y] = await S.center(rec); await S.moveTo(x, y); await S.wait(1200); }
  await S.moveTo(700, 600);
  await S.wait(1500);

  // 3. chart
  await S.caption('Append a "Chart": sum of amount by category_name');
  await B.append('chart', 'Chart');
  await S.settle(800, 400);
  await S.click(B.gear(), { pause: 700 });
  await B.choose(B.field('category'), /^\s*category_name\s*$/);
  await B.choose(B.field('func'), /^\s*Sum\s*$/);
  await B.choose(B.field('value'), /^\s*amount\s*$/);
  await S.wait(600);

  await S.caption('Interaction: tick "Filter on"');
  await S.click(B.trayTab('Interaction'), { pause: 600 });
  await S.click(B.drillBox(), { pause: 600 });
  await S.settle(800);
  await S.click(B.gear(), { pause: 600 });
  await S.settle(1500);
  await S.moveTo(700, 650);
  await S.wait(1200);

  // 4. table below the chart
  await S.caption('Append a "Table", drag its tab below the chart');
  await B.append('table', 'Table');
  await S.settle(1500);
  const [tx, ty] = await S.center(B.tab('Table'));
  const panel = await f.evaluate(() => {
    const r = [...document.querySelectorAll('.dv-groupview')].map(e => e.getBoundingClientRect())
      .filter(r => r.width > 300).sort((a, b) => b.width - a.width)[0];
    return { x: r.x, y: r.y, width: r.width, height: r.height };
  });
  const off = await B.offset();
  await S.drag(tx, ty, off.x + panel.x + panel.width / 2, off.y + panel.y + panel.height - 60, { steps: 34 });
  await S.settle(1500);
  // hide the chart's own preview table, the Table block shows the rows
  await B.clickAt(...await B.eyeAt('Chart'));

  await S.caption('Click a bar: the table shows the orders behind it');
  await S.wait(600);
  await B.clickAt(...await B.barAt('Electronics'));
  await S.settle(1500);
  await S.moveTo(130, 700);
  await S.wait(1200);
  await B.still('03-img-result.png');
  await S.wait(2600);

  await S.caption(null);
  await S.fade(true);
  await S.stop(0.8);
})().catch(async e => {
  console.error(e);
  if (global.__page) await global.__page.screenshot({ path: out + '-error.png' }).catch(() => {});
  process.exit(1);
});
