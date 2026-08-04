// The daily challenge is one shared puzzle.
//
// Guards two fixes:
//   #47 the answer must match the grid width, or no guess can ever match it
//       (it used to fall back to a 5-letter answer behind a 4/6/7-wide grid),
//       and the Daily button must actually reach daily mode at all.
//   #49 the puzzle must not depend on the player's own theme or word length —
//       it used to, so one date produced 12 different "daily" answers.
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const base = process.argv[2] || 'http://localhost:8080';
const SRC = readFileSync(fileURLToPath(new URL('../script.js', import.meta.url)), 'utf8');

const DAILY_LENGTH = Number(SRC.match(/const DAILY_LENGTH = (\d+);/)[1]);
const GUESSES = [...SRC.match(/const ANSWERS = \[([\s\S]*?)\n\s*\];/)[1]
  .matchAll(/'([^']*)'/g)].map(x => x[1]).filter(w => w.length === DAILY_LENGTH).slice(0, 6);

// Deliberately varied settings: none of them may change the puzzle.
const PROFILES = [
  { theme: 'all',       wordLength: 5 },
  { theme: 'countries', wordLength: 5 },
  { theme: 'food',      wordLength: 4 },
  { theme: 'history',   wordLength: 7 },
];

const results = [];
const check = (name, pass, detail = '') => results.push({ name, pass, detail });

const browser = await chromium.launch();
const answers = [];

for (const profile of PROFILES) {
  const label = `theme=${profile.theme} len=${profile.wordLength}`;
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));

  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.evaluate(p => localStorage.setItem('wg_settings', JSON.stringify(
    { dark: false, hc: false, easy: false, hard: false, sound: false, ...p })), profile);
  await page.goto(base + '/', { waitUntil: 'networkidle' });

  await page.click('[data-daily]');
  await page.waitForSelector('[data-screen="en"]:not([hidden])');
  await page.waitForTimeout(300);
  // The start button keeps focus, and Enter would re-activate it and restart
  // the game. Drop focus so the physical keyboard reaches the board.
  await page.evaluate(() => document.activeElement && document.activeElement.blur());

  // Without this the whole suite could pass while silently playing a random
  // game — the Daily button once did exactly that.
  const badge = await page.$eval('[data-mode-badge]',
    el => (el.hidden ? '' : el.textContent.trim())).catch(() => '');
  check(`${label}: the Daily button starts a daily game`, badge.length > 0, `badge was "${badge}"`);

  const width = await page.$$eval('[data-grid] .grid-row:first-child .tile', t => t.length);
  check(`${label}: grid is ${DAILY_LENGTH} wide regardless of the setting`,
    width === DAILY_LENGTH, `got ${width}`);

  const outcome = () => page.$eval('[data-modal]', el =>
    el.hidden ? '' : (el.querySelector('.modal-card')?.dataset.result || 'open')).catch(() => '');

  for (const guess of GUESSES) {
    for (const ch of guess) await page.keyboard.press(ch);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(900);
    const rejected = ((await page.textContent('[data-toast]').catch(() => '')) || '').toLowerCase().includes('not');
    if (rejected) {
      check(`${label}: guess ${guess} accepted`, false, 'rejected as invalid');
      for (let i = 0; i < guess.length; i++) await page.keyboard.press('Backspace');
      continue;
    }
    if (await outcome() === 'win') break;
  }

  await page.waitForTimeout(1800);
  const result = await outcome();
  check(`${label}: game reaches an end state`, result === 'win' || result === 'lose', `result="${result}"`);

  // A win means the answer equalled a guess of this length; a loss reveals it.
  const revealed = ((await page.textContent('[data-modal-word]').catch(() => '')) || '').trim();
  const answer = result === 'win' ? GUESSES.find(g => g.length === DAILY_LENGTH) : revealed;
  check(`${label}: answer is ${DAILY_LENGTH} letters, so the game is winnable`,
    answer.length === DAILY_LENGTH, `result="${result}" revealed="${revealed}"`);

  // One game must count once. The 'all' bucket and the selected theme's bucket
  // are both updated, and when no theme is selected those are the same bucket —
  // which used to double every stat for the default player.
  const played = (await page.textContent('[data-stat="played"]').catch(() => '') || '').trim();
  check(`${label}: one finished game counts as one`, played === '1', `Played showed "${played}"`);

  answers.push({ label, answer, won: result === 'win' });
  check(`${label}: no page errors`, errors.length === 0, errors.join(' | '));
  await ctx.close();
}

await browser.close();

// The point of #49: one date, one puzzle, whatever the player has configured.
const distinct = [...new Set(answers.filter(a => !a.won).map(a => a.answer))];
check('every profile gets the same daily word', distinct.length <= 1,
  answers.map(a => `${a.label} -> ${a.answer}${a.won ? ' (won)' : ''}`).join('; '));

let failed = 0;
for (const { name, pass, detail } of results) {
  if (!pass) failed++;
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail && !pass ? '  → ' + detail : ''}`);
}
console.log(`\n${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
