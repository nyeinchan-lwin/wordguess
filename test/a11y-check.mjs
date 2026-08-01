import { chromium } from 'playwright';

const base = process.argv[2] || 'http://localhost:8099';
const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on('pageerror', e => errors.push(String(e)));
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });

await page.goto(base);
await page.waitForTimeout(300);

const results = [];
const check = (name, pass, detail = '') => results.push({ name, pass, detail });

// ── aria-pressed on menu chips ─────────────────────────────────
const pressedStates = await page.$$eval('.theme-chip', els =>
  els.map(e => ({ theme: e.dataset.theme, pressed: e.getAttribute('aria-pressed'), active: e.classList.contains('active') })));
check('theme chips all have aria-pressed', pressedStates.every(s => s.pressed !== null));
check('exactly one theme chip pressed=true', pressedStates.filter(s => s.pressed === 'true').length === 1,
  JSON.stringify(pressedStates.filter(s => s.pressed === 'true')));
check('aria-pressed matches .active class', pressedStates.every(s => (s.pressed === 'true') === s.active));

// click a different theme -> aria-pressed must follow
await page.click('.theme-chip[data-theme="food"]');
await page.waitForTimeout(150);
const after = await page.$$eval('.theme-chip', els =>
  els.map(e => ({ theme: e.dataset.theme, pressed: e.getAttribute('aria-pressed') })));
check('clicking Food sets its aria-pressed=true',
  after.find(s => s.theme === 'food').pressed === 'true');
check('previous chip reset to aria-pressed=false',
  after.find(s => s.theme === 'all').pressed === 'false');
check('still exactly one pressed after click',
  after.filter(s => s.pressed === 'true').length === 1);

// word-length chips
const lens = await page.$$eval('.word-length-chip', els =>
  els.map(e => ({ len: e.dataset.wordLength, pressed: e.getAttribute('aria-pressed') })));
check('word-length chips have aria-pressed', lens.every(s => s.pressed !== null));
await page.click('.word-length-chip[data-word-length="6"]');
await page.waitForTimeout(150);
const lens2 = await page.$$eval('.word-length-chip', els =>
  els.map(e => ({ len: e.dataset.wordLength, pressed: e.getAttribute('aria-pressed') })));
check('clicking length 6 updates aria-pressed',
  lens2.find(s => s.len === '6').pressed === 'true' && lens2.filter(s => s.pressed === 'true').length === 1);

// ── stats tablist ──────────────────────────────────────────────
await page.click('[data-stats-open]');
await page.waitForTimeout(300);

const roving = () => page.$$eval('[data-stats-theme]', els =>
  els.map(e => ({ t: e.dataset.statsTheme, sel: e.getAttribute('aria-selected'), ti: e.getAttribute('tabindex') })));

let r = await roving();
check('exactly one tab aria-selected=true', r.filter(x => x.sel === 'true').length === 1);
check('exactly one tab tabindex=0 (roving)', r.filter(x => x.ti === '0').length === 1,
  JSON.stringify(r.map(x => x.ti)));
check('selected tab is the tabbable one',
  r.find(x => x.sel === 'true').t === r.find(x => x.ti === '0').t);

// tabs must control a real tabpanel
const panel = await page.$eval('[data-stats-panel]', el => ({
  role: el.getAttribute('role'), id: el.id, labelledby: el.getAttribute('aria-labelledby')
}));
check('tabpanel exists with role=tabpanel', panel.role === 'tabpanel');
const controls = await page.$$eval('[data-stats-theme]', els => els.map(e => e.getAttribute('aria-controls')));
check('every tab aria-controls the panel', controls.every(c => c === panel.id), JSON.stringify([...new Set(controls)]));
check('panel aria-labelledby points at selected tab',
  panel.labelledby === 'stats-tab-' + r.find(x => x.sel === 'true').t, panel.labelledby);

