# Hero stepper — Design

## Component layering

```text
walkthrough-steps.js      data: the ordered list of steps { n, title, body }
        |
        v
Hero.vue                  orchestrator: owns `active` step index, the auto-play
  (the hero section)      timer + dwell[], hover/visibility gating, the dot track
        |  :active prop    and caption. Mounts the mock and the stepper.
        v
BoardSteps.vue            presentational: renders all N frames; shows the one
  (the board mock)        matching `active`; each frame's CSS choreography plays
                          whenever it becomes `.show`. Knows nothing about timing.
        ^
        |
motion.js                 shared primitive: `useInView(target,{once})` →
                          reactive `inView` via IntersectionObserver.
```

The split is deliberate: **all timing/state lives in `Hero.vue`**, **all visual
choreography lives in `BoardSteps.vue`**, driven by a single `active: Number`
prop. This keeps the mock a pure function of `active` (trivially testable /
screenshot-able by setting the prop) and lets the same mock be reused by a
different driver (e.g. a scroll-scrubbed section) later.

## The frame model

`BoardSteps.vue` renders one `.bw > .app` "browser/app" chrome (a fake top bar
`.appbar` with logo, title, and a Save button) above a `.frames` box with a
fixed `aspect-ratio: 16 / 10`. Inside `.frames` are N sibling **frames**:

```html
<div class="fr" :class="{ show: active === k }"> … step k's board … </div>
```

* `.fr` is `position:absolute; inset:0; opacity:0`. `.fr.show { opacity:1 }`.
* Steps **cross-fade** via `transition: opacity .75s cubic-bezier(.4,0,.2,1)`.
* Each frame's **entrance choreography** is plain CSS `@keyframes` applied under
  `.fr.show .thing { animation: … forwards }`. Because the rule only matches
  while the frame has `.show`, the animation (re)plays every time that step
  becomes active — including on loop and on manual jump. No JS drives the
  per-step motion.

The board is composed from a small kit of primitives (all CSS-drawn, no images):

* `.panel` → `.ptab` (tab strip with `.tab` pills + coloured `.dot`) + a body
  (`.canvas` dotted grid, or `.detail` form, or `.bars` chart, or a data
  `.f4table`). Panels sit in a `.dock` flex row; `.dock.two` / `.dock.arr3` set
  panel ratios.
* Graph nodes `.gn` = a rounded `.gtile` (block icon, themed by inline
  `--t`/`--c`) + label `<em>` + connection ports `.pt` (`.pt.in`/`.pt.out`,
  `.pt.hot` = purple highlighted). Inline SVG `dbIcon`/`flIcon`/`ggIcon` are the
  Data/Filter/Plot block glyphs.
* A faked **cursor**: an inline SVG, either an arrow (`M5 3l14 7-6 2-2 6-6-15z`)
  or a **grabbing hand** (4 stroked finger paths), positioned `absolute` and
  animated by `left`/`top` keyframes.
* A **wire**: a straight purple `<path>` revealed with `stroke-dasharray` /
  `stroke-dashoffset`; a separate `.ahead` chevron that fades in at the end.
* A **drop guide** `.vguide`: a dashed purple rounded rect previewing where a
  dragged panel will land.

## The five steps

| # | `active` | title | what the frame shows / does |
| --- | --- | --- | --- |
| 01 | 0 | Add data | Block-browser sidebar open beside an empty canvas. Arrow cursor moves to the **Data block** card, clicks; the **Data** node drops onto the canvas. |
| 02 | 1 | Connect | Data + Filter nodes. A **grabbing hand** drags a **purple wire** from Data's output port down to Filter's input port; the wire's leading edge tracks the hand; an **arrowhead** pops at the input port on completion. |
| 03 | 2 | Configure | Workflow (Data→Filter) + a Filter panel: **Values** chips `A` `+` and a data **table**. Cursor clicks `+`, a **`B ×`** chip appears, and the two B rows **slide into** the table. |
| 04 | 3 | Arrange & visualise | A **3-phase, 7 s** sequence: **(a)** purple wire connects **Filter→Plot** in the DAG (grabbing hand); **(b)** the **Plot** opens as a **tab nested** on the Filter panel and the body cross-fades from the filter form to the chart; **(c)** the grabbing hand **drags the Filter tab out** — a purple **guide** previews its one-third footprint — and on release the Filter **docks as its own panel**, leaving three panels `Workflow │ Filter │ Plot`. |
| 05 | 4 | Save & share | The committed three-panel board. The cursor **rises into the navbar** and clicks the **Save** button; a **Workflows** dropdown confirms `Build_a_dashboard — Just now`. |

