// Practice (#25) and Timed (#22): the two modes that deliberately do not touch
// the player's record.
//
// Both are easy to get subtly wrong in the same way — a mode that "does not
// count" still calling updateStats, or an end-of-board branch ending the run
// when it should only end the word. Every assertion here is about the boundary
// between the mode and the stats, or about the board advancing rather than the
// game finishing.
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const base = process.argv[2] || 'http://localhost:8080';
const SRC = readFileSync(fileURLToPath(new URL('../script.js', import.meta.url)), 'utf8');

const listOf = name => [...SRC.match(new RegExp(`const ${name} = \\[([\\s\\S]*?)\\n\\s*\\];`))[1]
  .matchAll(/'([^']*)'/g)].map(x => x[1]);
const ANSWERS = listOf('ANSWERS');       // valid 5-letter guesses
const GOOD6   = listOf('EXTRA_6')[0];    // a real 6-letter word, for challenge links

const results = [];
const check = (name, pass, detail = '') => results.push({ name, pass, detail });

// A record that must survive every mode below untouched.
const SEED = { all: { played: 9, won: 6, currentStreak: 3, bestStreak: 4, distribution: [0, 1, 2, 3, 0, 0] } };

const browser = await chromium.launch();

const seed = async page => page.evaluate(s => {
  localStorage.setItem('wg_stats', JSON.stringify(s));
  localStorage.removeItem('wg_achievements');
  localStorage.removeItem('wg_timed_best');
}, SEED);

const statsNow = page => page.evaluate(() => localStorage.getItem('wg_stats'));
const filled = page => page.$$eval('[data-grid] .tile:not([data-state="empty"])', t => t.length);
const rows = page => page.$$eval('[data-grid] .grid-row', r => r.length);
const modalOpen = page => page.$eval('[data-modal]', el => !el.hidden);

// ── Practice: the grid grows, nothing is recorded ────────────────
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await seed(page);
  await page.reload({ waitUntil: 'networkidle' });

  await page.click('[data-practice]');
  await page.waitForSelector('[data-screen="en"]:not([hidden])');
  await page.waitForTimeout(400);

  const badge = await page.$eval('[data-mode-badge]', el => el.hidden ? '' : el.textContent.trim());
  check('practice: mode badge names the mode', /practice|လေ့ကျင့်/i.test(badge), `badge "${badge}"`);
  check('practice: starts at six rows', await rows(page) === 6, `${await rows(page)}`);

  // eight guesses — two past where a normal game would be lost
  for (let i = 0; i < 8; i++) {
    for (const ch of ANSWERS[i]) await page.keyboard.press(ch);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1350);
  }
  const grown = await rows(page);
  check('practice: the grid grew past six rows', grown > 6, `${grown} rows`);
  check('practice: no modal after running past six guesses', await modalOpen(page) === false);
  check('practice: the record is untouched', await statsNow(page) === JSON.stringify(SEED));
  check('practice: no page errors', errors.length === 0, errors.join(' | '));
  await ctx.close();
}

// ── Practice: winning is not recorded either ─────────────────────
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await seed(page);
  // a challenge link fixes the answer, so the win is deliberate rather than lucky
  await page.goto(`${base}/?w=${GOOD6}&t=all&l=${GOOD6.length}`, { waitUntil: 'networkidle' });
  await page.click('[data-practice]');
  await page.waitForSelector('[data-screen="en"]:not([hidden])');
  await page.waitForTimeout(400);
  for (const ch of GOOD6) await page.keyboard.press(ch);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(3200);

  const result = await page.$eval('[data-modal] .modal-card', el => el.dataset.result).catch(() => '');
  check('practice: a win still shows the win modal', result === 'win', `result "${result}"`);
  check('practice: a win does not touch the record', await statsNow(page) === JSON.stringify(SEED));
  check('practice: a win does not unlock achievements',
    await page.evaluate(() => localStorage.getItem('wg_achievements')) === null);
  await ctx.close();
}

// ── Timed: counts down, recycles words, ends on the clock ────────
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.clock.install();
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await seed(page);
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.click('[data-timed]');
  await page.waitForSelector('[data-screen="en"]:not([hidden])');
  await page.clock.runFor(600);

  const timer = () => page.$eval('[data-game-timer]', el => el.textContent.trim());
  check('timed: starts at five minutes', await timer() === '5:00', await timer());
  await page.clock.runFor(65000);
  check('timed: the clock counts down', await timer() === '3:55', await timer());

  // exhaust one word: six valid guesses
  for (let i = 0; i < 6; i++) {
    for (const ch of ANSWERS[i]) await page.keyboard.press(ch);
    await page.keyboard.press('Enter');
    await page.clock.runFor(3000);
  }
  check('timed: a lost word clears the board instead of ending the run',
    await filled(page) === 0, `${await filled(page)} tiles still filled`);
  check('timed: the run is still going after a lost word', await modalOpen(page) === false);
  check('timed: still six rows after recycling', await rows(page) === 6, `${await rows(page)}`);

  await page.clock.runFor(300000);
  check('timed: the clock ending closes the run', await modalOpen(page) === true);
  const msg = await page.$eval('[data-modal]', el =>
    (el.querySelector('.modal-message, .modal-title') || {}).textContent || '');
  check('timed: the result reports a score', /0/.test(msg), `"${msg.trim()}"`);
  check('timed: the record is untouched', await statsNow(page) === JSON.stringify(SEED));
  check('timed: no page errors', errors.length === 0, errors.join(' | '));
  await ctx.close();
}

