// Landing page loop (index.md, demo: in the frontmatter), recorded on an
// empty board from the one-line install (hero-loop-app.R). Chapters are
// logged as captions; render without --captions and read the chapter times
// as the caption events' times divided by the render speed.
// usage: node story-hero.cjs <out> [url] [--no-record]
const fs = require('fs');
const { film } = require('./film.cjs');
const { board } = require('./story-lib.cjs');
const out = process.argv[2] || 'hero';
const url = process.argv[3] && !process.argv[3].startsWith('--') ? process.argv[3] : 'http://127.0.0.1:4190/';
const record = !process.argv.includes('--no-record');
const STILLS = out + '-stills';

(async () => {
  fs.mkdirSync(STILLS, { recursive: true });
  const S = await film({ url, out, captions: false, record, viewport: { width: 1152, height: 720 } });
  const { p, f } = S;
  global.__page = p;
  const B = board(S, STILLS);
  const chapter = (title) => S.caption(title);
  await f.waitForSelector('text=No blocks yet', { timeout: 60000 });
  await S.settle(1500, 800);

  await S.start();
  await S.wait(900);

  await chapter('Add data');
  const c = await B.canvas();
  await B.addViaMenu(c.x + c.width / 2, c.y + 200, 'dataset', 'dataset block');
  await S.click(f.locator('.selectize-input:visible').first(), { pause: 500 });
  await S.click(f.locator('.selectize-dropdown .option', { hasText: /^penguins$/ }).first());
  await S.settle(1200);

  await chapter('Filter');
  await B.append('filter', 'Filter Rows');
  await S.click(f.locator('.blockr-select--multi .blockr-select__control:visible').first(), { pause: 400 });
  await S.click(B.option(/^\s*Adelie\s*$/), { pause: 300 });
  await S.click(B.option(/^\s*Gentoo\s*$/), { pause: 300 });
  await p.keyboard.press('Escape');
  await S.settle(1200);
  await B.still('filter.png');

  await chapter('Plot');
  await B.append('ggplot', 'ggplot');
  await S.settle(1200);
  const colSelect = (n) => f.locator('.blockr-select__control:visible').nth(n);
  await B.choose(colSelect(0), /^\s*bill_len\s*$/);
  await B.choose(colSelect(1), /^\s*bill_dep\s*$/);
  await S.click(f.locator('text=Add mapping').first(), { pause: 400 });
  await S.click(f.locator('text=Color by').first(), { pause: 500 });
  await B.choose(colSelect(2), /^\s*species\s*$/);
  await S.settle(1500);
  await S.click(f.locator('.blockr-block-menu-btn:visible').first(), { pause: 600 });
  await S.click(f.locator('.blockr-menu__item:visible, [role=menuitem]:visible', { hasText: /^\s*Controls/ }).first());
  await S.settle(1200);
  await B.fit();
  await S.moveTo(800, 600);
  await S.wait(1200);
  await B.still('plot.png');

  await chapter('Change it');
  await S.click(B.tab('Filter'), { pause: 600 });
  await S.settle(800);
  await S.click(f.locator('.blockr-select--multi .blockr-select__control:visible').first(), { pause: 400 });
  await S.click(B.option(/^\s*Chinstrap\s*$/), { pause: 300 });
  await p.keyboard.press('Escape');
  await S.settle(1000);
  await S.click(B.tab('ggplot'), { pause: 600 });
  await S.settle(1200);
  await S.moveTo(800, 600);
  await S.wait(1800);
  await B.still('change.png');

  await chapter('Get the R code');
  await S.click(f.locator('button[aria-label="Board options"], button.blockr-navbar-icon-btn:not(.dropdown-toggle)').first(), { pause: 700 });
  await S.click(f.locator('.blockr-options-code:visible').first(), { pause: 0 });
  S.zoom(1.45, 576, 300, { abs: true });   // close-up on the code; render with --zoom
  await S.wait(400);
  await S.settle(1500);
  await S.moveTo(900, 640);
  await S.wait(600);
  await B.still('code.png');
  await S.wait(3800);

  await chapter(null);
  // fade to the board's own background, so the dark take does not flash white
  await p.evaluate(() => {
    document.getElementById('__fade').style.background = getComputedStyle(document.body).backgroundColor;
  });
  await S.fade(true);
  await S.stop(0.8);
})().catch(async e => {
  console.error(e);
  if (global.__page) await global.__page.screenshot({ path: out + '-error.png' }).catch(() => {});
  process.exit(1);
});
