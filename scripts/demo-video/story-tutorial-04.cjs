// Tutorial 4 (learn/04-custom-code.md), recorded on an empty board from the
// one-line install (blockr::run_app(), see README.md). One take gives the
// video and the stills the page uses.
// usage: node story-tutorial-04.cjs <out> [url] [--no-record]
const fs = require('fs');
const { film } = require('./film.cjs');
const { board } = require('./story-lib.cjs');
const out = process.argv[2] || 'tut04';
const url = process.argv[3] && !process.argv[3].startsWith('--') ? process.argv[3] : 'http://127.0.0.1:4010/';
const record = !process.argv.includes('--no-record');
const STILLS = out + '-stills';

const SCRIPT = [
  'min_mass <- 3500',
  '',
  'data |>',
  '  subset(body_mass >= min_mass) |>',
  '  transform(bill_ratio = bill_len / bill_dep)'
].join('\n');

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

  // 1. dataset, then a script block after it
  await S.caption('Add a "Script" block after a penguins dataset');
  const c = await B.canvas();
  await B.addViaMenu(c.x + c.width / 2, c.y + 200, 'dataset', 'dataset block');
  await S.click(f.locator('.selectize-input:visible').first(), { pause: 500 });
  await S.click(f.locator('.selectize-dropdown .option', { hasText: /^penguins$/ }).first());
  await S.settle(1200);
  await B.append('script', 'Script');
  await S.settle(1200);
  await S.wait(1200);

  // 2. the script
  await S.caption('Open the gear and write the script');
  await S.click(B.gear(), { pause: 700 });
  const ed = f.locator('.cm-content:visible').first();
  await S.click(ed, { pause: 300 });
  await p.keyboard.press('ControlOrMeta+a');
  await p.keyboard.press('Backspace');
  await S.wait(300);
  await ed.pressSequentially(SCRIPT, { delay: 60 });
  await S.wait(400);
  const code = await f.evaluate(() => [...document.querySelectorAll('.cm-content .cm-line')]
    .filter(l => l.getBoundingClientRect().width > 0).map(l => l.textContent).join('\n'));
  if (code !== SCRIPT) console.warn('editor holds:\n' + code);

  // 3. run
  await S.caption('Click "Run": a "Min mass" box appears on the block');
  await S.click(f.locator('button:visible', { hasText: /^\s*Run/ }).first());
  await S.settle(1500);
  await S.moveTo(500, 560);
  await S.wait(600);
  await B.still('04-img-code.png');
  await S.wait(1200);
  await S.click(B.gear(), { pause: 600 });
  await S.settle(800);

  // 4. chart
  await S.caption('Append a "Chart": mean of bill_ratio by species');
  await B.append('chart', 'Chart');
  await S.settle(800, 400);
  await S.click(B.gear(), { pause: 700 });
  await B.choose(B.field('category'), /^\s*species\s*$/);
  await B.choose(B.field('func'), /^\s*Mean\s*$/);
  await B.choose(B.field('value'), /^\s*bill_ratio\s*$/);
  await S.wait(500);
  await S.click(B.gear(), { pause: 600 });
  await S.settle(1500);
  await S.moveTo(700, 650);
  await S.wait(600);
  await B.still('04-img-result.png');
  await S.wait(1500);

  // 5. the control drives the chart
  await S.caption('Change "Min mass" on the script block: the chart follows');
  await S.click(B.tab('Script'), { pause: 800 });
  const box = f.locator('input[type="number"]:visible').first();
  await S.click(box, { pause: 300 });
  await p.keyboard.press('ControlOrMeta+a');
  await box.pressSequentially('4500', { delay: 120 });
  await p.keyboard.press('Enter');
  await S.settle(1500);
  await S.wait(800);
  await S.click(B.tab('Chart'), { pause: 800 });
  await S.settle(1500);
  await S.moveTo(700, 650);
  await S.wait(2500);

  await S.caption(null);
  await S.fade(true);
  await S.stop(0.8);
})().catch(async e => {
  console.error(e);
  if (global.__page) await global.__page.screenshot({ path: out + '-error.png' }).catch(() => {});
  process.exit(1);
});
