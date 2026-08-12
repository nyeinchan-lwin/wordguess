// Themes as data (#29 groundwork), seasonal themes (#29) and custom word
// lists (#27).
//
// The chips and stats tabs used to be written out by hand — twenty-four
// elements that had to be edited in step with the word data, which is the
// duplication that let theme/length combos ship empty (#44). They are rendered
// from THEME_KEYS now, so most of what follows checks that the generated
// markup still carries everything the hand-written version did.
import { chromium } from 'playwright';
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const base = process.argv[2] || 'http://localhost:8080';
const SRC = readFileSync(fileURLToPath(new URL('../script.js', import.meta.url)), 'utf8');
const THEME_NAMES = [...SRC.match(/const THEMES = \{([\s\S]*?)\n {2}\};/)[1]
  .matchAll(/^\s{4}(\w+):\s*\[/gm)].map(m => m[1]);

const results = [];
const check = (name, pass, detail = '') => results.push({ name, pass, detail });

const browser = await chromium.launch();
const chips = page => page.$$eval('[data-theme]', els => els.map(e => e.dataset.theme));
const tabs  = page => page.$$eval('[data-stats-theme]', els => els.map(e => e.dataset.statsTheme));

// ── themes render from data, with the attributes they had by hand ────
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(base + '/', { waitUntil: 'networkidle' });

  const t = await tabs(page);
  check('every theme in the data has a stats tab',
    THEME_NAMES.every(n => t.includes(n)), `missing: ${THEME_NAMES.filter(n => !t.includes(n))}`);
  check('the stats tabs start with "all"', t[0] === 'all', t[0]);

  const attrs = await page.$$eval('[data-stats-theme]', els => els.map(e => ({
    id: e.id, role: e.getAttribute('role'), sel: e.getAttribute('aria-selected'),
    controls: e.getAttribute('aria-controls'), ti: e.tabIndex, i18n: e.getAttribute('data-i18n'),
  })));
  check('generated tabs keep role="tab"', attrs.every(a => a.role === 'tab'));
  check('generated tabs keep an id', attrs.every(a => /^stats-tab-/.test(a.id)));
  check('generated tabs keep aria-controls', attrs.every(a => a.controls === 'stats-panel'));
  check('generated tabs keep a roving tabindex',
    attrs.filter(a => a.ti === 0).length === 1, `${attrs.filter(a => a.ti === 0).length} tabbable`);
  check('exactly one tab is selected',
    attrs.filter(a => a.sel === 'true').length === 1);
  check('generated tabs carry data-i18n', attrs.every(a => /^theme_/.test(a.i18n || '')));

  const chipAttrs = await page.$$eval('[data-theme]', els => els.map(e => ({
    pressed: e.getAttribute('aria-pressed'), i18n: e.getAttribute('data-i18n'), text: e.textContent.trim(),
  })));
  check('generated chips carry aria-pressed', chipAttrs.every(c => c.pressed !== null));
  check('generated chips carry translated text', chipAttrs.every(c => c.text.length > 0));
  check('exactly one chip is pressed',
    chipAttrs.filter(c => c.pressed === 'true').length === 1);
  check('no page errors', errors.length === 0, errors.join(' | '));
  await ctx.close();
}

// ── seasonal themes appear only in season ────────────────────────
const SEASONAL = ['halloween', 'winter'];
for (const [label, iso, expected] of [
  ['out of season',     '2026-08-11T12:00:00', []],
  ['late October',      '2026-10-25T12:00:00', ['halloween']],
  ['just past Nov 2',   '2026-11-03T12:00:00', []],
  ['mid December',      '2026-12-15T12:00:00', ['winter']],
  ['early January',     '2027-01-03T12:00:00', ['winter']],
  ['past the window',   '2027-01-09T12:00:00', []],
]) {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.clock.setFixedTime(new Date(iso));
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  const shown = (await chips(page)).filter(c => SEASONAL.includes(c));
  check(`seasonal: ${label} offers [${expected.join(',') || '—'}]`,
    JSON.stringify(shown.sort()) === JSON.stringify(expected.sort()), `got [${shown}]`);

  // out of season it must still be readable in the stats
  const t = await tabs(page);
  check(`seasonal: ${label} keeps every seasonal stats tab`,
    SEASONAL.every(k => t.includes(k)), t.join(','));
  await ctx.close();
}

