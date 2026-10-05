// Filmed browser session: fake cursor, click ripple, captions, optional zoom
// log, CDP screencast frames with timestamps. Used by the story scripts.
const { chromium } = require('./pw.cjs');
const fs = require('fs');
const path = require('path');

const CURSOR_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"><path d="M5 2.5l13.5 12.2-6.1.5 3.6 7.1-2.6 1.3-3.6-7.2-4.8 4.1z" fill="#111" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/></svg>`;

const OVERLAY_JS = (svg) => {
  if (document.getElementById('__cur')) return;
  const st = document.createElement('style');
  st.textContent = `
    #__cur { position: fixed; left: 0; top: 0; width: 26px; height: 26px; z-index: 2147483647; pointer-events: none;
             transform: translate(-100px, -100px); will-change: transform; }
    .__rip { position: fixed; z-index: 2147483646; pointer-events: none; width: 36px; height: 36px; margin: -18px 0 0 -18px;
             border-radius: 50%; border: 2.5px solid #067A5A; background: rgba(6,122,90,.15);
             animation: __rip .55s ease-out forwards; }
    @keyframes __rip { from { transform: scale(.3); opacity: 1; } to { transform: scale(1.4); opacity: 0; } }
    #__cap { position: fixed; left: 50%; bottom: 36px; transform: translate(-50%, 12px); z-index: 2147483645; pointer-events: none;
             font: 600 22px/1.2 Inter, -apple-system, 'Segoe UI', sans-serif; color: #fff; background: rgba(17, 24, 39, .88);
             padding: 12px 22px; border-radius: 12px; opacity: 0; transition: opacity .35s, transform .35s; white-space: nowrap;
             box-shadow: 0 8px 24px rgba(0,0,0,.18); }
    #__cap.on { opacity: 1; transform: translate(-50%, 0); }
    #__cap .n { color: #6ee7b7; margin-right: 10px; }
    #__fade { position: fixed; inset: 0; background: #fff; z-index: 2147483644; pointer-events: none; opacity: 0; transition: opacity .6s; }
  `;
  document.head.appendChild(st);
  const c = document.createElement('div'); c.id = '__cur'; c.innerHTML = svg; document.body.appendChild(c);
  const cap = document.createElement('div'); cap.id = '__cap'; document.body.appendChild(cap);
  const fd = document.createElement('div'); fd.id = '__fade'; document.body.appendChild(fd);
};