`walkthrough-steps.js` is the single source of truth for `{ n, title, body }`;
the dot count and caption are derived from it. Step 04 is intentionally the long,
"hero" beat — it merges connecting, visualising and arranging into one story.

## Auto-play state machine (Hero.vue)

* State: `active` (0…N-1), `hovering` (bool), `inView` (from `useInView`),
  `reduced` (matchMedia, evaluated once, SSR-guarded).
* `dwell` is a per-step array of milliseconds (longer where there's more to
  read). `tick()` schedules a `setTimeout(dwell[active])`; on fire, if not
  `hovering`, it advances `active = (active+1) % steps.length`, then re-arms.
* `play()`/`stop()` start/clear the timer. A `watch(inView)` plays when the
  widget scrolls in and stops when it scrolls out. `reduced` disables play
  entirely. Timer is cleared `onBeforeUnmount`.
* Hover/focus over `.hero-art` sets `hovering`; the timer keeps running but does
  not advance while hovering, so the visitor can read or click a dot.
* Dots: `.on` (active, elongated), `.done` (`i < active`, filled+dim), neutral
  otherwise. `@click="setStep(i)"` jumps. The caption `<p :key="cur.n">`
  re-mounts on change so its `hs-fade` keyframe replays.

## Faked-cursor positioning convention

Because the mock has no real pointer, every gesture is a positioned SVG animated
by `left`/`top`. Two anchoring rules keep clicks centred:

* **In-board targets** (block cards, ports, chips) scale with the panel, so `%`
  of the frame is fine.
* **Navbar targets** (the Save button) are pinned to a fixed pixel offset from
  the app edge, *not* a fixed `%` — so the cursor targets them with `px` /
  `calc(100% - …px)` / `calc(50% + …px)`, which stay aligned at any width. (An
  earlier `%`-based version drifted off the button on wider screens.)
* The cursor's **tip** is its hotspot; for small buttons we anchor the cursor's
  *centre* on the target (`transform: translate(-9px,-9px)`) so the whole glyph
  sits inside the control rather than dangling below it.

## Wire-draw convention

The wire `<path>` and the dragging cursor share the **same duration, delay and
easing**, and the dash length is set to the **path length** (`stroke-dasharray`
== line length) so `stroke-dashoffset: L→0` reveals the line **linearly**,
matching the cursor's linear travel. The arrowhead is a **separate** path (not
part of the dashed reveal, so it can't distort the length) that fades in shortly
after the line completes.

## Design tokens & theming

* Section/typography/buttons reuse the landing system in
  `landing.css` (`.lp-container`, `.lp-eyebrow`, `.lp-btn`, `--lp-shadow`) and
  VitePress brand/text/divider tokens.
* The mock root `.bw` declares a local palette
  `--ink #3c3c43, --mut #67676c, --line #e6e7eb, --soft #f4f4f6, --purple #7b61ff`
  plus block accent pairs (blue `#0072b2`, green `#009e73`, amber `#e69f00`) so
  the board reads consistently regardless of the page theme.

## Accessibility & performance

* `prefers-reduced-motion: reduce` → one media query disables every
  `.fr.show .*` animation and the cross-fade, and pins each frame's elements to
  their **final rest state** (e.g. step 04 shows the finished three-panel board,
  step 05 shows the saved state). The dots remain functional.
* Off-screen the timer is stopped (`useInView`), so a backgrounded hero costs
  nothing. The animations are GPU-friendly (`opacity`/`transform`/`flex-grow`).
* Dots are focusable buttons with labels; the caption conveys the same step name
  as text.
