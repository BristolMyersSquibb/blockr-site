// Tutorial 1 (learn/01-build-your-first-app.md), recorded on an empty
// board from the one-line install (blockr::run_app(), see README.md). One
// take gives the video and the stills the page uses.
// usage: node story-tutorial-01.cjs <out> [url] [--no-record]
const fs = require('fs');
const { film } = require('./film.cjs');
const { board } = require('./story-lib.cjs');
const out = process.argv[2] || 'tut01';
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

  const c = await B.canvas();
  await S.caption('Right-click the canvas and choose "Add block"');
  await B.addViaMenu(c.x + c.width / 2, c.y + 260, 'dataset', 'dataset block', '01-img-picker.png');

  await S.caption('Pick the penguins dataset');
  await S.click(f.locator('.selectize-input:visible').first(), { pause: 500 });
  await S.click(f.locator('.selectize-dropdown .option', { hasText: /^penguins$/ }).first());
  await S.settle(1200);

  await S.caption('Drag from the output port to add a connected block');
  await B.append('filter', 'Filter Rows');

  await S.caption('Keep the Adelie and Chinstrap penguins');
  await S.click(f.locator('.blockr-select--multi .blockr-select__control:visible').first(), { pause: 400 });
  await S.click(B.option(/^\s*Adelie\s*$/), { pause: 300 });
  await S.click(B.option(/^\s*Chinstrap\s*$/), { pause: 300 });
  await p.keyboard.press('Escape');
  await S.settle(1200);
  await S.moveTo(700, 560);
  await S.wait(1500);

  await S.caption('Add a ggplot block, unconnected this time');
  await B.fit();
  let n = await B.nodes();
  const chain = n.map(x => x.id);
  const cv = await B.canvas();
  // below the filter, so the new link runs down like the others
  const last = n[n.length - 1];
  await B.addViaMenu(last.cx, Math.min(last.bottom + 130, cv.y + cv.height - 60), 'ggplot', 'ggplot');

  await S.caption('Connect: drag from the output port onto the input port');
  await B.fit();
  n = await B.nodes();
  const plot = n.find(x => !chain.includes(x.id));
  const filt = n.filter(x => chain.includes(x.id)).sort((a, b) => b.top - a.top)[0];
  await B.portDrag(filt, plot.cx, plot.top + 4, { beforeUp: () => B.still('01-img-connect.png') });
  await S.settle(1500);

  await S.caption('Map the axes, then color by species');
  const colSelect = (n) => f.locator('.blockr-select__control:visible').nth(n);
  await B.choose(colSelect(0), /^\s*bill_len\s*$/);
  await B.choose(colSelect(1), /^\s*bill_dep\s*$/);
  await S.click(f.locator('text=Add mapping').first(), { pause: 400 });
  await S.click(f.locator('text=Color by').first(), { pause: 500 });
  await B.choose(colSelect(2), /^\s*species\s*$/);
  await S.settle(1500);

  await S.caption('Hide the controls: "…" menu, then "Controls"');
  await S.click(f.locator('.blockr-block-menu-btn:visible').first(), { pause: 600 });
  await S.click(f.locator('.blockr-menu__item:visible, [role=menuitem]:visible', { hasText: /^\s*Controls/ }).first());
  await S.settle(1200);
  await B.fit();
  await S.moveTo(900, 690);

  await S.caption('A live pipeline: change the filter and the plot follows');
  await S.wait(600);
  await B.still('01-img-result.png');
  await S.wait(2600);

  await S.caption(null);
  await S.fade(true);
  await S.stop(0.8);
})().catch(async e => {
  console.error(e);
  if (global.__page) await global.__page.screenshot({ path: out + '-error.png' }).catch(() => {});
  process.exit(1);
});
