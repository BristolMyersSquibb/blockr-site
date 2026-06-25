# Hero stepper — Implementation

## Files (all under `.vitepress/theme/components/landing/`)

| File | Role | ~LOC |
| --- | --- | --- |
| `walkthrough-steps.js` | step data (single source of truth) | 9 |
| `motion.js` | shared `useInView` (and `reveal` / `useScrollProgress`, used elsewhere) | 118 |
| `Hero.vue` | orchestrator: `active`, dwell timer, gating, dot track, caption | 119 |
| `BoardSteps.vue` | the board mock: N frames + their CSS choreography | ~630 |

The authoritative source is these four files in the repo; this section pins down
the parts that are easy to get wrong. `BoardSteps.vue` is large but mechanical
(repeated frame markup + keyframes) — reproduce it by copying the file. The three
small files are reproduced in full below.

### `walkthrough-steps.js`

```js
// Shared step list for the walkthrough, used by the hero (auto-played).
export const walkthroughSteps = [
  { n: '01', title: 'Add data',            body: 'Pick any data block.' },
  { n: '02', title: 'Connect',             body: 'Control data flow between blocks.' },
  { n: '03', title: 'Configure',           body: 'Filter, mutate, join and more …' },
  { n: '04', title: 'Arrange & visualise', body: 'Connect a plot, then arrange.' },
  { n: '05', title: 'Save & share',        body: 'Save the board, ready to share.' }
]
```

### `motion.js` — `useInView` (the only export the stepper needs)

```js
import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useInView(target, { once = true } = {}) {
  const inView = ref(false)
  let io
  onMounted(() => {
    const el = target.value
    if (!el || typeof IntersectionObserver === 'undefined') { inView.value = true; return }
    io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { inView.value = true; if (once) io.unobserve(el) }
        else if (!once) { inView.value = false }
      })
    }, { rootMargin: '200px 0px' })
    io.observe(el)
  })
  onBeforeUnmount(() => io && io.disconnect())
  return { inView }
}
```

The stepper uses `{ once: false }` so the timer also stops when scrolled away.

### `Hero.vue` — orchestrator

The driver in full (template/style abbreviated; the dot track + caption markup
and `.hsteps` styles are the only theme-coupled bits):

```js
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { useInView } from './motion.js'
import BoardSteps from './BoardSteps.vue'
import { walkthroughSteps as steps } from './walkthrough-steps.js'

const active = ref(0)
const artEl = ref(null)
const { inView } = useInView(artEl, { once: false })
const hovering = ref(false)
const reduced = typeof window !== 'undefined' && window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
const dwell = [4000, 3800, 5000, 7300, 3600]   // ms per step; index === active
let timer = null
function tick() {
  timer = setTimeout(() => {
    if (!hovering.value) active.value = (active.value + 1) % steps.length
    tick()
  }, dwell[active.value])
}
function play() { if (timer || reduced) return; tick() }
function stop() { if (timer) { clearTimeout(timer); timer = null } }
watch(inView, (v) => { v ? play() : stop() }, { immediate: true })
onBeforeUnmount(stop)
const setStep = (i) => { active.value = i }
const cur = computed(() => steps[active.value])
```

Template essentials:

```html
<div class="hero-art" ref="artEl"
     @mouseenter="hovering = true" @mouseleave="hovering = false"
     @focusin="hovering = true"   @focusout="hovering = false">
  <BoardSteps :active="active" />
  <div class="hsteps">
    <div class="hs-track">
      <button v-for="(s, i) in steps" :key="s.n" type="button" class="hs-dot"
              :class="{ on: i === active, done: i < active }"
              :aria-label="s.title" @click="setStep(i)"></button>
    </div>
    <p class="hs-cap" :key="cur.n">
      <span class="hs-n">{{ cur.n }}</span>
      <strong>{{ cur.title }}</strong>
      <span class="hs-b">{{ cur.body }}</span>
    </p>
  </div>
</div>
```

Dot/caption styles (scoped): `.hs-dot` 9px circle → `.on` 26px brand pill,
`.done` brand@55%; `.hs-cap` re-fades via `:key="cur.n"` + `@keyframes hs-fade`;
`.hs-b` hidden under 560px; caption fade disabled under reduced motion. The hero
grid is `grid-template-columns: 0.78fr 1.22fr` at ≥900px (the mock is the wider,
right column), single column below.

### `BoardSteps.vue` — the mock (conventions to reproduce exactly)

Structure: `<div class="bw"><div class="app"><div class="appbar">…Save button…
</div><div class="frames"> <div class="fr" :class="{show:active===k}">…</div> ×N
</div></div></div>`, then a `<style scoped>` block.

Reproduce these conventions faithfully:

* **Frames** are absolute, `opacity:0`, `.show` → `opacity:1`, crossfaded
  `transition: opacity .75s cubic-bezier(.4,0,.2,1)`. `.frames` is
  `aspect-ratio: 16/10`.