// a theme chosen in season must not strand the player once it closes
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.clock.setFixedTime(new Date('2026-10-25T12:00:00'));
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.click('[data-theme="halloween"]');
  await page.waitForTimeout(250);
  check('seasonal: it can be selected while in season',
    await page.evaluate(() => JSON.parse(localStorage.getItem('wg_settings')).theme) === 'halloween');

  await page.clock.setFixedTime(new Date('2026-12-20T12:00:00'));
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  const theme = await page.evaluate(() => JSON.parse(localStorage.getItem('wg_settings')).theme);
  check('seasonal: it falls back to "all" once out of season', theme === 'all', `theme "${theme}"`);
  await ctx.close();
}

// ── custom word lists ────────────────────────────────────────────
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });

  const parsed = await page.evaluate(() => window.WG.parseCustomWords(
    'plum GRAPE melon zz TOOLONGWORD plum 3BAD! cherry'));
  check('custom: words are upper-cased', parsed.words.includes('PLUM') && parsed.words.includes('GRAPE'));
  check('custom: too short and too long are rejected',
    !parsed.words.includes('ZZ') && !parsed.words.includes('TOOLONGWORD'));
  check('custom: non-letters are rejected', !parsed.words.some(w => /[^A-Z]/.test(w)));
  check('custom: duplicates collapse', parsed.words.filter(w => w === 'PLUM').length === 1);
  check('custom: rejects are counted', parsed.skipped === 4, `skipped ${parsed.skipped}`);

  const capped = await page.evaluate(() =>
    window.WG.parseCustomWords(Array.from({ length: 900 }, (_, i) =>
      'AAAA'.slice(0, 4) + String(i).padStart(0, '')).join(' ')).words.length);
  check('custom: the list is capped', capped <= 500, `${capped}`);
  await ctx.close();
}

{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  check('custom: no chip before a list is loaded', (await chips(page)).includes('custom') === false);

  // OS temp, not the repo — a suite should not leave files in the working tree
  const tmp = join(tmpdir(), 'wg-test-list.txt');
  writeFileSync(tmp, 'GRAPE\nMELON\nPEACH\nLEMON\nMANGO\nOLIVE\nBERRY\nGUAVA\nzz\n3BAD!\n');
  await page.click('[data-settings-open]');
  await page.waitForTimeout(250);
  await page.setInputFiles('[data-custom-file]', tmp);
  await page.waitForTimeout(500);

  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('wg_custom_words')));
  check('custom: importing a file stores the usable words', stored.length === 8, JSON.stringify(stored));
  check('custom: the chip appears once a list exists', (await chips(page)).includes('custom'));

  // it must actually be the pool the game draws from
  await page.evaluate(() => {
    const s = JSON.parse(localStorage.getItem('wg_settings') || '{}');
    s.theme = 'custom'; s.wordLength = 5; s.wordDifficulty = 'any'; s.sound = false;
    localStorage.setItem('wg_settings', JSON.stringify(s));
  });
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  const preview = await page.$eval('[data-theme-preview]', el => el.textContent.trim());
  check('custom: the preview counts the imported words', /\b8\b/.test(preview), preview);

  // clearing must not strand the player on a theme with no words
  await page.click('[data-settings-open]');
  await page.waitForTimeout(250);
  await page.click('[data-custom-clear]');
  await page.waitForTimeout(300);
  check('custom: clearing empties the store',
    await page.evaluate(() => localStorage.getItem('wg_custom_words')) === null);
  check('custom: clearing drops the chip', (await chips(page)).includes('custom') === false);
  check('custom: clearing resets the selected theme',
    await page.evaluate(() => JSON.parse(localStorage.getItem('wg_settings')).theme) === 'all');
  check('custom: no page errors', errors.length === 0, errors.join(' | '));
  rmSync(tmp, { force: true });
  await ctx.close();
}

// ── ?list= takes the same validation, and cannot wipe a good list ─
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(base + '/?list=PLUM,GRAPE,MELON,zz,BANANA,3BAD,CHERRY', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('wg_custom_words')));
  check('custom: a ?list= link imports the usable words',
    JSON.stringify(stored) === JSON.stringify(['PLUM', 'GRAPE', 'MELON', 'BANANA', 'CHERRY']), JSON.stringify(stored));
  check('custom: a ?list= link says so', await page.$eval('[data-toast]', el => !el.hidden));

  await page.goto(base + '/?list=zz,3BAD,TOOLONGWORD', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  const after = await page.evaluate(() => JSON.parse(localStorage.getItem('wg_custom_words')));
  check('custom: an unusable ?list= leaves the existing list alone',
    JSON.stringify(after) === JSON.stringify(['PLUM', 'GRAPE', 'MELON', 'BANANA', 'CHERRY']), JSON.stringify(after));
  // toast() used to hang its timer off `eng`, which is not initialised this early
  check('custom: a toast raised during startup does not throw', errors.length === 0, errors.join(' | '));
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
