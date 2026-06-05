<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// Subtle pointer tilt on the mock (disabled for reduced motion). No raster
// image, no floating chips: a crisp vector blockr window instead.
const tilt = ref({ x: 0, y: 0 })
let reduced = false

function onPointer(e) {
  if (reduced) return
  const cx = window.innerWidth / 2
  const cy = window.innerHeight / 2
  tilt.value = { x: (e.clientX - cx) / cx, y: (e.clientY - cy) / cy }
}
const mockStyle = computed(() => ({
  transform: `perspective(1400px) rotateY(${tilt.value.x * -3}deg) rotateX(${tilt.value.y * 2.4}deg)`
}))

// palmerpenguins-style scatter: bill length vs body mass, coloured by species
const dots = [
  ['a', 16, 74], ['a', 24, 68], ['a', 20, 82], ['a', 31, 71], ['a', 27, 62], ['a', 12, 78],
  ['c', 46, 54], ['c', 53, 47], ['c', 42, 60], ['c', 57, 51], ['c', 49, 41], ['c', 38, 49],
  ['g', 69, 30], ['g', 78, 23], ['g', 83, 35], ['g', 73, 18], ['g', 64, 38], ['g', 88, 27]
]

onMounted(() => {
  reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!reduced) window.addEventListener('pointermove', onPointer, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('pointermove', onPointer))
</script>

<template>
  <section class="hero">
    <div class="hero-glow" aria-hidden="true"></div>
    <div class="lp-container hero-grid">
      <div class="hero-copy">
        <span class="lp-eyebrow">Visual, no-code framework for R</span>
        <h1 class="hero-title">
          Build R dashboards<br />by <span class="accent">dragging blocks</span>.
        </h1>
        <p class="hero-sub">
          Connect blocks into a dashboard. No code, just real R underneath.
        </p>
        <div class="hero-actions">
          <a class="lp-btn lp-btn--brand" href="https://blockr.cloud/app/empty" target="_blank">
            Try online
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M7 17 17 7M17 7H9m8 0v8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
          <a class="lp-btn lp-btn--alt" href="/learn/01-build-your-first-app">Get started</a>
        </div>
        <p class="hero-meta">Open source · GPL-3.0 · Built by cynkra &amp; BMS</p>
      </div>

      <div class="hero-art">
        <div class="mock" :style="mockStyle">
          <div class="m-bar">
            <span class="m-logo"></span>
            <span class="m-title">Penguins</span>
            <span class="m-saved">saved</span>
            <span class="m-spacer"></span>
            <span class="m-page">Page 1 <i>▾</i></span>
            <span class="m-avatar">D</span>
          </div>
          <div class="m-body">
            <!-- left column: the workflow graph + the filter controls -->
            <div class="m-left">
              <div class="m-panel m-wf">
                <div class="m-tab"><span class="m-dot g"></span>Workflow <i>×</i><span class="m-full">⤢</span></div>
                <div class="m-canvas">
                  <div class="m-node"><span class="m-ni" style="--t:#e6f0f7;--c:#0072b2"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.8"><ellipse cx="12" cy="6" rx="7" ry="2.6"/><path d="M5 6v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6"/><path d="M5 12v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6v-6"/></svg></span><em>Data</em></div>
                  <svg class="m-link" viewBox="0 0 16 18"><path d="M8 0v12m0 0-4-4m4 4 4-4" stroke="#c5c7cd" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  <div class="m-node"><span class="m-ni" style="--t:#e3f3ee;--c:#009e73"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 5h18l-7 8v6l-4 2v-8z" stroke-linejoin="round"/></svg></span><em>Filter</em></div>
                  <svg class="m-link" viewBox="0 0 16 18"><path d="M8 0v12m0 0-4-4m4 4 4-4" stroke="#c5c7cd" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  <div class="m-node"><span class="m-ni" style="--t:#fbf0db;--c:#e69f00"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 20V4M4 20h16" stroke-linecap="round"/><circle cx="9" cy="13" r="1.6" fill="currentColor" stroke="none"/><circle cx="14" cy="9" r="1.6" fill="currentColor" stroke="none"/><circle cx="18" cy="11" r="1.6" fill="currentColor" stroke="none"/></svg></span><em>Plot</em></div>
                </div>
              </div>
              <div class="m-panel m-filt">
                <div class="m-tab"><span class="m-dot fil"></span>Filter <i>×</i><span class="m-full">⤢</span></div>
                <div class="m-filter">
                  <div class="mf-lab">Column</div>
                  <div class="mf-sel">species <i>▾</i></div>
                  <div class="mf-lab">Values</div>
                  <div class="mf-chips"><span>Adelie</span><span>Gentoo</span><span>Chinstrap</span></div>
                </div>
              </div>
            </div>
            <!-- right: the chart it produces -->
            <div class="m-panel m-right">
              <div class="m-tab"><span class="m-dot o"></span>Ggplot <i>×</i><span class="m-full">⤢</span></div>
              <div class="m-plot">
                <div class="m-legend"><span><i class="d a"></i>Adelie</span><span><i class="d c"></i>Chinstrap</span><span><i class="d g"></i>Gentoo</span></div>
                <div class="m-axes">
                  <span
                    v-for="(d, i) in dots"
                    :key="i"
                    class="pt"
                    :class="d[0]"
                    :style="{ left: d[1] + '%', top: d[2] + '%', '--i': i }"
                  ></span>
                </div>
                <div class="m-xlab">bill_length_mm</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero { position: relative; padding: clamp(72px, 11vw, 132px) 0 clamp(48px, 8vw, 96px); overflow: hidden; }
.hero-glow {
  position: absolute; inset: -20% -10% auto -10%; height: 70%;
  background: radial-gradient(60% 60% at 70% 30%, color-mix(in srgb, var(--vp-c-brand-1) 18%, transparent), transparent 70%);
  filter: blur(20px); pointer-events: none; z-index: 0;
}
.hero-grid { position: relative; z-index: 1; display: grid; grid-template-columns: 1fr; gap: 40px; align-items: center; }
@media (min-width: 900px) { .hero-grid { grid-template-columns: 0.92fr 1.08fr; gap: 48px; } }
.hero-title { font-size: clamp(2.3rem, 5.6vw, 4rem); line-height: 1.06; font-weight: 800; letter-spacing: -0.03em; margin: 0 0 20px; }
.hero-title .accent { color: var(--vp-c-brand-1); }
.hero-sub { font-size: clamp(1.02rem, 1.5vw, 1.22rem); line-height: 1.6; color: var(--vp-c-text-2); max-width: 42ch; margin: 0 0 28px; }
.hero-actions { display: flex; flex-wrap: wrap; gap: 14px; margin-bottom: 22px; }
.hero-meta { font-size: 0.85rem; color: var(--vp-c-text-3); margin: 0; }

/* ===== crisp vector mock ===== */
.hero-art { perspective: 1400px; }
.mock {
  --ink:#3c3c43; --mut:#67676c; --line:#e6e7eb; --soft:#f4f4f6;
  border-radius: 14px; overflow: hidden; background: #fff; color: var(--ink);
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 30px 60px -22px rgba(0,0,0,.32), 0 6px 16px -8px rgba(0,0,0,.18);
  font-size: 12px; transition: transform .2s ease-out; will-change: transform;
}
.m-bar { display: flex; align-items: center; gap: 9px; padding: 8px 12px; border-bottom: 1px solid var(--line); }
.m-logo { width: 17px; height: 17px; border-radius: 5px; background: linear-gradient(135deg,#0072b2,#e69f00); }
.m-title { font-weight: 650; }
.m-saved { color: var(--mut); font-size: 10px; border: 1px solid var(--line); border-radius: 10px; padding: 1px 7px; }
.m-spacer { flex: 1; }
.m-page { font-weight: 600; border: 1px solid var(--line); border-radius: 7px; padding: 3px 9px; }
.m-page i { font-style: normal; color: var(--mut); }
.m-avatar { width: 19px; height: 19px; border-radius: 50%; background: #6b5bd6; color: #fff; display: grid; place-items: center; font-size: 10px; font-weight: 700; }
.m-body { display: flex; gap: 8px; padding: 8px; background: #fbfbfc; aspect-ratio: 16 / 10.5; }
.m-panel { display: flex; flex-direction: column; border: 1px solid var(--line); border-radius: 9px; overflow: hidden; background: #fff; }
.m-left { flex: 0 0 42%; display: flex; flex-direction: column; gap: 8px; min-width: 0; }
.m-wf { flex: 0 0 auto; } .m-filt { flex: 1; }
.m-right { flex: 1; }
.m-canvas { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1px; padding: 10px 8px; background-image: radial-gradient(var(--line) 1px, transparent 1px); background-size: 14px 14px; }
.m-node { display: flex; flex-direction: column; align-items: center; gap: 2px; }
.m-ni { width: 26px; height: 26px; border-radius: 7px; display: grid; place-items: center; background: var(--t); color: var(--c); border: 1px solid color-mix(in srgb, var(--c) 22%, transparent); }
.m-node em { font-style: normal; font-size: 8.5px; color: var(--mut); }
.m-link { width: 16px; height: 16px; flex: none; }
.m-tab { display: flex; align-items: center; gap: 5px; padding: 5px 8px; border-bottom: 1px solid var(--line); font-weight: 600; }
.m-tab i { font-style: normal; color: var(--mut); }
.m-full { margin-left: auto; color: var(--mut); }
.m-dot { width: 7px; height: 7px; border-radius: 50%; }
.m-dot.g { background: #6b7280; } .m-dot.o { background: #e69f00; } .m-dot.fil { background: #009e73; }
.m-filter { flex: 1; padding: 11px 12px; display: flex; flex-direction: column; gap: 6px; }
.mf-lab { font-size: 9px; font-weight: 700; letter-spacing: .05em; text-transform: uppercase; color: var(--mut); margin-top: 4px; }
.mf-sel { background: var(--soft); border: 1px solid var(--line); border-radius: 6px; padding: 6px 9px; font-weight: 600; display: flex; justify-content: space-between; }
.mf-sel i { font-style: normal; color: var(--mut); }
.mf-chips { display: flex; flex-wrap: wrap; gap: 5px; }
.mf-chips span { background: #eef0ff; border: 1px solid #d4d7ff; color: #4b40c4; border-radius: 6px; padding: 3px 8px; font-weight: 600; font-size: 11px; }
.mf-slider { position: relative; height: 6px; border-radius: 3px; background: var(--soft); border: 1px solid var(--line); margin-top: 3px; }
.mf-slider span { position: absolute; left: 0; top: 0; bottom: 0; width: 58%; background: var(--c, #009e73); border-radius: 3px; }
.mf-slider i { position: absolute; left: 58%; top: 50%; width: 12px; height: 12px; margin: -6px 0 0 -6px; border-radius: 50%; background: #fff; border: 2px solid #009e73; }

.m-plot { position: relative; flex: 1; padding: 12px 14px 22px; }
.m-legend { display: flex; gap: 12px; justify-content: flex-end; font-size: 9.5px; color: var(--mut); margin-bottom: 6px; }
.m-legend span { display: inline-flex; align-items: center; gap: 4px; }
.m-legend .d { width: 7px; height: 7px; border-radius: 50%; }
.d.a { background: #0072b2; } .d.c { background: #009e73; } .d.g { background: #e69f00; }
.m-axes {
  position: relative; height: calc(100% - 16px);
  border-left: 1.5px solid var(--line); border-bottom: 1.5px solid var(--line);
}
.pt { position: absolute; width: 9px; height: 9px; border-radius: 50%; transform: translate(-50%, -50%); opacity: 0.92; box-shadow: 0 0 0 2px #fff; }
.pt.a { background: #0072b2; } .pt.c { background: #009e73; } .pt.g { background: #e69f00; }
.m-xlab { position: absolute; bottom: 4px; left: 50%; transform: translateX(-50%); font-size: 9px; color: var(--mut); }

/* one-time draw-in of the scatter points */
.pt { animation: ptIn 0.5s cubic-bezier(.16,1,.3,1) backwards; animation-delay: calc(var(--i) * 45ms + 250ms); }
@keyframes ptIn { from { opacity: 0; transform: translate(-50%, -50%) scale(0); } }

@media (prefers-reduced-motion: reduce) {
  .mock { transition: none; }
  .pt { animation: none; }
}
</style>
