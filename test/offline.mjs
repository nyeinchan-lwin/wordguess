// The service worker (#17).
//
// Two defects prompted this suite. `i18n.js` was loaded by the page and absent
// from the worker's asset list, so offline the app broke rather than losing
// translations. And the worker answered everything cache-first under a cache
// name that never changed, so a returning visitor kept the files they first
// received — sixty-four commits shipped behind that.
//
// The first check is static and catches the whole class: whatever the page
// references locally must be in ASSETS. The rest drive a real worker.
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const base = process.argv[2] || 'http://localhost:8080';
const root = new URL('../', import.meta.url);
const read = f => readFileSync(fileURLToPath(new URL(f, root)), 'utf8');

const results = [];
const check = (name, pass, detail = '') => results.push({ name, pass, detail });

// ── static: the asset list must cover what the page loads ────────
{
  const html = read('index.html');
  const sw = read('sw.js');
  const assets = [...sw.matchAll(/'\.\/([^']*)'/g)].map(m => m[1]).filter(Boolean);

  const referenced = [...html.matchAll(/(?:src|href)="([^"]+)"/g)]
    .map(m => m[1])
    .filter(u => !/^(https?:)?\/\//.test(u) && !u.startsWith('#') && !u.startsWith('data:'));

  const missing = referenced.filter(r => !assets.includes(r.replace(/^\.\//, '')));
  check('every local file the page loads is in the worker asset list',
    missing.length === 0, `missing: ${missing.join(', ')}`);

  check('the cache name is no longer the original v1',
    /const CACHE_NAME = 'wordguess-v(?!1')/.test(sw),
    (sw.match(/const CACHE_NAME = '[^']*'/) || [''])[0]);

  check('the document is not answered blindly from cache',
    /request\.mode === 'navigate'/.test(sw) && /fetch\(request\)/.test(sw));
}

const browser = await chromium.launch();

const activate = async page => {
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => navigator.serviceWorker &&
    navigator.serviceWorker.controller !== null, null, { timeout: 15000 }).catch(() => {});
  // give the install a moment to finish populating the cache
  await page.waitForTimeout(1200);
};

// ── the worker installs and caches what it promised ──────────────
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await activate(page);

  const state = await page.evaluate(async () => {
    const reg = await navigator.serviceWorker.getRegistration();
    const names = await caches.keys();
    const cache = await caches.open(names[0]);
    const keys = await cache.keys();
    return {
      registered: !!reg,
      controlled: navigator.serviceWorker.controller !== null,
      cacheNames: names,
      cached: keys.map(r => new URL(r.url).pathname.split('/').pop() || 'index'),
    };
  });

  check('the worker registers', state.registered);
  check('the worker controls the page', state.controlled);
  check('it uses exactly one cache', state.cacheNames.length === 1, state.cacheNames.join(','));
  for (const f of ['style.css', 'script.js', 'i18n.js', 'manifest.json']) {
    check(`${f} is cached`, state.cached.includes(f), state.cached.join(','));
  }
  await ctx.close();
}

// ── offline: the app still runs, translations included ───────────
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await activate(page);

  await ctx.setOffline(true);
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(800);

  const alive = await page.evaluate(() => ({
    chips: document.querySelectorAll('[data-theme]').length,
    buttons: document.querySelectorAll('[data-target]').length,
    // i18n.js is what defines these; without it the page throws instead of
    // falling back to English
    hasTranslator: typeof window.t === 'function' || typeof t === 'function',
  })).catch(err => ({ error: String(err) }));

  check('offline: the menu still renders', alive.chips > 0 && alive.buttons > 0, JSON.stringify(alive));
  check('offline: the translator from i18n.js is present', alive.hasTranslator === true, JSON.stringify(alive));
  check('offline: no page errors', errors.length === 0, errors.join(' | '));

  // and a game is actually playable with the network gone
  await page.click('button[data-target="en"]:not([data-daily]):not([data-tournament]):not([data-practice]):not([data-timed])');
  await page.waitForSelector('[data-screen="en"]:not([hidden])', { timeout: 5000 }).catch(() => {});
  const tiles = await page.$$eval('[data-grid] .tile', t => t.length).catch(() => 0);
  check('offline: a game starts and builds a grid', tiles > 0, `${tiles} tiles`);
  await ctx.close();
}

// ── a changed file reaches a visitor who already has the worker ──
// The original bug in one assertion: install the worker, change what the
// server returns, reload, and require the page to pick the change up.
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await activate(page);

  const MARK = 'WG_FRESHNESS_MARKER_' + Date.now();
  await ctx.route('**/script.js', async route => {
    const res = await route.fetch();
    route.fulfill({ response: res, body: (await res.text()) + `\nwindow.__fresh='${MARK}';` });
  });

  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  let seen = await page.evaluate(() => window.__fresh || null);

  // stale-while-revalidate serves the cached copy first, so the update is
  // allowed to land on the following load rather than this one
  if (seen !== MARK) {
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    seen = await page.evaluate(() => window.__fresh || null);
  }
  check('an updated asset reaches a controlled page within one reload',
    seen === MARK, `saw ${seen}`);
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
