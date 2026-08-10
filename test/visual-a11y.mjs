// Touch targets, colour contrast, focus rings and reduced motion.
//
// Regression guard for #56–#59: a 36x38 gear below the project's own 44px
// floor and a header too short to hold its buttons; a high-contrast mode that
// was *less* legible than the default (2.73:1 and 1.93:1); chips with no focus
// ring of their own and rings drawn in the accent colour on accent-coloured
// controls; and a reduced-motion block that covered four selectors while the
// screen fade, modal, distribution bars, toggle and confetti kept moving.
//
// Plus #62: a sweep of every visible text node in four colour modes, which is
// what caught muted text at 4.21:1, dark keyboard labels at 3.81:1 across all
// 28 unstyled keys, and the two banners using a state hue as text at ~3.9:1.
// The sweep is the guard that generalises — spot checks are what let these sit.
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const base = process.argv[2] || 'http://localhost:8080';

// A word that really is in the shipped valid set, so the challenge link is
// honoured and its banner is on screen to be measured. Same source of truth as
// test/challenge-links.mjs — read from the merge statements in script.js.
const SRC = readFileSync(fileURLToPath(new URL('../script.js', import.meta.url)), 'utf8');
const GOOD = [...SRC.match(/const EXTRA_6 = \[([\s\S]*?)\n\s*\];/)[1]
  .matchAll(/'([^']*)'/g)].map(x => x[1])[0];

const results = [];
const check = (name, pass, detail = '') => results.push({ name, pass, detail });

const FLOOR = 44;      // the project's touch-target floor
const AA_NORMAL = 4.5; // WCAG AA, text under 18.66px bold
const AA_LARGE = 3.0;

const browser = await chromium.launch();

// ── touch targets ───────────────────────────────────────────────
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });

  const menuGear = await page.$eval('[data-screen="menu"] .btn-settings', el => {
    const r = el.getBoundingClientRect(); return { w: r.width, h: r.height };
  });
  check(`menu gear is at least ${FLOOR}x${FLOOR}`,
    menuGear.w >= FLOOR && menuGear.h >= FLOOR, `${menuGear.w}x${menuGear.h}`);

  await page.click('button[data-target="en"]:not([data-daily]):not([data-tournament])');
  await page.waitForSelector('[data-screen="en"]:not([hidden])');
  await page.waitForTimeout(300);

  for (const [label, sel] of [['gear', '.btn-settings'], ['back', '.btn-back']]) {
    const box = await page.$eval('[data-screen="en"] ' + sel, el => {
      const r = el.getBoundingClientRect(); return { w: r.width, h: r.height };
    });
    check(`game ${label} is at least ${FLOOR}px tall`, box.h >= FLOOR, `${box.w}x${box.h}`);
  }
  await ctx.close();
}

// a short viewport must not shrink the header below its own buttons
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 560 } });
  const page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.click('button[data-target="en"]:not([data-daily]):not([data-tournament])');
  await page.waitForSelector('[data-screen="en"]:not([hidden])');
  await page.waitForTimeout(300);

  const fit = await page.evaluate(() => {
    const hdr = document.querySelector('[data-screen="en"] .site-header');
    const back = document.querySelector('[data-screen="en"] .btn-back');
    return { header: hdr.getBoundingClientRect().height, back: back.getBoundingClientRect().height };
  });
  check('short viewport: back button is at least 44px tall', fit.back >= FLOOR, `${fit.back}`);
  check('short viewport: header is tall enough to hold it',
    fit.header >= fit.back, `header ${fit.header} vs back ${fit.back}`);
  await ctx.close();
}

