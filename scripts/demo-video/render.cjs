// Post-production: speed, camera (zoom + follow cursor), captions, fade.
// usage: node render.cjs <take> <out> [--speed 1.5] [--zoom] [--captions] [--width 1920]
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { chromium } = require('./pw.cjs');

const argv = process.argv.slice(2);
const take = argv[0], out = argv[1];
const opt = (k, d) => { const i = argv.indexOf('--' + k); return i < 0 ? d : argv[i + 1]; };
const flag = (k) => argv.includes('--' + k);
const SPEED = +opt('speed', 1.5), ZOOM = flag('zoom'), CAPS = flag('captions'), OUTW = +opt('width', 1920);
const FPS = 30;
const ZSCALE = +opt('zscale', 0.75);   // tone the story's zoom levels down: z' = 1 + (z - 1) * ZSCALE

const ev = JSON.parse(fs.readFileSync(take + '-events.json'));
const { viewport: VP, dpr } = ev;
const SW = VP.width * dpr, SH = VP.height * dpr, OUTH = Math.round(OUTW * VP.height / VP.width / 2) * 2;
const off = ev.tStart - ev.t0;                 // event time -> recording time
const list = fs.readFileSync(path.join(take + '-frames', 'list.ffconcat'), 'utf8');
const recDur = list.split('\n').filter(l => l.startsWith('duration')).reduce((a, l) => a + +l.split(' ')[1], 0);
const outDur = recDur / SPEED;
const events = ev.events.map(e => ({ ...e, r: e.t + off }));

// ---------- cursor position over recording time ----------
const ease = (k) => k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
function cursorAt(r) {
  let pos = { x: VP.width / 2, y: VP.height / 2 };
  for (let i = 0; i < events.length; i++) {
    const e = events[i];
    if (e.r > r) break;
    if (e.type === 'move') {
      const k = Math.min(1, (r - e.r) / (e.ms / 1000));
      pos = { x: e.x0 + (e.x - e.x0) * ease(k), y: e.y0 + (e.y - e.y0) * ease(k) };
    } else if (e.type === 'down') {
      const up = events.slice(i).find(u => u.type === 'up');
      const k = up ? Math.min(1, (r - e.r) / Math.max(0.01, up.r - e.r)) : 0;
      pos = { x: e.x + ((up?.x ?? e.x) - e.x) * ease(k), y: e.y + ((up?.y ?? e.y) - e.y) * ease(k) };
    } else if (e.type === 'up' || e.type === 'click') pos = { x: e.x, y: e.y };
  }
  return pos;
}
function zoomAt(r) {
  let z = { z: 1 };
  for (const e of events) { if (e.r > r) break; if (e.type === 'zoom') z = e; }
  return z;
}

// ---------- camera ----------
const frames = Math.ceil(outDur * FPS);
const cam = [];
let cz = 1, cx = VP.width / 2, cy = VP.height / 2, tx = cx, ty = cy;
const TAU_Z = 0.45, TAU_C = 0.38;                // seconds, output time
for (let i = 0; i < frames; i++) {
  const T = i / FPS, r = T * SPEED, dt = 1 / FPS;
  const zk0 = ZOOM ? zoomAt(r) : { z: 1 };
  const zk = { ...zk0, z: 1 + (zk0.z - 1) * ZSCALE };
  const cur = cursorAt(r);
  if (zk.x != null) { tx = zk.x; ty = zk.y; }
  else {
    // dead zone: re-aim only when the cursor leaves the middle 50% of the view
    const vw = VP.width / cz, vh = VP.height / cz;
    if (Math.abs(cur.x - cx) > vw * 0.25 || Math.abs(cur.y - cy) > vh * 0.25) { tx = cur.x; ty = cur.y; }
  }
  const az = 1 - Math.exp(-dt / TAU_Z), ac = 1 - Math.exp(-dt / TAU_C);
  cz += (zk.z - cz) * az; cx += (tx - cx) * ac; cy += (ty - cy) * ac;
  const vw = VP.width / cz, vh = VP.height / cz;
  const x = Math.min(Math.max(cx - vw / 2, 0), VP.width - vw), y = Math.min(Math.max(cy - vh / 2, 0), VP.height - vh);
  // source pixels, even
  const ev2 = (v) => Math.max(0, Math.round(v * dpr / 2) * 2);
  let w = ev2(vw), h = Math.round(w * SH / SW / 2) * 2;
  cam.push({ T, w: Math.min(w, SW), h: Math.min(h, SH), x: Math.min(ev2(x), SW - Math.min(w, SW)), y: Math.min(ev2(y), SH - Math.min(h, SH)) });
}
const cmdFile = out + '.cmds';
fs.writeFileSync(cmdFile, cam.map(c => `${c.T.toFixed(4)} crop w ${c.w}, crop h ${c.h}, crop x ${c.x}, crop y ${c.y};`).join('\n') + '\n');

