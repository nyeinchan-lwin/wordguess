// A hidden screen must really be gone — not just invisible.
//
// Regression guard for `[data-screen] { display: flex }` outranking the user
// agent's `[hidden] { display: none }`: the off-screen menu stayed rendered at
// full size, so its 23 controls kept their place in the tab order and the whole
// screen stayed in the accessibility tree, duplicating the banner, main and h1
// of the screen actually on show.
import { chromium } from 'playwright';

const base = process.argv[2] || 'http://localhost:8080';

const results = [];
const check = (name, pass, detail = '') => results.push({ name, pass, detail });

const browser = await chromium.launch();
const ctx = await browser.newContext();
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', e => errors.push(e.message));

// How the page reports a screen: is it laid out, is it inert, and how many of
// its controls a keyboard could still reach.
const probe = name => page.evaluate(sel => {
  const el = document.querySelector(sel);
  const focusable = [...el.querySelectorAll('a[href], button, input, select, textarea, [tabindex]')]
    .filter(n => !n.disabled && n.getAttribute('tabindex') !== '-1' && n.offsetParent !== null);
  return {
    display: getComputedStyle(el).display,
    laidOut: el.offsetParent !== null,
    inert: el.inert,
    tabbable: focusable.length,
  };
}, `[data-screen="${name}"]`);

await page.goto(base + '/', { waitUntil: 'networkidle' });

// ── on load: only the menu is present ───────────────────────────
{
  const menu = await probe('menu');
  const game = await probe('en');
  check('on load: menu is laid out', menu.laidOut && menu.display !== 'none');
  check('on load: menu controls are tabbable', menu.tabbable > 0, `got ${menu.tabbable}`);
  check('on load: game screen is display:none', game.display === 'none', `display was ${game.display}`);
  check('on load: game screen has no tabbable controls', game.tabbable === 0, `${game.tabbable} tabbable`);
}

// ── entering the game removes the menu entirely ─────────────────
await page.click('button[data-target="en"]:not([data-daily]):not([data-tournament])');
await page.waitForSelector('[data-screen="en"]:not([hidden])');
await page.waitForTimeout(400);

{
  const menu = await probe('menu');
  const game = await probe('en');
  check('in game: menu is display:none', menu.display === 'none', `display was ${menu.display}`);
  check('in game: menu is not laid out', !menu.laidOut);
  check('in game: menu is inert', menu.inert);
  check('in game: menu has no tabbable controls', menu.tabbable === 0, `${menu.tabbable} still tabbable`);
  check('in game: game screen is laid out', game.laidOut && game.display !== 'none');
  check('in game: game controls are tabbable', game.tabbable > 0, `got ${game.tabbable}`);
}

// focus() must not stick to a control on the screen that is gone
{
  const stuck = await page.evaluate(() => {
    const chip = document.querySelector('[data-screen="menu"] .theme-chip');
    chip.focus();
    return document.activeElement === chip;
  });
  check('in game: focus() cannot land on an off-screen menu chip', !stuck);
}

// the landmarks and heading of the hidden screen must not be exposed twice
{
  const seen = await page.evaluate(() => {
    const visible = el => el.offsetParent !== null && !el.closest('[inert]');
    const count = sel => [...document.querySelectorAll(sel)].filter(visible).length;
    return { banners: count('header'), mains: count('main'), h1s: count('h1') };
  });
  check('in game: one banner landmark exposed', seen.banners === 1, `got ${seen.banners}`);
  check('in game: one main landmark exposed', seen.mains === 1, `got ${seen.mains}`);
  check('in game: one h1 exposed', seen.h1s === 1, `got ${seen.h1s}`);
}

// tabbing all the way round must never enter the hidden screen
{
  await page.evaluate(() => document.activeElement && document.activeElement.blur());
  let escaped = null;
  for (let i = 0; i < 45 && escaped === null; i++) {
    await page.keyboard.press('Tab');
    const where = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      const screen = el.closest('[data-screen]');
      return screen && screen.dataset.screen !== 'en'
        ? `${screen.dataset.screen}: ${(el.textContent || '').trim().slice(0, 20)}`
        : null;
    });
    if (where) escaped = where;
  }
  check('in game: 45 Tab presses never reach the hidden menu', escaped === null, `landed on ${escaped}`);
}

// ── going back restores the menu ────────────────────────────────
await page.click('[data-back]');
await page.waitForTimeout(400);

{
  const menu = await probe('menu');
  const game = await probe('en');
  check('back: menu is laid out again', menu.laidOut && menu.display !== 'none');
  check('back: menu is no longer inert', !menu.inert);
  check('back: menu controls are tabbable again', menu.tabbable > 0, `got ${menu.tabbable}`);
  check('back: game screen is display:none', game.display === 'none', `display was ${game.display}`);
  check('back: game screen has no tabbable controls', game.tabbable === 0, `${game.tabbable} tabbable`);
}

// ── a fast back-and-forth must not blank the page ───────────────
// The hide is deferred 200ms for the fade. Now that `hidden` really hides, a
// stale timeout firing after the screen became current again would leave both
// screens display:none — a blank page.
{
  await page.click('button[data-target="en"]:not([data-daily]):not([data-tournament])');
  await page.waitForTimeout(40);
  await page.click('[data-back]');
  await page.waitForTimeout(40);
  await page.click('button[data-target="en"]:not([data-daily]):not([data-tournament])');
  await page.waitForTimeout(700);

  const menu = await probe('menu');
  const game = await probe('en');
  const shown = [menu.display !== 'none', game.display !== 'none'].filter(Boolean).length;
  check('rapid switching: exactly one screen is shown', shown === 1,
    `menu=${menu.display} game=${game.display}`);
  check('rapid switching: the screen shown is the one last asked for', game.display !== 'none',
    `game display was ${game.display}`);
  check('rapid switching: something is tabbable', game.tabbable > 0, `got ${game.tabbable}`);
}

check('no page errors', errors.length === 0, errors.join(' | '));

await ctx.close();
await browser.close();

let failed = 0;
for (const { name, pass, detail } of results) {
  if (!pass) failed++;
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail && !pass ? '  → ' + detail : ''}`);
}
console.log(`\n${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
