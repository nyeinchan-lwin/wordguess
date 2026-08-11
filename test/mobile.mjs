// Mobile: haptics (#11), landscape layout (#12), install prompt (#13).
//
// The landscape assertions are the ones that matter. Before the landscape tier
// the game needed 524px of height on a ~390px viewport, so the page loaded
// already scrolled and the header — Back, title, settings — sat off-screen
// above the fold. "The keyboard fits" was true and misleading; what follows
// checks the document against the viewport, not just the keyboard.
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const base = process.argv[2] || 'http://localhost:8080';
const SRC = readFileSync(fileURLToPath(new URL('../script.js', import.meta.url)), 'utf8');
const ANSWERS = [...SRC.match(/const ANSWERS = \[([\s\S]*?)\n\s*\];/)[1]
  .matchAll(/'([^']*)'/g)].map(x => x[1]);

const results = [];
const check = (name, pass, detail = '') => results.push({ name, pass, detail });

const browser = await chromium.launch();

const startGame = async page => {
  await page.click('button[data-target="en"]:not([data-daily]):not([data-tournament]):not([data-practice]):not([data-timed])');
  await page.waitForSelector('[data-screen="en"]:not([hidden])');
  await page.waitForTimeout(350);
};

// ── #12 landscape: no scrolling, header on screen ────────────────
for (const [label, w, h] of [
  ['iPhone SE landscape', 667, 375],
  ['iPhone 14 landscape', 844, 390],
  ['Pixel 7 landscape',   915, 412],
]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await startGame(page);

  const m = await page.evaluate(() => {
    const r = s => document.querySelector(s).getBoundingClientRect();
    return {
      vh: window.innerHeight,
      docH: document.documentElement.scrollHeight,
      headerTop: Math.round(r('.site-header').top),
      kbBottom: Math.round(r('[data-keyboard]').bottom),
      gridRight: Math.round(r('[data-grid]').right),
      kbLeft: Math.round(r('[data-keyboard]').left),
    };
  });

  check(`${label}: the page does not scroll`, m.docH <= m.vh + 1, `doc ${m.docH} vs viewport ${m.vh}`);
  check(`${label}: the header is on screen`, m.headerTop >= 0, `header top ${m.headerTop}`);
  check(`${label}: the keyboard is above the fold`, m.kbBottom <= m.vh, `${m.kbBottom} vs ${m.vh}`);
  check(`${label}: board and keyboard sit side by side`, m.kbLeft >= m.gridRight,
    `grid right ${m.gridRight}, keyboard left ${m.kbLeft}`);
  await ctx.close();
}

// portrait must keep the stacked layout it already had
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await startGame(page);
  const m = await page.evaluate(() => {
    const r = s => document.querySelector(s).getBoundingClientRect();
    return { gridBottom: Math.round(r('[data-grid]').bottom), kbTop: Math.round(r('[data-keyboard]').top),
             docH: document.documentElement.scrollHeight, vh: window.innerHeight };
  });
  check('portrait: keyboard stays below the board', m.kbTop >= m.gridBottom, JSON.stringify(m));
  check('portrait: still does not scroll', m.docH <= m.vh + 1, `doc ${m.docH} vs ${m.vh}`);
  await ctx.close();
}

// ── #11 haptics ──────────────────────────────────────────────────
const withVibrate = async (present, settings) => {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  await page.addInitScript(p => {
    window.__vibes = [];
    if (p) Object.defineProperty(navigator, 'vibrate',
      { value: v => { window.__vibes.push(v); return true; }, configurable: true });
    else Object.defineProperty(navigator, 'vibrate', { value: undefined, configurable: true });
  }, present);
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  if (settings) {
    await page.evaluate(s => localStorage.setItem('wg_settings', JSON.stringify(s)), settings);
    await page.reload({ waitUntil: 'networkidle' });
  }
  return { ctx, page };
};