async function film({ url, out, viewport = { width: 1440, height: 900 }, dpr = 2, record = true, captions = true }) {
  // without the flag the screencast delivers CSS-pixel frames, whatever deviceScaleFactor says
  const exe = process.env.CHROME_PATH;   // e.g. /usr/bin/chromium in the devcontainer; default: installed Google Chrome
  const b = await chromium.launch({ ...(exe ? { executablePath: exe } : { channel: 'chrome' }), args: [`--force-device-scale-factor=${dpr}`] });
  const ctx = await b.newContext({ viewport, deviceScaleFactor: dpr });
  const p = await ctx.newPage();
  const S = { p, b, ctx, cx: viewport.width / 2, cy: viewport.height / 2, events: [], captions };
  const t0 = () => S.tStart ? Date.now() / 1000 - S.tStart : 0;

  await p.goto(url);
  const fh = await p.waitForSelector('iframe#shinyframe', { timeout: 60000 }).catch(() => null);
  if (fh) {
    for (let i = 0; i < 180; i++) {
      const fr = await fh.contentFrame();
      if (fr && await fr.evaluate(() => !!(window.Shiny && Shiny.shinyapp && Shiny.shinyapp.isConnected())).catch(() => false)) { S.f = fr; break; }
      await p.waitForTimeout(1000);
    }
  } else S.f = p.mainFrame();
  // busy tracking inside the app
  await S.f.evaluate(() => {
    window.__busy = 0; window.__lastBusy = Date.now();
    $(document).on('shiny:busy', () => { window.__busy = 1; window.__lastBusy = Date.now(); });
    $(document).on('shiny:idle', () => { window.__busy = 0; window.__lastBusy = Date.now(); });
  });
  await p.evaluate(OVERLAY_JS, CURSOR_SVG);

  // ---------- low-level filmed actions ----------
  const setCursor = (x, y, ms) => p.evaluate(([x, y, ms]) => {
    const c = document.getElementById('__cur');
    c.style.transition = ms ? `transform ${ms}ms cubic-bezier(.45,.05,.25,1)` : 'none';
    c.style.transform = `translate(${x - 5}px, ${y - 3}px)`;
  }, [x, y, ms]);
  S.wait = (ms) => p.waitForTimeout(ms);
  S.moveTo = async (x, y, ms) => {
    const d = Math.hypot(x - S.cx, y - S.cy);
    ms = ms ?? Math.min(1100, Math.max(500, d * 1.1));
    S.events.push({ t: t0(), type: 'move', x0: S.cx, y0: S.cy, x, y, ms });
    await setCursor(x, y, ms);
    await p.mouse.move(x, y, { steps: 8 });
    await S.wait(ms + 30);
    S.cx = x; S.cy = y;
  };
  S.center = async (loc) => {
    await loc.scrollIntoViewIfNeeded();
    const bb = await loc.boundingBox();
    if (!bb) throw new Error('no bounding box');
    return [bb.x + bb.width / 2, bb.y + bb.height / 2, bb];
  };
  S.ripple = (x, y) => p.evaluate(([x, y]) => {
    const r = document.createElement('div'); r.className = '__rip'; r.style.left = x + 'px'; r.style.top = y + 'px';
    document.body.appendChild(r); setTimeout(() => r.remove(), 700);
  }, [x, y]);
  S.click = async (loc, { pause = 250 } = {}) => {
    const [x, y] = await S.center(loc);
    await S.moveTo(x, y);
    await S.wait(120);
    S.ripple(x, y);
    await p.mouse.click(x, y);
    S.events.push({ t: t0(), type: 'click', x, y });
    await S.wait(pause);
  };
  S.type = async (loc, text) => {
    await S.click(loc);
    await loc.pressSequentially(text, { delay: 85 });
    await S.wait(250);
  };
  S.drag = async (x0, y0, x1, y1, { steps = 28, beforeUp = null } = {}) => {
    await S.moveTo(x0, y0);
    await S.wait(150);
    await p.mouse.down();
    S.events.push({ t: t0(), type: 'down', x: x0, y: y0 });
    for (let i = 1; i <= steps; i++) {
      const k = i / steps, e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      const x = x0 + (x1 - x0) * e, y = y0 + (y1 - y0) * e;
      await setCursor(x, y, 0);
      await p.mouse.move(x, y);
      await S.wait(22);
    }
    await S.wait(250);
    if (beforeUp) await beforeUp();
    await p.mouse.up();
    S.events.push({ t: t0(), type: 'up', x: x1, y: y1 });
    S.cx = x1; S.cy = y1;
  };
  // wait until Shiny has been idle for `quiet` ms, at least `min` ms
  S.settle = async (min = 600, quiet = 500, max = 20000) => {
    const start = Date.now();
    await S.wait(min);
    while (Date.now() - start < max) {
      const ok = await S.f.evaluate((q) => !window.__busy && Date.now() - window.__lastBusy > q, quiet).catch(() => true);
      if (ok) return;
      await S.wait(100);
    }
  };
  let capN = 0;
  S.caption = async (text, { numbered = true } = {}) => {
    S.events.push({ t: t0(), type: 'caption', text });
    if (!S.captions) return;
    if (text) capN++;
    await p.evaluate(([text, n]) => {
      const c = document.getElementById('__cap');
      if (!text) { c.classList.remove('on'); return; }
      const show = () => { c.innerHTML = (n ? `<span class="n">${n}</span>` : '') + text; c.classList.add('on'); };
      if (c.classList.contains('on')) { c.classList.remove('on'); setTimeout(show, 350); } else show();
    }, [text, numbered ? capN : 0]);
  };
  // a still for the docs page: the frame as it is, fake cursor included
  S.shot = async (file) => { await p.screenshot({ path: file }); console.log('shot:', file); };
  S.fade = (on) => p.evaluate((on) => { document.getElementById('__fade').style.opacity = on ? 1 : 0; }, on);
  S.zoom = (z, x, y, { abs = false } = {}) => { S.events.push({ t: t0(), type: 'zoom', z, x, y, abs }); };

  // ---------- recording ----------
  const frames = [];
  let cdp;
  const dir = out + '-frames';
  S.start = async () => {
    await setCursor(S.cx, S.cy, 0);
    if (!record) { S.tStart = Date.now() / 1000; return; }
    fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true });
    cdp = await ctx.newCDPSession(p);
    cdp.on('Page.screencastFrame', async ({ data, metadata, sessionId }) => {
      const file = path.join(dir, String(frames.length).padStart(5, '0') + '.jpg');
      fs.writeFileSync(file, Buffer.from(data, 'base64'));
      frames.push({ t: metadata.timestamp, file });
      cdp.send('Page.screencastFrameAck', { sessionId }).catch(() => {});
    });
    await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 92, maxWidth: viewport.width * dpr, maxHeight: viewport.height * dpr, everyNthFrame: 1 });
    S.tStart = Date.now() / 1000;
  };
  S.stop = async (hold = 1.0) => {
    await S.wait(hold * 1000);
    if (!record) { await b.close(); return; }
    await cdp.send('Page.stopScreencast');
    const tEnd = Date.now() / 1000;
    // concat list with per-frame durations
    const lines = ['ffconcat version 1.0'];
    for (let i = 0; i < frames.length; i++) {
      const d = (i + 1 < frames.length ? frames[i + 1].t : tEnd) - frames[i].t;
      lines.push(`file '${path.basename(frames[i].file)}'`, `duration ${Math.max(d, 0.001).toFixed(4)}`);
    }
    lines.push(`file '${path.basename(frames[frames.length - 1].file)}'`);
    fs.writeFileSync(path.join(dir, 'list.ffconcat'), lines.join('\n'));
    fs.writeFileSync(out + '-events.json', JSON.stringify({ t0: frames[0]?.t, tStart: S.tStart, viewport, dpr, events: S.events }, null, 1));
    await b.close();
    console.log(`${frames.length} frames, ${(tEnd - frames[0].t).toFixed(1)}s`);
  };
  return S;
}
module.exports = { film };
