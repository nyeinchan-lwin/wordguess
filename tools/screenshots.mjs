// Regenerates the screenshots in report.md and the og-image used by the social
// meta tags. Run after any change that alters how the game looks:
//
//   npm run screenshots
//
// The game shots play today's daily challenge, so the board shown is a real
// game with real feedback colours rather than a staged board.
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { startServer } from '../test/serve.mjs';

const PORT = Number(process.env.WG_PORT) || 8125;
const SRC = readFileSync(fileURLToPath(new URL('../script.js', import.meta.url)), 'utf8');

const DESKTOP = { width: 1280, height: 800 };
const MOBILE  = { width: 390,  height: 844 };

// ── work out today's daily answer, so a win can be driven deliberately ──
// Mirrors pickDailyWord(): theme from the date, length pinned to DAILY_LENGTH.
function list(name) {
  return [...SRC.match(new RegExp(`const ${name} = \\[([\\s\\S]*?)\\n\\s*\\];`))[1]
    .matchAll(/'([^']*)'/g)].map(x => x[1]);
}
function themeLists() {
  const block = SRC.match(/const THEMES = \{([\s\S]*?)\n {2}\};/)[1];
  const out = {};
  // Entries span several lines, grouped by word length — matching
  // test/wordlists.mjs. A line-at-a-time parser silently yields no themes,
  // which sends the daily answer below down the wrong fallback.
  for (const m of block.matchAll(/(\w+):\s*\[([^\]]*)\]/g)) {
    out[m[1]] = [...m[2].matchAll(/'([^']*)'/g)].map(x => x[1]);
  }
  return out;
}

const DAILY_LENGTH = Number(SRC.match(/const DAILY_LENGTH = (\d+);/)[1]);
const DAILY_THEMES = SRC.match(/const DAILY_THEMES = \[(.*?)\];/)[1]
  .split(',').map(s => s.trim().replace(/'/g, ''));
const THEMES = themeLists();
const ANSWERS = list('ANSWERS');

// Fail loudly rather than fall through to the wrong answer below: an empty
// parse just means the parser drifted from script.js, and the only symptom
// downstream is the modal never opening, 8 seconds later.
if (Object.keys(THEMES).length === 0) {
  throw new Error('parsed no themes from script.js — themeLists() is out of date');
}

const d = new Date();
const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
let hash = 0;
for (let i = 0; i < dateStr.length; i++) hash = ((hash << 5) - hash + dateStr.charCodeAt(i)) | 0;

const dailyTheme = DAILY_THEMES[Math.abs(hash) % DAILY_THEMES.length];
let pool = (THEMES[dailyTheme] || []).filter(w => w.length === DAILY_LENGTH);
if (pool.length === 0) pool = ANSWERS.filter(w => w.length === DAILY_LENGTH);
const ANSWER = pool[Math.abs(hash) % pool.length];

// Two openers that are not the answer, to produce a mix of tile states.
const OPENERS = ANSWERS.filter(w => w.length === DAILY_LENGTH && w !== ANSWER).slice(0, 2);

console.log(`today: ${dateStr}  theme: ${dailyTheme}  answer: ${ANSWER}`);

const { server, base, root } = await startServer(PORT);
const browser = await chromium.launch();

async function newPage(viewport) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  // A clean slate every time, so no stored streak or completed daily leaks in.
  await page.evaluate(() => localStorage.clear());
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  return { ctx, page };
}

async function type(page, word) {
  for (const ch of word) await page.keyboard.press(ch);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(1100);
}

async function startDaily(page) {
  await page.click('[data-daily]');
  await page.waitForSelector('[data-screen="en"]:not([hidden])');
  await page.waitForTimeout(400);
  // The start button keeps focus; Enter would re-activate it and restart.
  await page.evaluate(() => document.activeElement && document.activeElement.blur());
}

const shots = [];
// Full page by default: at 1280x800 the on-screen keyboard's bottom row falls
// below the fold, and a showcase screenshot should not be missing part of the
// UI. The result shot is the exception — its modal is position:fixed, so a full
// page capture strands it above a band of empty page.
async function shot(page, file, fullPage = true) {
  const path = `${root}screenshots/${file}`;
  // Park the pointer off-canvas first. It otherwise stays wherever the last
  // click left it, and `.key:hover` brightened whichever key happened to sit
  // under that coordinate on the next screen — on mobile it lit up "V".
  await page.mouse.move(-50, -50);
  await page.waitForTimeout(150);
  await page.screenshot({ path, fullPage });
  shots.push(file);
  console.log(`  wrote screenshots/${file}`);
}

// 01 — menu
{
  const { ctx, page } = await newPage(DESKTOP);
  await shot(page, '01-menu.png');
  await ctx.close();
}

// 02 — mid-game, two guesses in
{
  const { ctx, page } = await newPage(DESKTOP);
  await startDaily(page);
  for (const w of OPENERS) await type(page, w);
  await shot(page, '02-game.png');
  await ctx.close();
}

// 03 — result modal after a win
{
  const { ctx, page } = await newPage(DESKTOP);
  await startDaily(page);
  for (const w of OPENERS) await type(page, w);
  await type(page, ANSWER);
  await page.waitForSelector('[data-modal]:not([hidden])', { timeout: 8000 });
  await page.waitForTimeout(600);
  const result = await page.$eval('[data-modal] .modal-card', el => el.dataset.result);
  if (result !== 'win') throw new Error(`expected a win for the result shot, got "${result}"`);
  await shot(page, '03-result.png', false);
  await ctx.close();
}

// 04 / 05 — mobile menu and mobile game
{
  const { ctx, page } = await newPage(MOBILE);
  await shot(page, '04-mobile-menu.png');
  await startDaily(page);
  for (const w of OPENERS) await type(page, w);
  await shot(page, '05-mobile-game.png');
  await ctx.close();
}

// og-image — the social preview referenced by the meta tags in index.html
{
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 } });
  const page = await ctx.newPage();
  await page.goto(base + '/tools/og-image.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${root}og-image.png` });
  console.log('  wrote og-image.png');
  await ctx.close();
}

await browser.close();
server.close();
console.log(`\n✓ ${shots.length} screenshots + og-image.png regenerated`);
