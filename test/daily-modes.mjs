// The daily challenge must be solvable at every word length the UI offers.
//
// Regression guard for the bug where pickDailyWord() fell back to a 5-letter
// answer at 4/6/7 letters while the grid was built COLS wide, so no guess the
// player could submit was ever able to match.
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const base = process.argv[2] || 'http://localhost:8080';
const SRC = readFileSync(fileURLToPath(new URL('../script.js', import.meta.url)), 'utf8');

function list(name) {
  const m = SRC.match(new RegExp(`const ${name} = \\[([\\s\\S]*?)\\n\\s*\\];`));
  return [...m[1].matchAll(/'([^']*)'/g)].map(x => x[1]);
}

// Six distinct, definitely-valid guesses per length.
const GUESSES = {
  4: list('EXTRA_4').slice(0, 6),
  5: list('ANSWERS').slice(0, 6),
  6: list('EXTRA_6').slice(0, 6),
  7: list('EXTRA_7').slice(0, 6),
};

const results = [];
const check = (name, pass, detail = '') => results.push({ name, pass, detail });

const browser = await chromium.launch();

for (const len of [4, 5, 6, 7]) {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));

  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.evaluate(l => localStorage.setItem('wg_settings', JSON.stringify(
    { dark: false, hc: false, easy: false, hard: false, sound: false, theme: 'all', wordLength: l })), len);
  await page.goto(base + '/', { waitUntil: 'networkidle' });

  await page.click('[data-daily]');
  await page.waitForSelector('[data-screen="en"]:not([hidden])');
  await page.waitForTimeout(300);
  // The start button keeps focus, and Enter would re-activate it and restart
  // the game. Drop focus so the physical keyboard reaches the board.
  await page.evaluate(() => document.activeElement && document.activeElement.blur());

  const width = await page.$$eval('[data-grid] .grid-row:first-child .tile', t => t.length);
  check(`length ${len}: grid is ${len} tiles wide`, width === len, `got ${width}`);

  // Guard against the whole suite silently testing a random game: the badge is
  // only populated for daily/tournament/modifier games.
  const badge = await page.$eval('[data-mode-badge]',
    el => (el.hidden ? '' : el.textContent.trim())).catch(() => '');
  check(`length ${len}: the Daily button actually starts a daily game`, badge.length > 0,
    `mode badge was "${badge}"`);

  // setModal() stamps the card with data-result="win"|"lose", which is the only
  // reliable way to tell the two apart — both open the same modal.
  const outcome = () => page.$eval('[data-modal]', el =>
    el.hidden ? '' : (el.querySelector('.modal-card')?.dataset.result || 'open')).catch(() => '');

  for (const guess of GUESSES[len]) {
    for (const ch of guess) await page.keyboard.press(ch);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(900);
    const rejected = ((await page.textContent('[data-toast]').catch(() => '')) || '').toLowerCase().includes('not');
    if (rejected) {
      check(`length ${len}: guess ${guess} accepted`, false, 'rejected as invalid');
      for (let i = 0; i < guess.length; i++) await page.keyboard.press('Backspace');
      continue;
    }
    if (await outcome() === 'win') break;
  }

  await page.waitForTimeout(1800);
  const result = await outcome();
  check(`length ${len}: game reaches an end state`, result === 'win' || result === 'lose', `result="${result}"`);

  // A win means the answer equalled a guess of this length. A loss reveals the
  // answer, and it must be exactly `len` letters — the invariant the bug broke,
  // where a 5-letter answer sat behind a 7-wide grid.
  const revealed = ((await page.textContent('[data-modal-word]').catch(() => '')) || '').trim();
  const answerLen = result === 'win' ? len : revealed.length;
  check(`length ${len}: answer is ${len} letters, so the game is winnable`,
    answerLen === len, `result="${result}" revealed="${revealed}" (${revealed.length} letters)`);

  check(`length ${len}: no page errors`, errors.length === 0, errors.join(' | '));
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