// ── contrast of the three tile/key states, in all four modes ────
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.click('button[data-target="en"]:not([data-daily]):not([data-tournament])');
  await page.waitForSelector('[data-screen="en"]:not([hidden])');
  await page.waitForTimeout(300);

  const lum = ([r, g, b]) => {
    const f = c => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
  const parse = s => s.match(/\d+(\.\d+)?/g).slice(0, 3).map(Number);

  const seen = {};
  for (const mode of ['light', 'light+hc', 'dark', 'dark+hc']) {
    await page.evaluate(m => {
      document.body.classList.toggle('dark', m.includes('dark'));
      document.body.classList.toggle('hc', m.includes('hc'));
    }, mode);
    for (const state of ['correct', 'present', 'absent']) {
      await page.evaluate(s => {
        document.querySelector('[data-grid] .tile').dataset.state = s;
        document.querySelector('[data-key]').dataset.state = s;
      }, state);
      // `.key` transitions background-color and `.tile` flips; read too early and
      // getComputedStyle hands back the colour it is animating *from*.
      await page.waitForTimeout(450);
      const got = await page.evaluate(() => {
        const read = el => { const c = getComputedStyle(el);
          return { bg: c.backgroundColor, fg: c.color, size: parseFloat(c.fontSize), weight: Number(c.fontWeight) }; };
        return { tile: read(document.querySelector('[data-grid] .tile')),
                 key: read(document.querySelector('[data-key]')) };
      });
      for (const [what, v] of Object.entries(got)) {
        const large = v.size >= 24 || (v.weight >= 700 && v.size >= 18.66);
        const need = large ? AA_LARGE : AA_NORMAL;
        const r = ratio(parse(v.bg), parse(v.fg));
        check(`${mode} ${what}.${state} meets AA (${need}:1)`, r >= need, `${r.toFixed(2)}:1`);
        seen[`${mode} ${what}.${state}`] = r;
      }
    }
  }

  // the whole point of high contrast: it must beat the default, not trail it
  for (const pair of ['tile.correct', 'tile.present', 'key.correct', 'key.present']) {
    for (const theme of ['light', 'dark']) {
      const plain = seen[`${theme} ${pair}`];
      const hc = seen[`${theme}+hc ${pair}`];
      check(`${theme}: high contrast ${pair} beats default`, hc > plain,
        `hc ${hc.toFixed(2)} vs default ${plain.toFixed(2)}`);
    }
  }
  await ctx.close();
}

// ── focus rings ─────────────────────────────────────────────────
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });

  // an .active chip is painted in the accent; a ring in the accent would vanish
  const rings = await page.evaluate(() => {
    const out = {};
    for (const sel of ['.theme-chip', '.word-length-chip', '.lang-btn', '.btn-primary']) {
      const el = document.querySelector('[data-screen="menu"] ' + sel);
      if (!el) { out[sel] = null; continue; }
      el.focus();
      const cs = getComputedStyle(el);
      out[sel] = {
        width: parseFloat(cs.outlineWidth) || 0,
        style: cs.outlineStyle,
        ring: cs.outlineColor,
        bg: cs.backgroundColor,
      };
    }
    return out;
  });

  for (const [sel, v] of Object.entries(rings)) {
    if (!v) { check(`${sel} exists to be focused`, false, 'not found'); continue; }
    check(`${sel} draws a focus ring`, v.width >= 2 && v.style !== 'none',
      `${v.width}px ${v.style}`);
    check(`${sel} ring is not its own background colour`, v.ring !== v.bg,
      `ring ${v.ring} on ${v.bg}`);
  }
  await ctx.close();
}

// ── reduced motion ──────────────────────────────────────────────
{
  const ctx = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });

  const still = await page.evaluate(() => {
    const ms = v => v.split(',').map(x => parseFloat(x) * (x.includes('ms') ? 1 : 1000));
    const out = {};
    const probe = (label, el) => {
      if (!el) { out[label] = null; return; }
      const cs = getComputedStyle(el);
      out[label] = { t: Math.max(0, ...ms(cs.transitionDuration)), a: Math.max(0, ...ms(cs.animationDuration)) };
    };
    probe('screen', document.querySelector('[data-screen]'));
    probe('chip', document.querySelector('.theme-chip'));
    probe('btn', document.querySelector('.btn'));
    probe('toggle', document.querySelector('.toggle'));
    // an inline animation, the way the confetti sets one
    const piece = document.createElement('div');
    piece.style.cssText = 'animation: confetti-fall 3s ease-out 0s forwards;';
    document.body.appendChild(piece);
    probe('inline-animation', piece);
    piece.remove();
    return out;
  });

  for (const [label, v] of Object.entries(still)) {
    if (!v) { check(`reduced motion: ${label} found`, false, 'not found'); continue; }
    check(`reduced motion: ${label} does not transition`, v.t <= 1, `${v.t}ms`);
    check(`reduced motion: ${label} does not animate`, v.a <= 1, `${v.a}ms`);
  }
  await ctx.close();
}

