// Static checks on the word lists in script.js — no browser needed.
//
// The lists live inside the IIFE and are not exported, so this reads the
// source and rebuilds VALID_SET the way script.js says it builds it: from the
// merge statements actually present. Delete a merge and the checks below fail.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const SRC = readFileSync(fileURLToPath(new URL('../script.js', import.meta.url)), 'utf8');
const PLAYABLE = [4, 5, 6, 7];   // word lengths the UI offers

const results = [];
const check = (name, pass, detail = '') => results.push({ name, pass, detail });

function list(name) {
  const m = SRC.match(new RegExp(`const ${name} = \\[([\\s\\S]*?)\\n\\s*\\];`));
  if (!m) throw new Error(`array literal not found: ${name}`);
  return [...m[1].matchAll(/'([^']*)'/g)].map(x => x[1]);
}

function themeLists() {
  const block = SRC.match(/const THEMES = \{([\s\S]*?)\n {2}\};/);
  if (!block) throw new Error('THEMES object not found');
  const out = {};
  for (const line of block[1].split('\n')) {
    const m = line.match(/^\s*(\w+):\s*\[(.*)\],?\s*$/);
    if (m) out[m[1]] = [...m[2].matchAll(/'([^']*)'/g)].map(x => x[1]);
  }
  return out;
}

const THEMES = themeLists();
const EXTRA = { 4: list('EXTRA_4'), 5: list('EXTRA_5'), 6: list('EXTRA_6'), 7: list('EXTRA_7') };

// ── rebuild VALID_SET from what the source actually merges ──────
const mergedArrays = [...SRC.matchAll(/^\s*(\w+)\.forEach\(w => VALID_SET\.add\(w\)\);/gm)].map(m => m[1]);
const mergesThemes = /Object\.values\(THEMES\)\.flat\(\)\.forEach\(w => VALID_SET\.add\(w\)\);/.test(SRC);

check('VALID_SET is seeded from ANSWERS + EXTRA_VALID',
  /const VALID_SET = new Set\(\[\.\.\.ANSWERS, \.\.\.EXTRA_VALID\]\);/.test(SRC));
for (const name of ['EXTRA_4', 'EXTRA_5', 'EXTRA_6', 'EXTRA_7']) {
  check(`${name} is merged into VALID_SET`, mergedArrays.includes(name));
}
check('THEMES are merged into VALID_SET', mergesThemes);

const VALID = new Set([
  ...list('ANSWERS'),
  ...list('EXTRA_VALID'),
  ...mergedArrays.flatMap(list),
  ...(mergesThemes ? Object.values(THEMES).flat() : []),
]);

// ── every answer the game can pick must be typeable ─────────────
// Without this, a themed game is unwinnable: the guess validator rejects the
// answer itself.
for (const [theme, words] of Object.entries(THEMES)) {
  const unguessable = words.filter(w => PLAYABLE.includes(w.length) && !VALID.has(w));
  check(`${theme}: every playable answer is in VALID_SET`, unguessable.length === 0,
    unguessable.join(', '));
}

// ── list hygiene ────────────────────────────────────────────────
for (const [len, words] of Object.entries(EXTRA)) {
  const wrong = words.filter(w => w.length !== Number(len));
  check(`EXTRA_${len}: every entry is ${len} letters`, wrong.length === 0,
    wrong.map(w => `${w}(${w.length})`).join(', '));
  const dupes = [...new Set(words.filter((w, i) => words.indexOf(w) !== i))];
  check(`EXTRA_${len}: no duplicates`, dupes.length === 0, dupes.join(', '));
}

// Input is uppercased before lookup, so a mixed-case entry can never match.
const allWords = [...Object.values(EXTRA).flat(), ...Object.values(THEMES).flat()];
const mixed = allWords.filter(w => w !== w.toUpperCase());
check('no mixed-case entries (input is uppercased before lookup)', mixed.length === 0, mixed.join(', '));

const nonAlpha = allWords.filter(w => !/^[A-Z]+$/.test(w));
check('every entry is A-Z only', nonAlpha.length === 0, nonAlpha.join(', '));

// ── report ──────────────────────────────────────────────────────
let failed = 0;
for (const { name, pass, detail } of results) {
  if (!pass) failed++;
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail && !pass ? '  → ' + detail : ''}`);
}
console.log(`\n${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
