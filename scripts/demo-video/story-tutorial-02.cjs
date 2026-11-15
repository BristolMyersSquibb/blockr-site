// Tutorial 2 (learn/02-build-a-dashboard.md). Starts from the board after
// step 1: tutorial-02-app.R, served locally on the one-line install.
// usage: node story-tutorial-02.cjs <out> [url] [--no-record]
const fs = require('fs');
const { film } = require('./film.cjs');
const { board } = require('./story-lib.cjs');
const out = process.argv[2] || 'tut02';
const url = process.argv[3] && !process.argv[3].startsWith('--') ? process.argv[3] : 'http://127.0.0.1:4320/';
const record = !process.argv.includes('--no-record');
const STILLS = out + '-stills';

(async () => {
  fs.mkdirSync(STILLS, { recursive: true });
  const S = await film({ url, out, captions: false, record, viewport: { width: 1152, height: 780 } });
  const { p, f } = S;
  global.__page = p;
  const B = board(S, STILLS);
  await f.waitForSelector('.dv-tab:has-text("Table")', { timeout: 60000 });
  await S.settle(2500, 1000);
  // open on the chart
  await B.tab('Chart').click();
  await S.settle(1500, 800);

  const closeTab = async (name) => {
    await S.click(B.tab(name), { pause: 400 });
    await S.click(B.tab(name).locator('.dv-default-tab-action').first(), { pause: 700 });
  };

  await S.start();
  await S.wait(1500);

  await S.caption('Drag the table tab to the right: it gets its own panel');
  const [x0, y0] = await S.center(B.tab('Table'));
  await S.drag(x0, y0, 1000, 460, { steps: 40, beforeUp: async () => {
    await p.mouse.move(1003, 463); await S.wait(300); await B.still('02-img-drag.png');
  } });
  await S.settle(1500);

  await S.caption('Close the panels your users do not need');
  await closeTab('Workflow');
  await closeTab('Dataset');
  await closeTab('Filter');
  await S.settle(1200);

  await S.caption('Hide the preview tables with the eye');
  await B.clickAt(...await B.eyeAt('Chart'));
  await B.clickAt(...await B.eyeAt('Table'));

  await S.caption('Click a bar: the table shows those penguins');
  await B.clickAt(...await B.barAt('Adelie'));
  await S.wait(900);
  await S.moveTo(420, 600);
  await S.wait(500);
  await B.still('02-img-result.png');
  await S.wait(1200);
  await B.clickAt(...await B.barAt('Chinstrap'));
  await S.wait(1800);

  await S.caption('"Clear" removes the filter');
  await S.click(f.locator(':is(button, a, span):visible', { hasText: /^\s*Clear\s*$/ }).first());
  await S.settle(1200);
  await S.moveTo(800, 650);
  await S.wait(1600);

  await S.caption(null);
  await S.fade(true);
  await S.stop(0.8);
})().catch(async e => {
  console.error(e);
  if (global.__page) await global.__page.screenshot({ path: out + '-error.png' }).catch(() => {});
  process.exit(1);
});