const BASE_SETTINGS = { dark: false, hc: false, easy: false, hard: false, theme: 'all',
  wordLength: 5, wordDifficulty: 'any', sound: false };

{
  const { ctx, page } = await withVibrate(true, { ...BASE_SETTINGS, haptics: true });
  check('haptics: the setting is offered where vibration exists',
    await page.$eval('[data-haptics-row]', el => !el.hidden));

  await startGame(page);
  for (const c of ANSWERS[0]) await page.keyboard.press(c);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(1500);
  let vibes = await page.evaluate(() => window.__vibes);
  check('haptics: a submitted guess buzzes', vibes.length > 0, JSON.stringify(vibes));

  for (const c of 'ZZZZZ') await page.keyboard.press(c);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(600);
  vibes = await page.evaluate(() => window.__vibes);
  check('haptics: a refused guess buzzes differently',
    vibes.some(v => Array.isArray(v) && v.length > 1), JSON.stringify(vibes));
  await ctx.close();
}

{
  const { ctx, page } = await withVibrate(true, { ...BASE_SETTINGS, haptics: false });
  await startGame(page);
  for (const c of ANSWERS[0]) await page.keyboard.press(c);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(1500);
  const vibes = await page.evaluate(() => window.__vibes);
  check('haptics: nothing buzzes when the setting is off', vibes.length === 0, JSON.stringify(vibes));
  await ctx.close();
}

{
  // iOS Safari has never supported navigator.vibrate
  const { ctx, page } = await withVibrate(false, null);
  check('haptics: the setting is hidden where vibration does not exist',
    await page.$eval('[data-haptics-row]', el => el.hidden));
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await startGame(page);
  for (const c of ANSWERS[0]) await page.keyboard.press(c);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(1500);
  check('haptics: a browser without vibration still plays', errors.length === 0, errors.join(' | '));
  await ctx.close();
}

// ── #13 install prompt ───────────────────────────────────────────
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });

  check('install: the banner stays hidden until the browser offers',
    await page.$eval('[data-install-banner]', el => el.hidden));

  await page.evaluate(() => {
    const e = new Event('beforeinstallprompt');
    e.preventDefault = () => {};
    e.prompt = () => { window.__prompted = true; };
    e.userChoice = Promise.resolve({ outcome: 'accepted' });
    window.dispatchEvent(e);
  });
  await page.waitForTimeout(200);
  check('install: the banner appears when the browser offers',
    await page.$eval('[data-install-banner]', el => !el.hidden));

  await page.click('[data-install]');
  await page.waitForTimeout(300);
  check('install: the button calls through to the browser prompt',
    await page.evaluate(() => !!window.__prompted));
  check('install: the banner goes away once answered',
    await page.$eval('[data-install-banner]', el => el.hidden));
  await ctx.close();
}

// the manifest must agree with the palette it is advertising
{
  const manifest = JSON.parse(readFileSync(fileURLToPath(new URL('../manifest.json', import.meta.url)), 'utf8'));
  const css = readFileSync(fileURLToPath(new URL('../style.css', import.meta.url)), 'utf8');
  const accent = (css.match(/--color-accent:\s*(#[0-9a-f]{6})/i) || [])[1];
  check('install: manifest theme_color matches the accent token',
    manifest.theme_color.toLowerCase() === (accent || '').toLowerCase(),
    `${manifest.theme_color} vs ${accent}`);

  const html = readFileSync(fileURLToPath(new URL('../index.html', import.meta.url)), 'utf8');
  const meta = (html.match(/name="theme-color" content="(#[0-9a-f]{6})"/i) || [])[1];
  check('install: the theme-color meta matches too',
    (meta || '').toLowerCase() === (accent || '').toLowerCase(), `${meta} vs ${accent}`);
}

await browser.close();

let failed = 0;
for (const { name, pass, detail } of results) {
  if (!pass) failed++;
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail && !pass ? '  → ' + detail : ''}`);
}
console.log(`\n${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
