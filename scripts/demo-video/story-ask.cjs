// Landing page "By asking" clip (index.md, the second tab of demo:): the hero
// video's board (penguins -> filter -> plot), built by asking the assistant,
// one block per ask, then the same filter change by hand and the R code.
// Recorded on ask-app.R at the hero's 1024x640. The assistant's work plays at
// 3x; render with --badge to say so on screen, no --captions (the chapters
// are the caption events' times, as for story-hero.cjs).
//   node story-ask.cjs ask http://127.0.0.1:4430
//   node render.cjs ask hero-ask --speed 1 --badge --width 1728
//   (dark: ask-app.R 4431 dark, then --fade-color 0x141b21)
const path = require('path');
const { film } = require('./film.cjs');

const take = process.argv[2] || 'ask';
const url = process.argv[3] || 'http://127.0.0.1:4430';
const OUT = path.join(__dirname, take);
const PANEL = '.asst-panel';
const FAST = 3;   // the assistant's work plays at this speed
const log = (...a) => console.log(new Date().toISOString().slice(11, 19), ...a);

const ASKS = [
  ['Ask for data', 'Load the penguins data.'],
  ['Ask for a filter', 'Keep only Adelie and Gentoo.'],
  ['Ask for a plot', 'Plot bill length against bill depth, coloured by species.'],
];

(async () => {
  const VW = +(process.env.VW || 1024), VH = +(process.env.VH || 640);
  const S = await film({ url, out: OUT, captions: false, viewport: { width: VW, height: VH } });
  const { p } = S;
  const f = p.mainFrame();
  global.__page = p;
  const ed = p.locator(`${PANEL} shiny-chat-container .ProseMirror`);
  await ed.waitFor({ timeout: 120000 });
  await S.settle(1500, 800);

  const sendState = () => p.evaluate((P) => document.querySelector(`${P} .shiny-chat-btn-send`)?.getAttribute('data-state'), PANEL);
  const busy = async () => ['pending', 'cancel'].includes(await sendState());
  const waitAgent = async () => {
    await p.waitForFunction((P) => ['pending', 'cancel'].includes(document.querySelector(`${P} .shiny-chat-btn-send`)?.getAttribute('data-state')),
      PANEL, { timeout: 30000, polling: 100 }).catch(() => log('stream start not seen'));
    const t0 = Date.now();
    let quiet = 0;
    while (Date.now() - t0 < 240000) {
      await S.wait(500);
      quiet = (await busy()) ? 0 : quiet + 1;
      if (quiet >= 4) return (Date.now() - t0) / 1000;
    }
    throw new Error('agent timed out');
  };
  const option = (re) => p.locator('.blockr-select__option:visible', { hasText: re }).first();
  const tab = (re) => p.locator('.dv-tab:visible', { hasText: re }).first();

  S.cx = VW * 0.7; S.cy = VH * 0.75;
  await S.start();
  await S.wait(600);

  for (const [cap, ask] of ASKS) {
    await S.caption(cap);
    await S.click(ed);
    await ed.pressSequentially(ask, { delay: 45 });
    await S.wait(500);
    await p.keyboard.press('Enter');
    S.fast(FAST);
    const secs = await waitAgent();
    S.fast(0);
    log(`${ask} -> ${secs.toFixed(0)} s`);
    await S.settle(800, 500);
    await S.moveTo(VW * 0.64, VH * 0.7);
    await S.wait(1600);
  }

  // show the plot without its controls, as in the hero
  await S.click(p.locator('.blockr-block-menu-btn:visible').first(), { pause: 350 });
  await S.click(p.locator('.blockr-menu__item:visible, [role=menuitem]:visible', { hasText: /^\s*Controls/ }).first());
  await S.settle(700);
  await S.moveTo(VW * 0.64, VH * 0.7);
  await S.wait(1500);

  await S.caption('Change it by hand');
  await S.click(tab(/Adelie|Gentoo|Filter/), { pause: 350 });
  await S.settle(500);
  await S.click(p.locator('.blockr-select--multi .blockr-select__control:visible').first(), { pause: 400 });
  await S.click(option(/^\s*Chinstrap\s*$/), { pause: 300 });
  await p.keyboard.press('Escape');
  await S.settle(600);
  await S.click(tab(/Bill|Plot|ggplot|Scatter/i), { pause: 350 });
  await S.settle(700);
  await S.moveTo(VW * 0.64, VH * 0.7);
  await S.wait(1800);

  await S.caption('Get the R code');
  await S.click(p.locator('button[aria-label="Board options"], button.blockr-navbar-icon-btn:not(.dropdown-toggle)').first(), { pause: 400 });
  await S.click(p.locator('.blockr-options-code:visible').first(), { pause: 0 });
  await S.settle(900);
  await S.moveTo(VW * 0.78, VH * 0.88);
  await S.wait(4500);

  await S.caption(null);
  await p.evaluate(() => {
    document.getElementById('__fade').style.background = getComputedStyle(document.body).backgroundColor;
  });
  await S.fade(true);
  await S.stop(0.8);
})().catch(async (e) => {
  console.error(e);
  if (global.__page) await global.__page.screenshot({ path: OUT + '-error.png' }).catch(() => {});
  process.exit(1);
});
