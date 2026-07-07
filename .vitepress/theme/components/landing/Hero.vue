<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { useInView } from './motion.js'
import BoardSteps from './BoardSteps.vue'
import { walkthroughSteps as steps } from './walkthrough-steps.js'

// The hero shows what blockr *is*: a board coming together step by step
// (drag -> connect -> transform -> see results -> arrange -> save). The rich
// mock is shared with the walkthrough section; here it auto-plays, pauses on
// hover, and a compact stepper lets you jump to any step.
const active = ref(0)
const artEl = ref(null)
const { inView } = useInView(artEl, { once: false })
const hovering = ref(false)
const reduced = typeof window !== 'undefined' && window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
// Longer dwell where there's more to read (browser, result, pages, save).
const dwell = [4000, 3800, 5000, 7300, 3600]
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
</script>

<template>
  <section class="hero">
    <div class="lp-container hero-grid">
      <div class="hero-copy">
        <span class="lp-eyebrow">Visual, no-code framework for R</span>
        <h1 class="hero-title">
          Build R dashboards<br />by <span class="accent">dragging blocks</span>.
        </h1>
        <p class="hero-sub">
          Drag blocks, connect them, see results and arrange. R underneath.
        </p>
        <div class="hero-actions">
          <a class="lp-btn lp-btn--brand" href="https://blockr.cloud/app/empty" target="_blank">
            Try online
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M7 17 17 7M17 7H9m8 0v8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
          <a class="lp-btn lp-btn--alt" href="/learn/01-build-your-first-app">Get started</a>
        </div>
        <p class="hero-meta">Open source · GPL-3.0</p>
      </div>

      <div
        class="hero-art"
        ref="artEl"
        @mouseenter="hovering = true"
        @mouseleave="hovering = false"
        @focusin="hovering = true"
        @focusout="hovering = false"
      >
        <BoardSteps :active="active" />

        <div class="hsteps">
          <div class="hs-track">
            <button
              v-for="(s, i) in steps"
              :key="s.n"
              type="button"
              class="hs-dot"
              :class="{ on: i === active, done: i < active }"
              :aria-label="s.title"
              @click="setStep(i)"
            ></button>
          </div>
          <p class="hs-cap" :key="cur.n">
            <span class="hs-n">{{ cur.n }}</span>
            <strong>{{ cur.title }}</strong>
            <span class="hs-b">{{ cur.body }}</span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero { position: relative; padding: clamp(72px, 11vw, 132px) 0 clamp(48px, 8vw, 96px); overflow: hidden; }
.hero-grid { position: relative; z-index: 1; display: grid; grid-template-columns: 1fr; gap: 40px; align-items: center; }
@media (min-width: 900px) { .hero-grid { grid-template-columns: 0.78fr 1.22fr; gap: 44px; } }
.hero-title { font-size: clamp(2.3rem, 5.6vw, 4rem); line-height: 1.06; font-weight: 800; letter-spacing: -0.03em; margin: 0 0 20px; }
.hero-title .accent { color: var(--vp-c-brand-1); }
.hero-sub { font-size: clamp(1.02rem, 1.5vw, 1.22rem); line-height: 1.6; color: var(--vp-c-text-2); max-width: 26ch; margin: 0 0 28px; }
.hero-actions { display: flex; flex-wrap: wrap; gap: 14px; margin-bottom: 22px; }
.hero-meta { font-size: 0.85rem; color: var(--vp-c-text-3); margin: 0; }

.hero-art { position: relative; }

/* compact stepper under the board */
.hsteps { margin-top: 22px; }
.hs-track { display: flex; align-items: center; justify-content: center; gap: 7px; }
.hs-dot { width: 9px; height: 9px; padding: 0; border: 0; border-radius: 50%; background: var(--vp-c-divider); cursor: pointer; transition: width .3s ease, background .3s ease; }
.hs-dot.done { background: var(--vp-c-brand-1); opacity: .55; }
.hs-dot.on { width: 26px; border-radius: 5px; background: var(--vp-c-brand-1); opacity: 1; }
.hs-cap { display: flex; align-items: baseline; justify-content: center; gap: 8px; margin: 13px 0 0; font-size: .92rem; line-height: 1.4; }
.hs-n { font-variant-numeric: tabular-nums; font-weight: 700; font-size: .76rem; color: var(--vp-c-brand-1); border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 35%, transparent); border-radius: 6px; padding: 1px 6px; }
.hs-cap strong { font-weight: 700; color: var(--vp-c-text-1); }
.hs-b { color: var(--vp-c-text-2); }
.hs-cap { animation: hs-fade .45s ease; }
@keyframes hs-fade { from { opacity: 0; transform: translateY(4px); } }

@media (max-width: 560px) {
  .hs-b { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hs-cap { animation: none; }
}
</style>
