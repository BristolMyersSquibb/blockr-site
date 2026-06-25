# Hero stepper — Requirements

## Must have

### Scope & footprint

* The widget is **purely presentational front-end**: HTML + scoped CSS + SVG +
  a few lines of Vue. **No new runtime dependencies** (no animation library, no
  images, no video, no iframe, no network calls).
* It is **additive** to the existing VitePress custom theme. Integrating it must
  not require restructuring `Landing.vue`, the theme entry, or global CSS beyond
  reusing the existing landing tokens.
* Self-contained in four files under
  `.vitepress/theme/components/landing/`: `Hero.vue`, `BoardSteps.vue`,
  `walkthrough-steps.js`, `motion.js` (the last is shared with other landing
  sections; only its `useInView` export is required).

### Behaviour

* A **5-step auto-playing stepper**. The step list is data-driven
  (`walkthrough-steps.js`); the number of dots and the caption derive from it.
* Each step is a **frame** showing a hand-built blockr board mock at a different
  point in the build, with a small **entrance choreography** (a faked cursor
  drags/clicks; wires draw; panels rearrange).
* **Auto-advance** on a per-step dwell timer (steps that have more to read get
  longer dwell). At the end it **loops** back to step 1.
* **Pause on hover / focus** anywhere over the mock; resume on leave.
* **Gated by visibility**: the timer only runs while the widget is in the
  viewport (`IntersectionObserver`); it stops when scrolled away.
* A **compact dot track** under the mock: one dot per step; the active dot is
  elongated/brand-coloured, past dots are filled/dim, future dots are neutral.
  Dots are real `<button>`s — clicking jumps to that step. Each has an
  `aria-label` of the step title.
* A **caption** (number badge + title + one-line body) that updates with the
  active step and re-animates on change.

### Cross-cutting

* **`prefers-reduced-motion: reduce`**: no auto-advance, no entrance animations,
  no caption fade; every frame is pinned to its **final rest state** so the mock
  is still legible and the dots still work.
* **SSR-safe**: must render under VitePress static build. All `window` /
  `matchMedia` access guarded; no DOM access at module top level.
* **Themed**: colours come from VitePress tokens (`--vp-c-brand-1`,
  `--vp-c-text-1/2/3`, `--vp-c-divider`, `--vp-c-bg*`) and the landing
  `--lp-shadow`; the mock defines a small local palette
  (`--ink/--mut/--line/--soft/--purple`) on its root so the block colours are
  stable across light/dark.
* **Responsive**: lives in the right column of the hero two-column grid
  (`0.78fr / 1.22fr` ≥ 900px, single column below). The mock scales fluidly; the
  dot caption body hides under 560px.
* **Width-robust faked cursor**: cursor targets that point at navbar elements
  (pinned to fixed pixel offsets) are positioned in `px`/`calc()`, not `%`, so
  they stay centred on their target at any viewport width. In-board targets that
  scale with the panel may use `%`.

## Should have

* The faked cursor uses an **arrow** for clicks and a **grabbing-hand** glyph for
  drag gestures (connecting ports, dragging a panel).
* Connection wires **draw in sync with the dragging cursor** (the wire's leading
  edge tracks the hand; the dash length equals the path length so the reveal is
  linear), with an arrowhead that pops in at the target port once connected.

## Non-goals

* No scroll-scrubbed / pinned variant, no second copy of the walkthrough
  elsewhere on the page (the shared `walkthrough-steps.js` leaves that open, but
  it is out of scope here).
* No changes to product packages (`blockr.core`, `blockr.dock`, …). This is a
  marketing-site widget only.
* No analytics, no persistence, no routing.
