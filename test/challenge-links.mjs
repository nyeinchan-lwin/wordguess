// A challenge link must either start a winnable challenge or be ignored.
//
// Regression guard for links that built a board no guess could match: a
// 6-wide grid hiding a 2-letter answer, digits accepted as the answer, or a
// word the guess validator would refuse from the player who received it.
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const base = process.argv[2] || 'http://localhost:8080';
const SRC = readFileSync(fileURLToPath(new URL('../script.js', import.meta.url)), 'utf8');

// A word that really is in the shipped valid set, so the good-link case is not
// testing a word the game would reject for unrelated reasons.
const GOOD = [...SRC.match(/const EXTRA_6 = \[([\s\S]*?)\n\s*\];/)[1]
  .matchAll(/'([^']*)'/g)].map(x => x[1])[0];

const results = [];
const check = (name, pass, detail = '') => results.push({ name, pass, detail });

const browser = await chromium.launch();

async function start(query) {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.evaluate(() => localStorage.setItem('wg_settings', JSON.stringify(
    { dark: false, hc: false, easy: false, hard: false, sound: false, theme: 'all', wordLength: 5 })));
  await page.goto(base + '/' + query, { waitUntil: 'networkidle' });
  await page.click('button[data-target="en"]:not([data-daily]):not([data-tournament])');
  await page.waitForSelector('[data-screen="en"]:not([hidden])');
  await page.waitForTimeout(300);
  await page.evaluate(() => document.activeElement && document.activeElement.blur());
  const width = await page.$$eval('[data-grid] .grid-row:first-child .tile', t => t.length);
  const banner = await page.$eval('[data-challenge-banner]', el => !el.hidden).catch(() => false);
  return { ctx, page, width, banner, errors };
}

// ── a good link is honoured and is winnable ─────────────────────
{
  const { ctx, page, width, banner, errors } = await start(`?w=${GOOD}&t=all&l=${GOOD.length}`);
  check(`valid link (${GOOD}): challenge banner shown`, banner);
  check(`valid link (${GOOD}): grid is ${GOOD.length} wide`, width === GOOD.length, `got ${width}`);
  for (const ch of GOOD) await page.keyboard.press(ch);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(2600);
  const result = await page.$eval('[data-modal]', el =>
    el.hidden ? '' : (el.querySelector('.modal-card')?.dataset.result || 'open')).catch(() => '');
  check(`valid link (${GOOD}): typing the answer wins`, result === 'win', `result="${result}"`);
  check(`valid link (${GOOD}): no page errors`, errors.length === 0, errors.join(' | '));
  await ctx.close();
}

// ── unusable links fall back to a normal 5-letter game ──────────
const BAD = [
  ['?w=HI&l=6',          'word shorter than the declared length'],
  ['?w=FRANCE&l=4',      'word longer than the declared length'],
  ['?w=12345&l=5',       'digits instead of letters'],
  ['?w=ZZZZZ&l=5',       'not a word the validator accepts'],
  ['?w=WATERCOLOR&l=10', 'length the UI cannot play'],
  ['?w=&l=5',            'empty word'],
];

for (const [query, why] of BAD) {
  const { ctx, width, banner, errors } = await start(query);
  check(`${query} (${why}): ignored, no challenge banner`, banner === false);
  check(`${query} (${why}): falls back to the 5-letter setting`, width === 5, `grid was ${width} wide`);
  check(`${query} (${why}): no page errors`, errors.length === 0, errors.join(' | '));
  await ctx.close();
}

await browser.close();

let failed = 0;
for (const { name, pass, detail } of results) {
  if (!pass) failed++;
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail && !pass ? '  → ' + detail : ''}`);
}
console.log(`\n${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
