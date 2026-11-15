// Board helpers shared by the tutorial stories. They drive a board started
// with blockr::run_app(): the Workflow canvas sits in a rail on the left,
// block panels fill the rest. Works with the app served directly or inside
// ShinyProxy's iframe#shinyframe.
const path = require('path');

function board(S, stills) {
  const { p, f } = S;
  const B = {};

  // offset of the app frame on the page (0, 0 without ShinyProxy)
  B.offset = async () => {
    const fr = await p.$('iframe#shinyframe');
    return fr ? await fr.boundingBox() : { x: 0, y: 0 };
  };
  B.still = (name) => S.shot(path.join(stills, name));
  B.menuItem = (label) => f.locator('.blockr-menu__item:visible')
    .filter({ has: f.locator('.blockr-menu__label', { hasText: new RegExp('^' + label + '$') }) }).first();
  B.option = (re) => f.locator('.blockr-select__option:visible', { hasText: re }).first();
  B.tab = (name) => f.locator('.dv-tab:visible', { hasText: name }).first();

  // DAG nodes in page coordinates, top to bottom
  B.nodes = async () => {
    const off = await B.offset();
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
    return nb.map(n => ({ ...n, cx: n.cx + off.x, top: n.top + off.y, bottom: n.bottom + off.y, cy: n.cy + off.y }))
      .sort((a, b) => a.top - b.top);
  };
  // the canvas rail in page coordinates
  B.canvas = async () => {
    const off = await B.offset();
    const r = await f.evaluate(() => {
      const b = document.querySelector('.g6').getBoundingClientRect();
      return { x: b.x, y: b.y, width: b.width, height: b.height };
    });
    return { ...r, x: r.x + off.x, y: r.y + off.y };
  };
  B.fit = async () => {
    await f.evaluate(async () => {
      const g = HTMLWidgets.find('#' + document.querySelector('.g6').id).getWidget();
      await g.fitView();
      if (g.getZoom() > 1.1) { await g.zoomTo(1); await g.fitCenter(); }
    });
    await S.wait(700);
  };
  // type into the block picker and choose a block
  B.pick = async (search, label, stillName) => {
    await S.type(f.locator('.blockr-menu__filter-input:visible'), search);
    if (stillName) { await S.wait(300); await B.still(stillName); }
    await S.click(B.menuItem(label));
    await S.settle(1000);
  };
  // right-click the canvas, "Add block"
  B.addViaMenu = async (x, y, search, label, stillName) => {
    await S.moveTo(x, y);
    S.ripple(x, y);
    await p.mouse.click(x, y, { button: 'right' });
    await S.wait(600);
    await S.click(f.locator('text=Add block').first(), { pause: 500 });
    await B.pick(search, label, stillName);
  };
  // from the output port at the bottom of a node
  B.portDrag = async (from, x1, y1, opts = {}) => {
    await S.moveTo(from.cx, from.cy);
    await S.wait(350);
    await S.moveTo(from.cx, from.bottom - 3, 250);
    await S.wait(200);
    await S.drag(from.cx, from.bottom - 3, x1, y1, { steps: 34, ...opts });
  };
  // append a block after the lowest node: drag its port into empty canvas
  B.append = async (search, label) => {
    await B.fit();
    const n = await B.nodes();
    const last = n[n.length - 1];
    const c = await B.canvas();
    const y = Math.min(last.bottom + 110, c.y + c.height - 40);
    await B.portDrag(last, last.cx, y);
    await S.settle(500);
    await B.pick(search, label);
  };
  // the gear in the active block's head row
  B.gear = () => f.locator('.blockr-gear-btn:visible').first();
  // a select in the open chart settings, by its row role (category, func, value)
  B.field = (role) => f.locator(`.blockr-settings--open .vz-row[data-role="${role}"] .blockr-select__control`).first();
  // a section of the chart settings: Data, Sort, Format, Titles, Interaction
  B.trayTab = (name) => f.locator('.blockr-settings--open .blockr-tray-nav__group', { hasText: new RegExp('^' + name + '$') }).first();
  // drill-down: "Filter on" under Interaction
  B.drillBox = () => f.locator('.blockr-settings--open label.blockr-checkbox', { hasText: 'Filter on' }).first();
  // pick a value in a blockr.ui select
  B.choose = async (control, re) => {
    await S.click(control, { pause: 450 });
    await S.click(B.option(re), { pause: 350 });
    await S.settle(900);
  };
  // the chart block's echarts instance: pixel centre of a bar (page coords)
  B.barAt = async (cat) => {
    const off = await B.offset();
    const [x, y] = await f.evaluate((cat) => {
      const d = [...document.querySelectorAll('[_echarts_instance_]')]
        .find(e => e.getBoundingClientRect().width > 0);
      const i = echarts.getInstanceByDom(d);
      const o = i.getOption();
      const ax = o.yAxis[0].data ? o.yAxis[0] : o.xAxis[0];
      const k = ax.data.indexOf(cat);
      const v = o.series[0].data[k];
      const val = (v && typeof v === 'object') ? (Array.isArray(v.value) ? v.value[0] : v.value) : v;
      const horiz = !!o.yAxis[0].data;
      const [px, py] = i.convertToPixel({ gridIndex: 0 }, horiz ? [val * 0.5, cat] : [cat, val * 0.5]);
      const r = d.getBoundingClientRect();
      return [r.x + px, r.y + py];
    }, cat);
    return [x + off.x, y + off.y];
  };
  B.clickAt = async (x, y) => {
    await S.moveTo(x, y);
    await S.wait(200);
    S.ripple(x, y);
    await p.mouse.click(x, y);
    S.events.push({ t: Date.now() / 1000 - S.tStart, type: 'click', x, y });
    await S.settle(1200);
  };
  // the eye in the active block's head row toggles its preview
  // (block content is rendered outside the dock group, so find it by position)
  B.eyeAt = async (block) => {
    const off = await B.offset();
    const xy = await f.evaluate((block) => {
      const t = [...document.querySelectorAll('.dv-tab')].find(e => e.textContent.trim() === block);
      const g = t.closest('.dv-groupview').getBoundingClientRect();
      const b = [...document.querySelectorAll('button[aria-label="Preview"]')].map(e => e.getBoundingClientRect())
        .find(r => r.width > 0 && r.x > g.x && r.x < g.right && r.y > g.y && r.y < g.bottom);
      return b && [b.x + b.width / 2, b.y + b.height / 2];
    }, block);
    if (!xy) throw new Error('no preview toggle for ' + block);
    return [xy[0] + off.x, xy[1] + off.y];
  };
  return B;
}

module.exports = { board };