// ── every visible text node, both screens, four modes ───────────
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();

  // A challenge link so the challenge banner is on screen too — it uses a state
  // hue as text and was missed by a sweep that only visited the plain menu.
  await page.goto(base + '/', { waitUntil: 'networkidle' });

  const sweep = async label => {
    for (const mode of ['light', 'light+hc', 'dark', 'dark+hc']) {
      await page.evaluate(m => {
        document.body.classList.toggle('dark', m.includes('dark'));
        document.body.classList.toggle('hc', m.includes('hc'));
      }, mode);
      await page.waitForTimeout(350);
      const fails = await page.evaluate(() => {
        const lum = ([r, g, b]) => {
          const f = c => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
          return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
        };
        const nums = s => (s.match(/[\d.]+/g) || ['0', '0', '0']).map(Number);
        const rgb = s => nums(s).slice(0, 3);
        const opaque = s => { const n = nums(s); return n.length < 4 || n[3] > 0.99; };
        const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
        // walk up for the first background that actually paints
        const bgOf = el => {
          for (let n = el; n; n = n.parentElement) {
            const c = getComputedStyle(n).backgroundColor;
            if (c && !c.includes('rgba(0, 0, 0, 0)') && opaque(c)) return rgb(c);
          }
          return rgb(getComputedStyle(document.body).backgroundColor);
        };
        const out = [];
        for (const el of document.querySelectorAll('*')) {
          if (el.closest('[hidden], [inert]') || !el.offsetParent) continue;
          const own = [...el.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent.trim()).join('');
          if (!own) continue;
          const cs = getComputedStyle(el);
          if (cs.visibility === 'hidden' || +cs.opacity < 0.1) continue;
          const px = parseFloat(cs.fontSize);
          const large = px >= 24 || (Number(cs.fontWeight) >= 700 && px >= 18.66);
          const need = large ? 3.0 : 4.5;
          const r = ratio(bgOf(el), rgb(cs.color));
          if (r < need) out.push(`${el.tagName.toLowerCase()}${el.className ? '.' + String(el.className).trim().split(/\s+/).join('.') : ''} ${r.toFixed(2)}:1 <${need} "${own.slice(0, 18)}"`);
        }
        return [...new Set(out)];
      });
      check(`${label} ${mode}: every visible text node meets AA`, fails.length === 0,
        fails.slice(0, 4).join(' | ') + (fails.length > 4 ? ` (+${fails.length - 4} more)` : ''));
    }
    await page.evaluate(() => document.body.classList.remove('dark', 'hc'));
  };

  await sweep('menu');
  await page.click('button[data-target="en"]:not([data-daily]):not([data-tournament])');
  await page.waitForSelector('[data-screen="en"]:not([hidden])');
  await page.waitForTimeout(300);
  await sweep('game');

  await page.goto(`${base}/?w=${GOOD}&t=all&l=${GOOD.length}`, { waitUntil: 'networkidle' });
  await page.click('button[data-target="en"]:not([data-daily]):not([data-tournament])');
  await page.waitForSelector('[data-screen="en"]:not([hidden])');
  await page.waitForTimeout(300);
  const bannerUp = await page.$eval('[data-challenge-banner]', el => !el.hidden).catch(() => false);
  check('challenge banner is actually on screen to be measured', bannerUp);
  await sweep('challenge');
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
