<script setup>
// The block as a 3D cube that unfolds. Closed, it's a plain box showing only
// the Plot face. It unfolds into a cross net and the inside is revealed: a
// Shiny module (UI, server, output). Then it resolves into the polished block.
// Phases cycle while in view (timer), paused off-screen.
import { ref, watch, onBeforeUnmount } from 'vue'
import { useInView } from './motion.js'

const scene = ref(null)
const { inView } = useInView(scene, { once: false })
const phase = ref(0)
const reduced = typeof window !== 'undefined' && window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
// Dwell time per phase: linger on the unfolded state (phase 1).
const dwell = [2600, 6000, 4200]
let timer = null
function tick() { timer = setTimeout(() => { phase.value = (phase.value + 1) % 3; tick() }, dwell[phase.value]) }
function start() { if (timer || reduced) return; tick() }
function stop() { if (timer) { clearTimeout(timer); timer = null } }
watch(inView, (v) => { v ? start() : stop() }, { immediate: true })
onBeforeUnmount(stop)
if (reduced) phase.value = 1

const captions = [
  'A block: one task, one box.',
  'Inside: a UI, a server, an output.',
  'Customise it into a polished block.'
]
</script>

<template>
  <section class="extend lp-container">
    <div class="ex-head" v-reveal>
      <span class="lp-eyebrow">Extend</span>
      <h2 class="lp-h2">The block is the building unit</h2>
      <p class="lp-lead" style="margin-inline:auto;text-align:center">
        Every block is a Shiny module you can open up and make your own.
      </p>
    </div>

    <div class="ex-grid">
      <div class="ex-copy" v-reveal>
        <ul class="ex-points">
          <li><strong>One task each.</strong></li>
          <li><strong>A UI + a reactive server.</strong></li>
          <li><strong>Wrap any R code or API.</strong></li>
          <li><strong>An LLM scaffolds it.</strong></li>
        </ul>
        <a class="ex-link" href="/learn/03-create-a-block">
          Create a block
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
      </div>

      <div class="ex-viz" ref="scene" v-reveal>
        <div class="scene" :class="{ result: phase === 2 }">
          <div class="float">
            <div class="cube" :class="{ open: phase >= 1 }">
              <div class="face front">
                <div class="guts">
                  <span class="f-ic"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 20V4M4 20h16" stroke-linecap="round"/><rect x="7" y="12" width="3" height="5" fill="currentColor" stroke="none"/><rect x="12" y="9" width="3" height="8" fill="currentColor" stroke="none"/><rect x="17" y="14" width="3" height="3" fill="currentColor" stroke="none"/></svg></span>
                  <span class="f-name">Plot</span>
                </div>
              </div>
              <div class="face top"><div class="guts"><span class="f-lab">ui</span><span class="pill">column ▾</span><span class="pill sm">colour ▾</span></div></div>
              <div class="face right"><div class="guts"><span class="f-lab">server</span><code class="cd"><span class="k">bbquote</span>(<span class="k">ggplot</span>(.(data)))</code></div></div>
              <div class="face left"><div class="guts"><span class="f-lab">output</span><div class="bars"><span style="height:48%"></span><span style="height:74%"></span><span style="height:60%"></span><span style="height:88%"></span></div></div></div>
              <div class="face bottom"><div class="guts"><span class="f-lab">state</span><span class="pill sm">reactiveVal()</span></div></div>
              <div class="face back"></div>
            </div>
          </div>

          <!-- the customised result -->
          <div class="result-card">
            <div class="rc-tab"><span class="rc-dot"></span>Ggplot <span class="rc-tag">Output</span></div>
            <div class="rc-chips"><span class="rc-ch on">Scatter</span><span class="rc-ch">Bar</span><span class="rc-ch">Line</span></div>
            <div class="rc-plot">
              <span class="rd a" style="left:16%;top:70%"></span><span class="rd a" style="left:27%;top:62%"></span><span class="rd a" style="left:21%;top:80%"></span>
              <span class="rd c" style="left:46%;top:52%"></span><span class="rd c" style="left:55%;top:45%"></span><span class="rd c" style="left:40%;top:60%"></span>
              <span class="rd g" style="left:70%;top:28%"></span><span class="rd g" style="left:81%;top:21%"></span><span class="rd g" style="left:64%;top:36%"></span><span class="rd g" style="left:88%;top:26%"></span>
            </div>
          </div>
          <p class="ex-cap" :key="phase">{{ captions[phase] }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.extend { margin: var(--lp-gap) auto; }
.ex-head { text-align: center; max-width: 680px; margin: 0 auto 40px; }
.ex-grid { display: grid; grid-template-columns: 1fr; gap: 40px; width: 100%; max-width: 960px; margin-inline: auto; align-items: center; }
@media (min-width: 920px) { .ex-grid { grid-template-columns: 0.8fr 1.2fr; gap: 48px; } }

.ex-points { list-style: none; padding: 0; margin: 0 0 22px; }
.ex-points li { padding: 9px 0; font-size: 0.98rem; line-height: 1.5; color: var(--vp-c-text-2); border-bottom: 1px solid var(--vp-c-divider); }
.ex-points li:last-child { border-bottom: 0; }
.ex-points li strong { color: var(--vp-c-text-1); font-weight: 600; }
.ex-link { display: inline-flex; align-items: center; gap: 6px; font-weight: 600; text-decoration: none; color: var(--vp-c-brand-1); }
.ex-link:hover { gap: 9px; }

/* ===== 3D cube ===== */
.ex-viz { display: flex; flex-direction: column; align-items: center; }
.scene {
  --S: 132px; --H: 66px;
  --ink:#3c3c43; --mut:#67676c; --line:#e6e7eb; --soft:#f4f4f6; --acc:#6b5bd6;
  position: relative; width: 100%; height: 400px;
  perspective: 1100px; display: grid; place-items: center;
}
.float { transform-style: preserve-3d; animation: floaty 8s ease-in-out infinite; }
@keyframes floaty { 0%,100% { transform: rotateY(-7deg) rotateX(2deg); } 50% { transform: rotateY(7deg) rotateX(-2deg); } }
.cube {
  position: relative; width: var(--S); height: var(--S);
  transform-style: preserve-3d;
  transform: rotateX(-24deg) rotateY(-32deg);
  transition: transform 1.1s cubic-bezier(.16,1,.3,1);
}
.cube.open { transform: rotateX(0deg) rotateY(0deg); }

.face {
  position: absolute; top: 50%; left: 50%;
  width: var(--S); height: var(--S);
  margin: calc(var(--S) / -2) 0 0 calc(var(--S) / -2);
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 12px;
  box-shadow: 0 10px 26px -16px rgba(0,0,0,.35);
  transition: transform 1.1s cubic-bezier(.16,1,.3,1), opacity .5s ease;
  backface-visibility: hidden;
}
/* the box exterior: plain tinted side faces, white front */
.face.top, .face.bottom { background: #f6f6f7; }
.face.left, .face.right { background: #efeff1; }
.face.back { background: #ebebed; }

/* closed: assemble into a cube */
.face.front  { transform: rotateY(0deg)    translateZ(var(--H)); }
.face.back   { transform: rotateY(180deg)  translateZ(var(--H)); }
.face.right  { transform: rotateY(90deg)   translateZ(var(--H)); }
.face.left   { transform: rotateY(-90deg)  translateZ(var(--H)); }
.face.top    { transform: rotateX(90deg)   translateZ(var(--H)); }
.face.bottom { transform: rotateX(-90deg)  translateZ(var(--H)); }
/* open: unfold into a flat cross net */
.cube.open .face.front  { transform: translateZ(0); }
.cube.open .face.top    { transform: translateY(calc(var(--S) * -1.06)); background: #fff; }
.cube.open .face.bottom { transform: translateY(calc(var(--S) * 1.06)); background: #fff; }
.cube.open .face.left   { transform: translateX(calc(var(--S) * -1.06)); background: #fff; }
.cube.open .face.right  { transform: translateX(calc(var(--S) * 1.06)); background: #fff; }
.cube.open .face.back   { transform: translateZ(0); opacity: 0; }

/* faces fade once the result takes over */
.scene.result .cube .face { opacity: .12; }

/* contents live inside: hidden on the closed box, revealed as it unfolds */
.guts {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;
  padding: 12px;
  opacity: 0; transition: opacity .4s ease;
}
.face.front .guts { opacity: 1; }            /* Plot is the one face shown closed */
.cube.open .guts { opacity: 1; transition-delay: .4s; }

.f-ic { width: 40px; height: 40px; border-radius: 11px; display: grid; place-items: center; background: #fbf0db; color: #e69f00; border: 1px solid #f0d79a; }
.f-name { font-weight: 700; font-size: 13px; color: var(--ink); }
.f-lab { position: absolute; top: 9px; left: 11px; font-family: var(--vp-font-family-mono); font-size: 9px; font-weight: 700; letter-spacing: .05em; text-transform: uppercase; color: var(--acc); }
.pill { background: var(--soft); border: 1px solid var(--line); border-radius: 6px; padding: 4px 8px; font-weight: 600; font-size: 11px; color: var(--ink); }
.pill.sm { font-size: 10px; padding: 3px 7px; }
.cd { font-family: var(--vp-font-family-mono); font-size: 9.5px; color: var(--ink); text-align: center; line-height: 1.4; }
.cd .k { color: #3451b2; }
.bars { display: flex; align-items: flex-end; gap: 4px; height: 40px; width: 70%; }
.bars span { flex: 1; border-radius: 2px 2px 0 0; background: #e69f00; opacity: .85; }

/* result card */
.result-card {
  position: absolute;
  width: 320px; max-width: 86%;
  background: #fff; border: 1px solid var(--line); border-radius: 12px;
  box-shadow: 0 24px 54px -18px rgba(0,0,0,.4);
  overflow: hidden;
  opacity: 0; transform: scale(.88) translateY(8px);
  transition: opacity .5s ease, transform .55s cubic-bezier(.16,1,.3,1);
  pointer-events: none;
}
.scene.result .result-card { opacity: 1; transform: none; }
.rc-tab { display: flex; align-items: center; gap: 7px; padding: 9px 12px; border-bottom: 1px solid var(--line); font-weight: 600; font-size: 12px; color: var(--ink); }
.rc-dot { width: 8px; height: 8px; border-radius: 50%; background: #e69f00; }
.rc-tag { margin-left: auto; color: var(--mut); border: 1px solid var(--line); border-radius: 6px; padding: 2px 7px; font-size: 10px; }
.rc-chips { display: flex; gap: 5px; padding: 10px 12px 0; }
.rc-ch { padding: 3px 9px; border-radius: 6px; background: var(--soft); border: 1px solid var(--line); font-weight: 600; font-size: 11px; color: var(--ink); }
.rc-ch.on { background: #eef0ff; border-color: #d4d7ff; color: #4b40c4; }
.rc-plot { position: relative; height: 120px; margin: 10px 14px 16px; border-left: 1.5px solid var(--line); border-bottom: 1.5px solid var(--line); }
.rd { position: absolute; width: 9px; height: 9px; border-radius: 50%; transform: translate(-50%,-50%); box-shadow: 0 0 0 2px #fff; }
.rd.a { background: #0072b2; } .rd.c { background: #009e73; } .rd.g { background: #e69f00; }

.ex-cap { position: absolute; bottom: -8px; left: 0; right: 0; text-align: center; font-weight: 600; color: var(--vp-c-text-1); animation: capin .4s ease; }
@keyframes capin { from { opacity: 0; transform: translateY(6px); } }

@media (prefers-reduced-motion: reduce) {
  .float { animation: none; }
  .face, .cube, .result-card, .ex-cap, .guts { transition: none; animation: none; }
}
</style>