// arrow keys
await page.focus('[data-stats-theme="all"]');
await page.keyboard.press('ArrowRight');
await page.waitForTimeout(120);
r = await roving();
let focused = await page.evaluate(() => document.activeElement.dataset.statsTheme);
check('ArrowRight moves selection to next tab', r.find(x => x.sel === 'true').t === 'animals', r.find(x => x.sel === 'true').t);
check('ArrowRight moves DOM focus too', focused === 'animals', focused);

await page.keyboard.press('ArrowLeft');
await page.keyboard.press('ArrowLeft');
await page.waitForTimeout(120);
focused = await page.evaluate(() => document.activeElement.dataset.statsTheme);
check('ArrowLeft wraps to last tab', focused === 'art', focused);

await page.keyboard.press('Home');
await page.waitForTimeout(120);
focused = await page.evaluate(() => document.activeElement.dataset.statsTheme);
check('Home jumps to first tab', focused === 'all', focused);

await page.keyboard.press('End');
await page.waitForTimeout(120);
focused = await page.evaluate(() => document.activeElement.dataset.statsTheme);
check('End jumps to last tab', focused === 'art', focused);

const panelAfter = await page.$eval('[data-stats-panel]', el => el.getAttribute('aria-labelledby'));
check('panel label follows arrow-key selection', panelAfter === 'stats-tab-art', panelAfter);

// ── layout not broken by the wrapper ───────────────────────────
const widths = await page.evaluate(() => {
  const card = document.querySelector('[data-stats-overlay] .modal-card');
  const p = document.querySelector('[data-stats-panel]');
  const row = document.querySelector('[data-stats-overlay] .stats-row');
  return { card: card.getBoundingClientRect().width, panel: p.getBoundingClientRect().width, row: row.getBoundingClientRect().width };
});
check('stats panel stretches to card width', Math.abs(widths.panel - widths.row) < 2 && widths.panel > widths.card * 0.7,
  JSON.stringify(widths));

// ── focus trap still contains focus ────────────────────────────
const inOverlay = () => page.evaluate(() => {
  const el = document.activeElement;
  const overlay = document.querySelector('[data-stats-overlay]');
  return { inside: !!el && overlay.contains(el), desc: el ? el.tagName + '.' + el.className : 'none' };
});

let escapedFwd = null;
for (let i = 0; i < 30; i++) {
  await page.keyboard.press('Tab');
  const s = await inOverlay();
  if (!s.inside) { escapedFwd = `after ${i + 1} Tab(s) → ${s.desc}`; break; }
}
check('focus trap: 30x Tab stays inside overlay', escapedFwd === null, escapedFwd || '');

let escapedBack = null;
for (let i = 0; i < 30; i++) {
  await page.keyboard.press('Shift+Tab');
  const s = await inOverlay();
  if (!s.inside) { escapedBack = `after ${i + 1} Shift+Tab(s) → ${s.desc}`; break; }
}
check('focus trap: 30x Shift+Tab stays inside overlay', escapedBack === null, escapedBack || '');

// Tab must never land on a roving-tabindex inactive tab
await page.focus('[data-stats-panel]');
const landedOnInactive = await page.evaluate(async () => {
  const seen = [];
  for (const el of document.querySelectorAll('[data-stats-theme]')) {
    if (el.tabIndex === -1 && el === document.activeElement) seen.push(el.dataset.statsTheme);
  }
  return seen;
});
check('no inactive tab is focused via Tab order', landedOnInactive.length === 0, JSON.stringify(landedOnInactive));

const tabbables = await page.$$eval('[data-stats-overlay] button, [data-stats-overlay] [tabindex]',
  els => els.filter(e => e.tabIndex >= 0).length);
check('trap sees only tabbable elements (inactive tabs excluded)', tabbables > 0 && tabbables < 13, String(tabbables));

check('no console/page errors', errors.length === 0, errors.join(' | '));

await browser.close();

let failed = 0;
for (const { name, pass, detail } of results) {
  if (!pass) failed++;
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail && !pass ? '  → ' + detail : ''}`);
}
console.log(`\n${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