* **Per-step animation** is `.fr.show .x { animation: … forwards }` (replays on
  every (re)activation) — never JS-driven.
* **Step 04** is one 7 s, three-phase sequence built on `.dock.arr3` panels
  (`pw` workflow / `pf` filter / `pp` plot): `arrF` grows the middle Filter
  panel `flex-grow 0→2` only at ~82–92 % (the "drop"); `ppPlotIn` reveals the
  Plot tab (~26–42 %); `ppOut`/`ppIn` cross-fade the right body filter→chart;
  `arrHand` is the grabbing hand — it **appears on the Filter tab header
  (`top:9%`), dwells (~52–62 %), then drags slowly to the gap (~87 %)**; `vguide`
  previews the one-third footprint (~66–86 %). The connection in this step uses
  `.m5wire` (purple wire) + a grabbing-hand `.m5cur`.
* **Wire/cursor sync** (steps 02 + 04a): wire path is a plain line
  (`d="M12 3 V58"`), `stroke-dasharray` **== 55** (the path length) so the dash
  reveal is linear and tracks the cursor (same `2.4s`/`1.5s` duration, same
  delay, same `ease`). The `.ahead` chevron is a separate path that fades in
  after the line lands (`aheadIn`, delayed to the wire's completion).
* **Navbar Save cursor** (`.s8cur`, step 05): targets the button at a fixed
  pixel offset (`left: 208px; top: -26px` — i.e. into the navbar, which sits
  above `.frames`) with `transform: translate(-9px,-9px)` so the glyph centre
  lands on the button regardless of width. If the navbar layout changes, this
  offset must be re-measured.
* **Local palette** on `.bw`:
  `--ink:#3c3c43; --mut:#67676c; --line:#e6e7eb; --soft:#f4f4f6; --purple:#7b61ff`.
  Block accents: data `#0072b2` on `#e6f0f7`, filter `#009e73` on `#e3f3ee`,
  plot `#e69f00` on `#fbf0db`.
* **Reduced motion**: a single `@media (prefers-reduced-motion: reduce)` block
  sets `animation: none` on every `.fr.show .*` and pins each frame's elements to
  their final state (Data placed, wire connected, B rows shown, three panels
  docked, board saved).
* The fake cursor SVGs: **arrow** `M5 3l14 7-6 2-2 6-6-15z`; **grabbing hand**
  = four stroked paths
  (`M9 12.5V8.4a1.25 1.25 0 0 1 2.5 0v3.4` / `M11.5 11.2V6.9a1.25 1.25 0 0 1 2.5 0v4.5`
  / `M14 11.4V7.7a1.25 1.25 0 0 1 2.5 0V12`
  / `M16.5 12v-2a1.25 1.25 0 0 1 2.5 0v5c0 3-1.9 5-5 5-1.8 0-3-.6-4.1-1.8L8 16c-.6-.8.4-1.9 1.3-1.4l1.2.7`)
  with `fill="#fff" stroke="#1b1b1f" stroke-width="1.4"`.

## Integration into the landing header

The widget is mounted by the landing page, which is a VitePress custom-theme
component composed in `Landing.vue` and rendered from the home page front-matter.

* `index.md` uses `layout: home`-style front matter / a `<Landing />` mount (the
  repo's existing landing entry); **no change needed there** beyond what already
  references `Landing.vue`.
* `Landing.vue` imports and renders `<Hero />` first:

  ```js
  import './landing.css'
  import Hero from './Hero.vue'
  // … other sections
  ```
  ```html
  <div class="landing"><Hero /> … </div>
  ```

* `Hero.vue` imports `BoardSteps.vue`, `walkthrough-steps.js`, and `useInView`
  from `motion.js`. No theme registration, no plugin, no global CSS edits — the
  only shared CSS it consumes is the existing `landing.css` tokens/buttons.

That is the entire integration surface: **drop in the four component files and
render `<Hero />` from the landing page.** Nothing outside
`.vitepress/theme/components/landing/` changes.

## Reproduction checklist

1. Copy the four files into `.vitepress/theme/components/landing/`.
2. Ensure `Landing.vue` renders `<Hero />` and imports `landing.css` (tokens:
   `--lp-*`, `.lp-container`, `.lp-eyebrow`, `.lp-btn`).
3. Verify under `vitepress dev`: the hero right column auto-plays 5 steps,
   loops, pauses on hover, dots jump, caption updates.
4. Verify `prefers-reduced-motion`: no motion, each frame legible at rest.
5. Verify width-robustness: at 1100 px and 1500 px the step-05 cursor still lands
   centred on the Save button.

## Verification method used while building

Headless Chrome via R `{chromote}`: navigate to the dev server, hover the
`.hero-art` to pause auto-play, click `.hs-dot[n]` to select a step, `sleep` to a
known point in that step's timeline, and `captureScreenshot` clipped to
`.hero-art`. Element centres were measured with `getBoundingClientRect()`
relative to `.frames` to position the faked cursors precisely (especially the
pixel-anchored navbar Save target).
