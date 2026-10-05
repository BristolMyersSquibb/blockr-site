// Variant: Clinical Explorer patient profile. Pick a patient, read the timeline and labs, switch patient.
// usage: node story-patient.cjs <out>
const { film } = require('./film.cjs');
const out = process.argv[2] || 'patient';

(async () => {
  const S = await film({ url: 'https://blockr.cloud/app/clinical-explorer', out, captions: false });
  const { p } = S, f = S.f;
  await f.waitForSelector('text=01-701-1015', { timeout: 90000 });
  await S.settle(2500, 1200);
  const patient = (id) => f.locator(`text=${id}`).first();
  const wheel = async (dy, steps = 12) => { for (let i = 0; i < steps; i++) { await p.mouse.wheel(0, dy / steps); await S.wait(30); } };

  await S.start();
  S.zoom(1);
  await S.wait(1400);

  await S.caption('A clinical trial, one board');
  await S.moveTo(560, 420);
  await S.wait(1500);

  await S.caption('Pick a patient');
  S.zoom(1.5, 1100, 470);
  await S.click(patient('01-701-1015'), { pause: 300 });
  await S.settle(800, 500);
  await S.wait(600);

  await S.caption('Treatment, adverse events and visits on one timeline');
  await S.moveTo(1260, 380);
  await S.wait(1800);

  await S.caption('Every lab over time');
  S.zoom(1.5, 1250, 520);
  await S.moveTo(1250, 640);
  await wheel(700, 20);
  await S.wait(1400);
  await wheel(700, 20);
  await S.wait(1400);
  await wheel(-1400, 20);
  await S.wait(500);

  await S.caption('Switch patient, the profile follows');
  S.zoom(1.5, 1100, 470);
  await S.click(patient('01-701-1034'), { pause: 300 });
  await S.settle(800, 500);
  await S.wait(1400);
  await S.click(patient('01-701-1097'), { pause: 300 });
  await S.settle(800, 500);
  await S.wait(1600);

  await S.caption(null);
  S.zoom(1);
  await S.wait(900);
  await S.fade(true);
  await S.stop(0.8);
})().catch(e => { console.error(e); process.exit(1); });
