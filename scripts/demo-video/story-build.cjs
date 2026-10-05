// Variant: empty board -> dataset -> filter -> chart -> change filter -> R code
// usage: node story-build.cjs <out> [--no-captions] [--no-record]
const { film } = require('./film.cjs');
const out = process.argv[2] || 'build';
const captions = process.argv.includes('--page-captions');   // captions are added in post by default
const record = !process.argv.includes('--no-record');

(async () => {
  const S = await film({ url: 'https://blockr.cloud/app/first-workflow', out, captions, record });
  const { p } = S, f = S.f;
  const menuItem = (label) => f.locator('.blockr-menu__item:visible').filter({ has: f.locator('.blockr-menu__label', { hasText: new RegExp('^' + label + '$') }) }).first();
  const addBlock = async (search, label) => {
    await S.click(f.locator('.md-addrow').last(), { pause: 400 });
    await S.type(f.locator('.blockr-menu__filter-input:visible'), search);
    await S.click(menuItem(label));
    await S.settle(900);
  };
  const connect = async (i, j) => {
    const dots = f.locator('.md-rail .md-dot');
    const [x0, y0] = await S.center(dots.nth(i)), [x1, y1] = await S.center(dots.nth(j));
    await S.drag(x0, y0, x1, y1);
    await S.settle(700);
  };
  const appendFrom = async (i, search, label) => {
    // drag from the block's dot straight down into empty space: "Append to <block>"
    const [x0, y0] = await S.center(f.locator('.md-rail .md-dot').nth(i));
    const [, yr] = await S.center(f.locator('.md-addrow').last());
    await S.drag(x0, y0, x0 + 30, yr + 55, { steps: 30 });
    await S.settle(500);
    await S.type(f.locator('.blockr-menu__filter-input:visible'), search);
    await S.click(menuItem(label));
    await S.settle(900);
  };
  const colSelect = (n) => f.locator('.blockr-select__control:visible').filter({ has: f.locator('input[placeholder^="Select column"]') }).nth(n);
  const option = (re) => f.locator('.blockr-select__option:visible', { hasText: re }).first();

  await S.start();
  S.zoom(1);
  await S.wait(900);

  await S.caption('Add a dataset');
  S.zoom(1.7);
  await addBlock('data', 'dataset block');
  await S.click(f.locator('.selectize-input').first(), { pause: 500 });
  await S.click(f.locator('.selectize-dropdown .option', { hasText: /^penguins$/ }).first());
  S.zoom(1.25, 1080, 420);
  await S.settle(900);
  await S.wait(700);

  await S.caption('Filter it');
  S.zoom(1.7);
  await appendFrom(0, 'filter', 'Filter Rows');
  await S.click(f.locator('.blockr-select__control:visible').filter({ has: f.locator('input[placeholder^="Select values"]') }).first(), { pause: 400 });
  await S.click(option('Adelie'), { pause: 300 });
  await S.click(option('Gentoo'), { pause: 300 });
  await p.keyboard.press('Escape');
  await S.settle(900);

  await S.caption('Plot it');
  S.zoom(1.7);
  await appendFrom(1, 'ggplot', 'ggplot');
  await S.click(colSelect(0), { pause: 400 });
  await S.click(option(/^bill_len/));
  await S.settle(400);
  await S.click(colSelect(0), { pause: 400 });   // the remaining empty one is Y
  await S.click(option(/^bill_dep/));
  await S.settle(900);
  await S.click(f.locator('text=Add mapping'), { pause: 400 });
  await S.click(f.locator('text=Color by'), { pause: 500 });
  await S.click(colSelect(0), { pause: 400 });
  await S.click(option(/^species/));
  S.zoom(1.3, 1080, 620);
  await S.settle(1200);
  await S.wait(600);

  await S.caption('Arrange the view');
  S.zoom(1);
  const tab = f.locator('.dv-tab:visible', { hasText: 'Filter' }).first();
  const [tx, ty] = await S.center(tab);
  const left = await f.locator('.dv-groupview').filter({ has: f.locator('.dv-tab', { hasText: 'Outline' }) }).first().boundingBox();
  await S.drag(tx, ty, left.x + left.width / 2, left.y + left.height * 0.85, { steps: 36 });
  await S.settle(800);
  const gg = f.locator('.dv-tab:visible', { hasText: 'Ggplot' }).first();
  if (!(await gg.getAttribute('class')).includes('dv-active-tab')) { await S.click(gg); await S.settle(800); }

  await S.caption('Change the filter, the chart follows');
  await S.click(f.locator('.blockr-select__control:visible').filter({ hasText: 'Gentoo' }).first(), { pause: 400 });
  await S.click(option('Chinstrap'), { pause: 300 });
  await p.keyboard.press('Escape');
  await S.settle(1000);
  await S.moveTo(1100, 700);
  await S.wait(1600);

  await S.caption('Get the R code, as a report');
  S.zoom(1);
  await S.click(f.locator('.blockr-view-tab', { hasText: 'Report' }));
  await S.settle(1000);
  await S.click(f.locator('text=Add block').first(), { pause: 500 });
  await S.click(menuItem('Ggplot'));
  await S.settle(1000);
  await S.click(f.locator('.blockr-segmented__seg:visible').nth(1));
  await S.settle(1500);
  if (await f.evaluate(() => document.body.innerText.includes('waiting for R code'))) {
    // the chunk sometimes stays empty until the view is rebuilt; render.cjs cuts this out
    S.events.push({ t: Date.now() / 1000 - S.tStart, type: 'cut-start' });
    await S.click(f.locator('.blockr-view-tab', { hasText: 'Build' })); await S.settle(1500);
    await S.click(f.locator('.blockr-view-tab', { hasText: 'Report' })); await S.settle(1500);
    S.events.push({ t: Date.now() / 1000 - S.tStart, type: 'cut-end' });
  }
  S.zoom(2.0, 330, 715, { abs: true });   // close on the generated code, not toned down by render --zscale
  await S.moveTo(860, 560);
  await S.wait(7500);

  await S.caption(null);
  S.zoom(1);
  await S.fade(true);
  await S.stop(0.8);
})().catch(e => { console.error(e); process.exit(1); });