// ── Timed: solving banks a word and keeps going ──────────────────
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.clock.install();
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await seed(page);
  await page.goto(`${base}/?w=${GOOD6}&t=all&l=${GOOD6.length}`, { waitUntil: 'networkidle' });
  await page.click('[data-timed]');
  await page.waitForSelector('[data-screen="en"]:not([hidden])');
  await page.clock.runFor(600);

  for (const ch of GOOD6) await page.keyboard.press(ch);
  await page.keyboard.press('Enter');
  await page.clock.runFor(6000);

  const badge = await page.$eval('[data-mode-badge]', el => el.textContent.trim());
  check('timed: the score goes up on a solve', /\b1\b/.test(badge), `badge "${badge}"`);
  check('timed: the board is dealt again after a solve', await filled(page) === 0);
  check('timed: a solve does not end the run', await modalOpen(page) === false);

  await page.clock.runFor(300000);
  const best = await page.evaluate(() => localStorage.getItem('wg_timed_best'));
  check('timed: the best score is kept', best === '1', `best "${best}"`);
  check('timed: solving still does not touch the record', await statsNow(page) === JSON.stringify(SEED));
  await ctx.close();
}

// ── Letter difficulty (#30) ──────────────────────────────────────
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(base + '/', { waitUntil: 'networkidle' });

  // the score has to rank the obvious cases the obvious way
  const eases = await page.evaluate(() =>
    ['STARE', 'AROSE', 'SLATE', 'QUIRK', 'JAZZY', 'FUZZY']
      .map(w => [w, window.WG.wordEase(w)]));
  const byWord = Object.fromEntries(eases);
  check('difficulty: common-letter words score above rare-letter ones',
    Math.min(byWord.STARE, byWord.AROSE, byWord.SLATE) > Math.max(byWord.QUIRK, byWord.JAZZY, byWord.FUZZY),
    JSON.stringify(eases));
  const doubled = await page.evaluate(() => [window.WG.wordEase('LEVER'), window.WG.wordEase('LEVEL')]);
  check('difficulty: a repeated letter costs something', doubled[0] > doubled[1], doubled.join(' vs '));

  const split = await page.evaluate(() => {
    const pool = ['STARE', 'AROSE', 'SLATE', 'RAISE', 'JAZZY', 'QUIRK', 'FUZZY', 'WALTZ'];
    return { easier: window.WG.narrowByDifficulty(pool, 'easier'),
             trickier: window.WG.narrowByDifficulty(pool, 'trickier'),
             any: window.WG.narrowByDifficulty(pool, 'any').length };
  });
  check('difficulty: "easier" keeps the common-letter half',
    split.easier.every(w => ['STARE', 'AROSE', 'SLATE', 'RAISE'].includes(w)), split.easier.join(','));
  check('difficulty: "trickier" keeps the rare-letter half',
    split.trickier.every(w => ['JAZZY', 'QUIRK', 'FUZZY', 'WALTZ'].includes(w)), split.trickier.join(','));
  check('difficulty: "any" narrows nothing', split.any === 8, `${split.any}`);

  // The reason this splits at the median rather than a fixed score: a fixed
  // threshold empties the pool for a small theme, which is the failure #44 was.
  const empties = await page.evaluate(() => {
    const out = [];
    for (const n of [1, 2, 3, 4, 5, 8, 15]) {
      const pool = Array.from({ length: n }, (_, i) => 'WORD' + i);
      for (const d of ['easier', 'trickier', 'any']) {
        if (window.WG.narrowByDifficulty(pool, d).length === 0) out.push(`${n}/${d}`);
      }
    }
    return out;
  });
  check('difficulty: never narrows a pool to nothing', empties.length === 0, empties.join(','));

  // and it has to reach the game, not just sit in settings
  await page.evaluate(() => localStorage.setItem('wg_settings', JSON.stringify(
    { theme: 'all', wordLength: 5, wordDifficulty: 'trickier', dark: false, hc: false, easy: false, hard: false, sound: false })));
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  const pressed = await page.$eval('[data-difficulty="trickier"]', el =>
    el.getAttribute('aria-pressed') + '/' + el.classList.contains('active'));
  check('difficulty: the saved choice is reflected on the chip', pressed === 'true/true', pressed);

  await page.click('button[data-target="en"]:not([data-daily]):not([data-tournament]):not([data-practice]):not([data-timed])');
  await page.waitForSelector('[data-screen="en"]:not([hidden])');
  await page.waitForTimeout(300);
  const badge = await page.$eval('[data-mode-badge]', el => el.hidden ? '' : el.textContent.trim());
  check('difficulty: the game badge names it', /trickier|ခက်သော/i.test(badge), `badge "${badge}"`);
  // The difficulty chips first shipped reusing `.word-length-chip`, which broke
  // the a11y suite's "exactly one pressed chip per group" assertion. Separate
  // classes, separate groups.
  const groups = await page.evaluate(() => ({
    lengthPressed: [...document.querySelectorAll('.word-length-chip')].filter(e => e.getAttribute('aria-pressed') === 'true').length,
    diffPressed: [...document.querySelectorAll('.difficulty-chip')].filter(e => e.getAttribute('aria-pressed') === 'true').length,
    overlap: [...document.querySelectorAll('.word-length-chip')].filter(e => e.dataset.difficulty).length,
  }));
  check('difficulty: exactly one length chip is pressed', groups.lengthPressed === 1, `${groups.lengthPressed}`);
  check('difficulty: exactly one difficulty chip is pressed', groups.diffPressed === 1, `${groups.diffPressed}`);
  check('difficulty: the two chip groups do not share a class', groups.overlap === 0, `${groups.overlap} shared`);
  check('difficulty: no page errors', errors.length === 0, errors.join(' | '));
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
