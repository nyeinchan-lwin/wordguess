# Design System — WordGuess

Apply this skill whenever creating or editing any UI file (`index.html`, `style.css`). All visual decisions must reference the tokens defined here; never hardcode values.

---

## Colour palette

All colours are defined as CSS custom properties on `:root`.

| Token | Light value | Dark value | Usage |
|-------|-------------|------------|-------|
| `--color-bg` | `#ffffff` | `#121213` | Page background |
| `--color-surface` | `#f9f9f9` | `#1a1a1b` | Card / modal surface |
| `--color-border` | `#d3d6da` | `#3a3a3c` | Tile borders, dividers |
| `--color-text-primary` | `#1a1a1b` | `#ffffff` | Body copy, labels |
| `--color-text-muted` | `#787c7e` | `#818384` | Secondary / hint text |
| `--color-correct` | `#538d4e` | `#538d4e` | Correct letter (green) |
| `--color-present` | `#b59f3b` | `#b59f3b` | Wrong position (yellow) |
| `--color-absent` | `#787c7e` | `#3a3a3c` | Not in word (gray) |
| `--color-key-bg` | `#d3d6da` | `#818384` | Keyboard key default |
| `--color-key-text` | `#1a1a1b` | `#ffffff` | Keyboard key label |
| `--color-accent` | `#538d4e` | `#538d4e` | Buttons, focus rings |

High-contrast variants (activated via `.hc` class on `<body>`):

| Token override | Value |
|----------------|-------|
| `--color-correct` | `#f5793a` |
| `--color-present` | `#85c0f9` |

Dark mode is toggled via `.dark` on `<body>` (not `prefers-color-scheme` media query, so the user toggle works predictably).

---

## Typography

```css
--font-family: 'Clear Sans', 'Helvetica Neue', Arial, sans-serif;
--font-size-xs:   0.75rem;   /* 12 px — keyboard key labels on mobile */
--font-size-sm:   0.875rem;  /* 14 px — muted / helper text */
--font-size-base: 1rem;      /* 16 px — body */
--font-size-lg:   1.25rem;   /* 20 px — modal headings */
--font-size-xl:   1.5rem;    /* 24 px — page title */
--font-weight-normal: 400;
--font-weight-bold:   700;
--letter-spacing-tile: 0.05em;
```

All tile letters use `font-weight-bold` and `letter-spacing-tile`.

---

## Spacing scale

```css
--space-1:  0.25rem;   /*  4 px */
--space-2:  0.5rem;    /*  8 px */
--space-3:  0.75rem;   /* 12 px */
--space-4:  1rem;      /* 16 px */
--space-6:  1.5rem;    /* 24 px */
--space-8:  2rem;      /* 32 px */
--space-12: 3rem;      /* 48 px */
```

Use only these values for `margin`, `padding`, and `gap`. Do not interpolate between them.

---

## Tile styles

```
Size:         62 × 62 px (desktop) → 52 × 52 px (≤480 px)
Border:       2 px solid var(--color-border)
Border-radius: 0   (square tiles)
Font:         var(--font-size-xl), var(--font-weight-bold), uppercase
Transition:   border-color 100 ms ease
```

State variants (applied via data attribute `data-state`):

| `data-state` | Border | Background | Text colour |
|--------------|--------|------------|-------------|
| `empty`      | `--color-border` | transparent | — |
| `tbd`        | `--color-text-primary` | transparent | `--color-text-primary` |
| `correct`    | `--color-correct` | `--color-correct` | `#ffffff` |
| `present`    | `--color-present` | `--color-present` | `#ffffff` |
| `absent`     | `--color-absent` | `--color-absent` | `#ffffff` |

Flip animation on reveal: `transform: rotateX(180deg)`, 250 ms per tile, staggered by `50 ms × tile-index`.

Pop animation on letter entry: `scale(1.1)` → `scale(1)`, 100 ms.

Shake animation on invalid guess: horizontal translate ±4 px, 3 cycles, 400 ms total.

---

## Button styles

Primary button (submit / play again):

```
Background:   var(--color-accent)
Text:         #ffffff, var(--font-weight-bold), var(--font-size-sm)
Padding:      var(--space-3) var(--space-6)
Border-radius: 4 px
Border:       none
Cursor:       pointer
Focus-visible: outline 2 px solid var(--color-accent), outline-offset 2 px
Hover:        brightness(1.1)
Active:       brightness(0.95)
Disabled:     opacity 0.5, cursor not-allowed
```

Ghost button (secondary actions):

```
Background:   transparent
Text:         var(--color-text-primary)
Border:       1 px solid var(--color-border)
(all other values same as primary)
```

---

## Keyboard key styles

```
Height:       58 px (desktop) → 48 px (≤480 px)
Min-width:    43 px; wide keys (Enter, ⌫): 65 px
Border-radius: 4 px
Background:   var(--color-key-bg)
Text:         var(--color-key-text), var(--font-weight-bold), var(--font-size-xs)
Gap between keys: var(--space-1)
```

Keys adopt tile state colours once a letter has been evaluated (same `data-state` convention). Transition: `background-color 200 ms ease`, delayed until after tile flip completes (600 ms base delay + stagger).

---

## Layout

```
Max content width: 500 px, centred with auto margins
Header height:     50 px, border-bottom 1 px var(--color-border)
Grid gap:          var(--space-2) between tiles, var(--space-3) between rows
Keyboard padding:  var(--space-2) horizontal, var(--space-3) bottom
```

Modal overlay: `background rgba(0,0,0,0.5)`, centred flex, `z-index 100`. Modal card: `var(--color-surface)`, `border-radius 8 px`, `padding var(--space-8)`, `max-width 380 px`.

Toast notifications: fixed top `var(--space-12)`, centred, `background var(--color-text-primary)`, text `var(--color-bg)`, `border-radius 4 px`, `padding var(--space-2) var(--space-4)`, auto-dismiss after 1200 ms.

---

## Accessibility requirements

- Minimum contrast ratio 4.5 : 1 for all text on backgrounds (WCAG AA).
- Every interactive element reachable by keyboard; visible focus ring using `focus-visible`.
- Tile grid has `role="grid"` with `aria-label="Guesses"`.
- Each row is `role="row"`; each tile `role="gridcell"` with `aria-label` describing letter and state after reveal.
- On-screen keyboard keys are `<button>` elements (not `<div>`).
- A visually-hidden `aria-live="assertive"` region announces guess results to screen readers.
- All animations respect `@media (prefers-reduced-motion: reduce)`: disable flip, pop, shake; keep only instant state changes.