// ---------- captions ----------
async function captionPngs() {
  const caps = [];
  let cur = null;
  for (const e of events) if (e.type === 'caption') {
    const T = e.r / SPEED;
    if (cur) { cur.end = T; caps.push(cur); }
    cur = e.text ? { text: e.text, start: T } : null;
  }
  if (cur) { cur.end = outDur; caps.push(cur); }
  if (!caps.length) return [];
  const exe = process.env.CHROME_PATH;
  const b = await chromium.launch(exe ? { executablePath: exe } : { channel: 'chrome' });
  const p = await b.newPage({ viewport: { width: OUTW, height: 200 }, deviceScaleFactor: 1 });
  const fs0 = Math.round(OUTW / 1920 * 34);
  for (let i = 0; i < caps.length; i++) {
    await p.setContent(`<html><head><link href="https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap" rel="stylesheet"></head>
      <body style="margin:0;background:transparent"><div id="c" style="display:inline-block;font:600 ${fs0}px/1.2 Inter,-apple-system,sans-serif;color:#fff;
      background:rgba(17,24,39,.9);padding:${fs0 * .5}px ${fs0 * .95}px;border-radius:${fs0 * .55}px;
      box-shadow:0 10px 30px rgba(0,0,0,.18)"><span style="color:#6ee7b7;margin-right:${fs0 * .45}px">${i + 1}</span>${caps[i].text}</div></body></html>`);
    await p.waitForTimeout(400);
    caps[i].png = `${out}-cap${i}.png`;
    await p.locator('#c').screenshot({ path: caps[i].png, omitBackground: true });
  }
  await b.close();
  return caps;
}

(async () => {
  const caps = CAPS ? await captionPngs() : [];
  const inputs = ['-f', 'concat', '-safe', '0', '-i', path.join(take + '-frames', 'list.ffconcat')];
  caps.forEach(c => inputs.push('-loop', '1', '-t', outDur.toFixed(2), '-i', c.png));
  let g = `[0:v]setpts=(PTS-STARTPTS)/${SPEED},fps=${FPS},sendcmd=f=${cmdFile},crop=w=${SW}:h=${SH}:x=0:y=0,scale=${OUTW}:${OUTH}:flags=lanczos,setsar=1,fade=t=in:st=0:d=0.5:color=white[v0]`;
  let last = 'v0';
  caps.forEach((c, i) => {
    const a = c.start + 0.05, d = Math.max(0.4, c.end - c.start - 0.1);
    g += `;[${i + 1}:v]format=rgba,fade=t=in:st=${a.toFixed(2)}:d=0.25:alpha=1,fade=t=out:st=${(a + d - 0.25).toFixed(2)}:d=0.25:alpha=1[c${i}]`;
    g += `;[${last}][c${i}]overlay=x=(W-w)/2:y=H-h-${Math.round(OUTH * 0.05)}:enable='between(t,${a.toFixed(2)},${(a + d).toFixed(2)})':shortest=1[v${i + 1}]`;
    last = `v${i + 1}`;
  });
  g += `;[${last}]format=yuv420p[out]`;
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', ...inputs, '-filter_complex', g, '-map', '[out]',
    '-t', outDur.toFixed(2), '-c:v', 'libx264', '-preset', 'slow', '-crf', '22', '-movflags', '+faststart', '-an', out + '.mp4'], { stdio: 'inherit' });
  const mb = fs.statSync(out + '.mp4').size / 1e6;
  console.log(`${out}.mp4  ${outDur.toFixed(1)}s  ${mb.toFixed(2)} MB`);
})().catch(e => { console.error(e); process.exit(1); });
