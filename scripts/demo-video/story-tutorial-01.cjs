// Tutorial 1 (learn/01-build-your-first-app.md), recorded on the Playground
// (blockr.cloud/app/empty, a DAG board). One take gives the video and the
// stills the page uses.
// usage: node story-tutorial-01.cjs <out> [--no-record]
const fs = require('fs');
const path = require('path');
const { film } = require('./film.cjs');
const out = process.argv[2] || 'tut01';
const record = !process.argv.includes('--no-record');
const STILLS = out + '-stills';

(async () => {
  fs.mkdirSync(STILLS, { recursive: true });
  const S = await film({ url: 'https://blockr.cloud/app/empty', out, captions: false, record,
                         viewport: { width: 1152, height: 780 } });
  const { p } = S, f = S.f;
  await f.waitForSelector('text=Start building your workflow', { timeout: 60000 });
  await S.settle(1500, 800);

  const still = (name) => S.shot(path.join(STILLS, name));
  const menuItem = (label) => f.locator('.blockr-menu__item:visible')
    .filter({ has: f.locator('.blockr-menu__label', { hasText: new RegExp('^' + label + '$') }) }).first();
  const option = (re) => f.locator('.blockr-select__option:visible', { hasText: re }).first();
  const colSelect = (n) => f.locator('.blockr-select__control:visible')
    .filter({ has: f.locator('input[placeholder^="Select column"]') }).nth(n);

  // DAG node positions from the g6 graph, in page coordinates
  const nodes = async () => {
    const off = await (await p.$('iframe#shinyframe')).boundingBox();
    const nb = await f.evaluate(() => {
      const el = document.querySelector('.g6');
      const g = HTMLWidgets.find('#' + el.id).getWidget();
      const rect = el.getBoundingClientRect();
      return g.getNodeData().filter(n => n.id.startsWith('node-')).map(n => {
        const b = g.getElementRenderBounds(n.id);
        const [x0, y0] = g.getViewportByCanvas([b.min[0], b.min[1]]);
        const [x1, y1] = g.getViewportByCanvas([b.max[0], b.max[1]]);
        return { id: n.id, cx: rect.x + (x0 + x1) / 2, top: rect.y + y0, bottom: rect.y + y1, cy: rect.y + (y0 + y1) / 2 };
      });
    });
    return nb.map(n => ({ ...n, cx: n.cx + off.x, top: n.top + off.y, bottom: n.bottom + off.y, cy: n.cy + off.y }));
  };
  // centre the graph so no port sits under the "Board contents" search box
  const fit = async () => {
    await f.evaluate(async () => {
      const g = HTMLWidgets.find('#' + document.querySelector('.g6').id).getWidget();
      await g.fitView();
      if (g.getZoom() > 1.1) { await g.zoomTo(1); await g.fitCenter(); }
    });
    await S.wait(700);
  };
  const pick = async (search, label, stillName) => {
    await S.type(f.locator('.blockr-menu__filter-input:visible'), search);
    if (stillName) { await S.wait(300); await still(stillName); }
    await S.click(menuItem(label));
    await S.settle(1000);
  };
  const addViaMenu = async (x, y, search, label, stillName) => {
    await S.moveTo(x, y);
    S.ripple(x, y);
    await p.mouse.click(x, y, { button: 'right' });
    await S.wait(600);
    await S.click(f.locator('text=Add block').first(), { pause: 500 });
    await pick(search, label, stillName);
  };
  // from the output port at the bottom of a node
  const portDrag = async (from, x1, y1, opts = {}) => {
    await S.moveTo(from.cx, from.cy);
    await S.wait(350);
    await S.moveTo(from.cx, from.bottom - 3, 250);
    await S.wait(200);
    await S.drag(from.cx, from.bottom - 3, x1, y1, { steps: 34, ...opts });
  };

  await S.start();
  await S.wait(1200);

  await S.caption('Right-click the canvas and choose "Add block"');
  await addViaMenu(330, 420, 'dataset', 'dataset block', '01-img-picker.png');

  await S.caption('Pick the penguins dataset');
  await S.click(f.locator('.selectize-input').first(), { pause: 500 });
  await S.click(f.locator('.selectize-dropdown .option', { hasText: /^penguins$/ }).first());
  await S.settle(1200);

  await S.caption('Drag from the output port to add a connected block');
  await fit();
  let n = await nodes();
  await portDrag(n[0], n[0].cx + 110, n[0].bottom + 150);
  await S.settle(500);
  await pick('filter', 'Filter Rows');

  await S.caption('Keep the Adelie and Chinstrap penguins');
  await S.click(f.locator('.blockr-select__control:visible')
    .filter({ has: f.locator('input[placeholder^="Select values"]') }).first(), { pause: 400 });
  await S.click(option('Adelie'), { pause: 300 });
  await S.click(option('Chinstrap'), { pause: 300 });
  await p.keyboard.press('Escape');
  await S.settle(1200);
  await S.wait(800);

  await S.caption('Add a ggplot block, unconnected this time');
  await fit();
  n = await nodes();
  const freeY = Math.min(700, Math.max(...n.map(x => x.bottom)) + 90);
  await addViaMenu(Math.max(...n.map(x => x.cx)) + 180, Math.min(freeY, 640), 'ggplot', 'ggplot');

  await S.caption('Connect: drag from the output port onto the input port');
  await fit();
  n = await nodes();
  const filt = n.find(x => x.id !== n[0].id && Math.abs(x.cx - n[0].cx) < 5 && x.top > n[0].top) || n[1];
  const plot = n.find(x => x.id !== n[0].id && x.id !== filt.id);
  await portDrag(filt, plot.cx, plot.top + 4, { beforeUp: () => still('01-img-connect.png') });
  await S.settle(1500);

  await S.caption('Map the axes, then color by species');
  await S.click(colSelect(0), { pause: 400 });
  await S.click(option(/^bill_len/));
  await S.settle(500);
  await S.click(colSelect(0), { pause: 400 });
  await S.click(option(/^bill_dep/));
  await S.settle(1000);
  await S.click(f.locator('text=Add mapping'), { pause: 400 });
  await S.click(f.locator('text=Color by'), { pause: 500 });
  await S.click(colSelect(0), { pause: 400 });
  await S.click(option(/^species/));
  await S.settle(1500);

  await S.caption('Hide the controls: "…" menu, then "Controls"');
  await S.click(f.locator('.blockr-block-menu-btn:visible').first(), { pause: 600 });
  await S.click(f.locator('.blockr-menu__item:visible', { hasText: /^Controls/ }).first());
  await S.settle(1200);
  await fit();
  await S.moveTo(1000, 700);

  await S.caption('A live pipeline: change the filter and the plot follows');
  await S.wait(600);
  await still('01-img-result.png');
  await S.wait(2600);

  await S.caption(null);
  await S.fade(true);
  await S.stop(0.8);
})().catch(e => { console.error(e); process.exit(1); });
