<script setup>
// "Drag. Connect. See results." Sticky scroll-scrubbed walkthrough built from
// the same light vector mockups as the dock section. Vertical DAG (top to
// bottom) with blockr-style g6 ports: input on top, output on bottom, edges
// flow downward with a vee arrow (see cynkra.com/blog/2026-01-27-blockr-ports).
import { ref, computed } from 'vue'
import { useScrollProgress } from './motion.js'

const steps = [
  { n: '01', title: 'Blank canvas', body: 'Nothing to install.' },
  { n: '02', title: 'Add data', body: 'Pick a dataset block.' },
  { n: '03', title: 'Connect', body: 'Drag output port to input port.' },
  { n: '04', title: 'Transform', body: 'Filter, mutate, join.' },
  { n: '05', title: 'See results', body: 'A plot, instantly live.' }
]

const sectionEl = ref(null)
const { progress } = useScrollProgress(sectionEl)
const active = computed(() => Math.min(Math.floor(progress.value * steps.length), steps.length - 1))
const railStyle = computed(() => ({ transform: `scaleY(${Math.min(progress.value, 1)})` }))

const dbIcon = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><ellipse cx="12" cy="6" rx="7" ry="2.6"/><path d="M5 6v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6"/><path d="M5 12v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6v-6"/></svg>`
const flIcon = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 5h18l-7 8v6l-4 2v-8z" stroke-linejoin="round"/></svg>`
const ggIcon = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 20V4M4 20h16" stroke-linecap="round"/><circle cx="9" cy="13" r="1.6" fill="currentColor" stroke="none"/><circle cx="14" cy="9" r="1.6" fill="currentColor" stroke="none"/><circle cx="18" cy="11" r="1.6" fill="currentColor" stroke="none"/></svg>`
const importIcon = `<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 14V4m0 0-3.5 3.5M12 4l3.5 3.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 14v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3" stroke-linecap="round"/></svg>`
</script>

<template>
  <section ref="sectionEl" class="how">
    <div class="how-sticky">
      <div class="lp-container">
        <div class="how-head">
          <span class="lp-eyebrow">How it works</span>
          <h2 class="lp-h2">Drag. Connect. See results.</h2>
          <p class="lp-lead">A graph of blocks. Scroll to watch one come together.</p>
        </div>

        <div class="how-grid">
          <div class="how-text">
            <ol class="how-steps">
              <li v-for="(s, i) in steps" :key="s.n" :class="{ active: i === active, done: i < active }">
                <span class="how-num">{{ s.n }}</span>
                <span class="how-step-body"><strong>{{ s.title }}</strong><span>{{ s.body }}</span></span>
              </li>
              <span class="how-rail"><span class="how-rail-fill" :style="railStyle"></span></span>
            </ol>
          </div>

          <div class="how-stage">
            <div class="app">
              <div class="appbar">
                <span class="ab-logo"></span>
                <span class="ab-title">Build a dashboard</span>
                <span class="ab-saved">saved</span>
                <span class="ab-spacer"></span>
                <span class="ab-page">Page 1 <i>▾</i></span>
                <span class="ab-avatar">D</span>
              </div>
              <div class="frames">
                <!-- 01 blank -->
                <div class="fr" :class="{ show: active === 0 }">
                  <div class="dock"><div class="panel">
                    <div class="ptab"><span class="tab on"><span class="dot wf"></span>Workflow <i>×</i></span><span class="add">+</span><span class="full">⤢</span></div>
                    <div class="canvas">
                      <div class="vtool"><span></span><span></span><span></span><span></span><span></span><span></span></div>
                      <div class="emptyhint">
                        <div class="eh-ic">
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M5 3l14 7-6 2-2 6-6-15z" stroke-linejoin="round"/></svg>
                          <span>+</span>
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="6" cy="6" r="2.2"/><circle cx="6" cy="18" r="2.2"/><circle cx="18" cy="12" r="2.2"/><path d="M8 6h3a4 4 0 0 1 4 4M8 18h3a4 4 0 0 0 4-4"/></svg>
                        </div>
                        <div class="eh-t">Start building your workflow</div>
                        <div class="eh-k"><b>Right-click</b> to add blocks</div>
                        <div class="eh-k"><b>Shift + Drag</b> to connect</div>
                      </div>
                    </div>
                  </div></div>
                </div>

                <!-- 02 add data: block browser -->
                <div class="fr" :class="{ show: active === 1 }">
                  <div class="dock">
                    <div class="panel">
                      <div class="ptab"><span class="tab on"><span class="dot wf"></span>Workflow <i>×</i></span><span class="add">+</span><span class="full">⤢</span></div>
                      <div class="canvas">
                        <div class="vtool"><span></span><span></span><span></span><span></span><span></span><span></span></div>
                        <div class="gn pop"><div class="gtile" style="--t:#e6f0f7;--c:#0072b2"><span class="gicon" v-html="dbIcon"></span></div><em>Dataset</em><span class="pt out"></span></div>
                      </div>
                    </div>
                    <div class="addpanel">
                      <div class="ap-head"><span class="ap-x">✕</span><strong>Add Block</strong><span class="ap-sub">Select a block type</span></div>
                      <div class="ap-search"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3" stroke-linecap="round"/></svg>Search…</div>
                      <div class="ap-sec">Input</div>
                      <div class="ap-item sel"><span class="ap-ic" style="--t:#e6f0f7;--c:#0072b2" v-html="dbIcon"></span><div class="ap-txt"><strong>dataset block</strong><small>Choose a dataset from a package</small></div><span class="ap-tag">blockr.core</span></div>
                      <div class="ap-item"><span class="ap-ic" style="--t:#e6f0f7;--c:#0072b2" v-html="importIcon"></span><div class="ap-txt"><strong>Import Data</strong><small>Read data from files or a URL</small></div><span class="ap-tag">blockr.io</span></div>
                      <div class="ap-sec">Plot</div>
                      <div class="ap-item"><span class="ap-ic" style="--t:#fbf0db;--c:#e69f00" v-html="ggIcon"></span><div class="ap-txt"><strong>ggplot</strong><small>Scatter, bar, line, and more</small></div><span class="ap-tag">blockr.ggplot</span></div>
                    </div>
                  </div>
                </div>

                <!-- 03 connect: drag output port -> input port (top to bottom) -->
                <div class="fr" :class="{ show: active === 2 }">
                  <div class="dock"><div class="panel">
                    <div class="ptab"><span class="tab on"><span class="dot wf"></span>Workflow <i>×</i></span><span class="add">+</span><span class="full">⤢</span></div>
                    <div class="canvas col connect">
                      <div class="gn"><div class="gtile" style="--t:#e6f0f7;--c:#0072b2"><span class="gicon" v-html="dbIcon"></span></div><em>Dataset</em><span class="pt out hot"></span></div>
                      <div class="wirebox">
                        <svg class="wire" viewBox="0 0 24 64"><path d="M12 3 V52 m0 0-5-6m5 6 5-6" stroke="#7b61ff" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        <svg class="cur" viewBox="0 0 24 24"><path d="M5 3l14 7-6 2-2 6-6-15z" fill="#fff" stroke="#1b1b1f" stroke-width="1.5" stroke-linejoin="round"/></svg>
                      </div>
                      <div class="gn"><span class="pt in hot"></span><div class="gtile" style="--t:#e3f3ee;--c:#009e73"><span class="gicon" v-html="flIcon"></span></div><em>Filter</em></div>
                    </div>
                  </div></div>
                </div>

                <!-- 04 transform (filter) -->
                <div class="fr" :class="{ show: active === 3 }">
                  <div class="dock two">
                    <div class="panel">
                      <div class="ptab"><span class="tab on"><span class="dot wf"></span>Workflow <i>×</i></span><span class="full">⤢</span></div>
                      <div class="canvas col">
                        <div class="gn"><div class="gtile" style="--t:#e6f0f7;--c:#0072b2"><span class="gicon" v-html="dbIcon"></span></div><em>Dataset</em><span class="pt out"></span></div>
                        <svg class="edge" viewBox="0 0 16 34" preserveAspectRatio="none"><path d="M8 0 V28 m0 0-4-4m4 4 4-4" stroke="#c5c7cd" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        <div class="gn sel"><span class="pt in"></span><div class="gtile" style="--t:#e3f3ee;--c:#009e73"><span class="gicon" v-html="flIcon"></span></div><em>Filter</em><span class="pt out"></span></div>
                      </div>
                    </div>
                    <div class="panel">
                      <div class="ptab"><span class="tab on"><span class="dot fl"></span>Filter</span><span class="full">⤢</span></div>
                      <div class="detail">
                        <div class="dl">Column</div><div class="ddl">species ▾</div>
                        <div class="dl">Values</div><div class="chips"><span>Adelie ×</span><span>Gentoo ×</span></div>
                        <div class="rows"><span></span><span></span><span></span><span></span></div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 05 result -->
                <div class="fr" :class="{ show: active === 4 }">
                  <div class="dock two">
                    <div class="panel">
                      <div class="ptab"><span class="tab on"><span class="dot wf"></span>Workflow <i>×</i></span><span class="full">⤢</span></div>
                      <div class="canvas col">
                        <div class="gn"><div class="gtile" style="--t:#e6f0f7;--c:#0072b2"><span class="gicon" v-html="dbIcon"></span></div><em>Dataset</em><span class="pt out"></span></div>
                        <svg class="edge" viewBox="0 0 16 30" preserveAspectRatio="none"><path d="M8 0 V24 m0 0-4-4m4 4 4-4" stroke="#c5c7cd" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        <div class="gn"><span class="pt in"></span><div class="gtile" style="--t:#e3f3ee;--c:#009e73"><span class="gicon" v-html="flIcon"></span></div><em>Filter</em><span class="pt out"></span></div>
                        <svg class="edge" viewBox="0 0 16 30" preserveAspectRatio="none"><path d="M8 0 V24 m0 0-4-4m4 4 4-4" stroke="#c5c7cd" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        <div class="gn"><span class="pt in"></span><div class="gtile" style="--t:#fbf0db;--c:#e69f00"><span class="gicon" v-html="ggIcon"></span></div><em>Ggplot</em></div>
                      </div>
                    </div>
                    <div class="panel">
                      <div class="ptab"><span class="tab on"><span class="dot gg"></span>Ggplot</span><span class="full">⤢</span></div>
                      <div class="bars"><span style="height:44%"></span><span style="height:72%"></span><span style="height:58%"></span><span style="height:88%"></span><span style="height:64%"></span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.how { position: relative; height: 320vh; margin: var(--lp-gap) 0; }
.how-sticky { position: sticky; top: 0; min-height: 100vh; display: flex; align-items: center; }
.how-sticky .lp-container { max-width: 1152px; width: 100%; }
.how-head { text-align: center; max-width: 680px; margin: 0 auto 32px; }
.how-head .lp-lead { margin-inline: auto; }
.how-grid { display: grid; grid-template-columns: 1fr; gap: 36px; width: 100%; max-width: 960px; margin-inline: auto; align-items: center; }
@media (min-width: 960px) { .how-grid { grid-template-columns: 0.6fr 1.4fr; gap: 40px; } }

.how-steps { position: relative; list-style: none; margin: 0; padding: 0 0 0 4px; }
.how-steps li { position: relative; display: flex; gap: 16px; padding: 13px 0; opacity: 0.4; transition: opacity 0.4s ease; }
.how-steps li.active, .how-steps li.done { opacity: 1; }
.how-num { flex: none; width: 30px; height: 30px; display: grid; place-items: center; border-radius: 50%; font-size: 0.78rem; font-weight: 700; background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider); transition: all 0.4s ease; z-index: 1; }
.how-steps li.active .how-num { background: var(--vp-c-brand-1); border-color: var(--vp-c-brand-1); color: #fff; transform: scale(1.08); }
.how-steps li.done .how-num { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); }
.how-step-body { display: flex; flex-direction: column; gap: 2px; }
.how-step-body strong { font-size: 1.02rem; }
.how-step-body span { font-size: 0.9rem; color: var(--vp-c-text-2); line-height: 1.45; }
.how-rail { position: absolute; left: 18px; top: 30px; bottom: 30px; width: 2px; background: var(--vp-c-divider); z-index: 0; }
.how-rail-fill { display: block; width: 100%; height: 100%; background: var(--vp-c-brand-1); transform-origin: top; transition: transform 0.2s linear; }

/* ===== light app mock ===== */
.how-stage { --ink:#3c3c43; --mut:#67676c; --line:#e6e7eb; --soft:#f4f4f6; --purple:#7b61ff; }
.app { border-radius: 16px; overflow: hidden; border: 1px solid var(--vp-c-divider); box-shadow: var(--lp-shadow); background: #fff; color: var(--ink); font-size: 14px; }
.appbar { display: flex; align-items: center; gap: 10px; padding: 9px 14px; background: #fff; border-bottom: 1px solid var(--line); }
.ab-logo { width: 19px; height: 19px; border-radius: 5px; background: linear-gradient(135deg,#0072b2,#e69f00); }
.ab-title { font-weight: 650; }
.ab-saved { color: var(--mut); font-size: 11px; border: 1px solid var(--line); border-radius: 10px; padding: 1px 8px; }
.ab-spacer { flex: 1; }
.ab-page { font-weight: 600; border: 1px solid var(--line); border-radius: 7px; padding: 3px 10px; }
.ab-page i { font-style: normal; color: var(--mut); }
.ab-avatar { width: 22px; height: 22px; border-radius: 50%; background: #6b5bd6; color: #fff; display: grid; place-items: center; font-size: 11px; font-weight: 700; }

.frames { position: relative; aspect-ratio: 16 / 9.4; background: #fbfbfc; }
.fr { position: absolute; inset: 0; opacity: 0; transition: opacity .5s ease; }
.fr.show { opacity: 1; }
.dock { display: flex; gap: 10px; padding: 10px; height: 100%; }
.panel { flex: 1; min-width: 0; display: flex; flex-direction: column; border: 1px solid var(--line); border-radius: 10px; overflow: hidden; background: #fff; }
.ptab { display: flex; align-items: center; gap: 6px; padding: 7px 9px; border-bottom: 1px solid var(--line); }
.tab { display: inline-flex; align-items: center; gap: 6px; padding: 5px 11px; border-radius: 8px; font-weight: 600; color: var(--ink); background: #fff; border: 1px solid var(--line); }
.tab i { font-style: normal; color: var(--mut); margin-left: 2px; }
.add, .full { color: var(--mut); padding: 0 5px; }
.full { margin-left: auto; }
.dot { width: 8px; height: 8px; border-radius: 50%; }
.dot.wf { background: #6b7280; } .dot.fl { background: #009e73; } .dot.gg { background: #e69f00; }

.canvas { position: relative; flex: 1; min-height: 0; display: grid; place-items: center; background-image: radial-gradient(var(--line) 1px, transparent 1px); background-size: 20px 20px; }
.canvas.col { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0; }
.vtool { position: absolute; left: 10px; top: 10px; display: flex; flex-direction: column; gap: 6px; z-index: 2; }
.vtool span { width: 18px; height: 18px; border-radius: 5px; background: var(--soft); border: 1px solid var(--line); }

.emptyhint { text-align: center; border: 1.5px dashed var(--line); border-radius: 12px; padding: 26px 34px; }
.eh-ic { display: flex; align-items: center; justify-content: center; gap: 9px; color: var(--mut); margin-bottom: 12px; }
.eh-ic svg { border: 1px solid var(--line); border-radius: 9px; padding: 7px; width: 34px; height: 34px; }
.eh-t { font-weight: 600; color: var(--ink); margin-bottom: 9px; }
.eh-k { font-size: 11.5px; color: var(--mut); margin-top: 4px; }
.eh-k b { background: var(--soft); border: 1px solid var(--line); border-radius: 5px; padding: 1px 6px; font-weight: 600; color: var(--ink); }

/* g6-style node: icon tile + label, ports on top (in) and bottom (out) */
.gn { position: relative; display: flex; flex-direction: column; align-items: center; gap: 5px; padding: 9px 16px; }
.gtile { width: 50px; height: 50px; border-radius: 12px; display: grid; place-items: center; background: var(--t); color: var(--c); border: 1px solid color-mix(in srgb, var(--c) 24%, transparent); }
.gicon { display: grid; place-items: center; line-height: 0; }
.gn.sel .gtile { box-shadow: 0 0 0 2px var(--vp-c-brand-1); }
.gn em { font-style: normal; font-size: 11px; color: var(--mut); font-weight: 500; }
.pt { position: absolute; left: 50%; width: 13px; height: 13px; border-radius: 50%; background: #fff; border: 2.5px solid #9aa0b0; transform: translateX(-50%); z-index: 3; }
.pt.in { top: 0; } .pt.out { bottom: 0; }
.pt.hot { border-color: var(--purple); box-shadow: 0 0 0 4px color-mix(in srgb, var(--purple) 22%, transparent); }

.edge { width: 16px; height: 32px; flex: none; }
.wirebox { position: relative; width: 28px; height: 60px; flex: none; }
.wire { position: absolute; inset: 0; width: 100%; height: 100%; }
.cur { position: absolute; left: 52%; top: 56%; width: 18px; height: 18px; filter: drop-shadow(0 2px 3px rgba(0,0,0,.35)); }

/* entrance micro-animations */
.fr.show .pop { animation: pop .5s cubic-bezier(.16,1,.3,1); }
.fr.show .wire path { stroke-dasharray: 80; stroke-dashoffset: 80; animation: draw .8s ease forwards .2s; }
.fr.show .connect .pt.hot { animation: pulse 1.6s ease-in-out infinite; }
.fr.show .cur { animation: nudge 1.8s ease-in-out infinite; }
.fr.show .bars span { animation: rise .5s ease backwards; }
.fr.show .bars span:nth-child(2){animation-delay:.05s} .fr.show .bars span:nth-child(3){animation-delay:.1s} .fr.show .bars span:nth-child(4){animation-delay:.15s} .fr.show .bars span:nth-child(5){animation-delay:.2s}
@keyframes pop { from { opacity: 0; transform: scale(.6); } }
@keyframes draw { to { stroke-dashoffset: 0; } }
@keyframes nudge { 0%,100% { transform: translate(0,0); } 50% { transform: translate(2px,-3px); } }
@keyframes pulse { 0%,100% { box-shadow: 0 0 0 3px color-mix(in srgb, var(--purple) 10%, transparent); } 50% { box-shadow: 0 0 0 6px color-mix(in srgb, var(--purple) 28%, transparent); } }
@keyframes rise { from { height: 0 !important; opacity: .3; } }

/* add-block sidebar */
.dock .addpanel { flex: 0 0 44%; display: flex; flex-direction: column; border: 1px solid var(--line); border-radius: 10px; background: #fff; overflow: hidden; }
.ap-head { display: flex; align-items: center; gap: 9px; padding: 11px 13px; border-bottom: 1px solid var(--line); }
.ap-x { color: var(--mut); }
.ap-head strong { font-weight: 700; }
.ap-sub { margin-left: auto; color: var(--mut); font-size: 11px; }
.ap-search { display: flex; align-items: center; gap: 7px; margin: 11px 12px 4px; border: 1.5px solid var(--vp-c-brand-1); border-radius: 8px; padding: 8px 11px; color: var(--mut); }
.ap-sec { padding: 6px 14px 2px; font-size: 9.5px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; color: var(--mut); }
.ap-item { display: flex; align-items: flex-start; gap: 10px; margin: 4px 11px; padding: 10px 11px; border: 1px solid var(--line); border-radius: 10px; }
.ap-item.sel { border-color: var(--vp-c-brand-1); box-shadow: 0 0 0 2px color-mix(in srgb, var(--vp-c-brand-1) 16%, transparent); background: #fbfcff; }
.ap-ic { flex: none; width: 32px; height: 32px; border-radius: 8px; display: grid; place-items: center; background: var(--t); color: var(--c); border: 1px solid color-mix(in srgb, var(--c) 22%, transparent); }
.ap-txt { flex: 1; display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.ap-txt strong { font-size: 13px; }
.ap-txt small { color: var(--mut); font-size: 10.5px; line-height: 1.35; }
.ap-tag { flex: none; align-self: flex-start; color: var(--mut); background: var(--soft); border: 1px solid var(--line); border-radius: 5px; padding: 1px 6px; font-size: 9px; }

.dock.two .panel:first-child { flex: .9; }
.detail { padding: 12px 14px; }
.detail .dl { font-size: 10px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: var(--mut); margin: 10px 0 5px; }
.detail .dl:first-child { margin-top: 0; }
.ddl { background: var(--soft); border: 1px solid var(--line); border-radius: 7px; padding: 8px 11px; font-weight: 600; }
.chips { display: flex; gap: 6px; }
.chips span { background: #eef0ff; border: 1px solid #d4d7ff; color: #4b40c4; border-radius: 7px; padding: 4px 9px; font-weight: 600; }
.rows { display: flex; flex-direction: column; gap: 7px; margin-top: 14px; }
.rows span { height: 7px; border-radius: 4px; background: var(--line); }
.rows span:nth-child(odd) { width: 82%; } .rows span:nth-child(even) { width: 56%; }
.bars { flex: 1; display: flex; align-items: flex-end; gap: 9px; padding: 18px; }
.bars span { flex: 1; border-radius: 4px 4px 0 0; background: #e69f00; opacity: .85; }

@media (prefers-reduced-motion: reduce) {
  .how { height: auto; }
  .how-sticky { position: static; min-height: 0; display: block; }
  .fr { transition: none; }
  .fr.show .pop, .fr.show .wire path, .fr.show .cur, .fr.show .bars span, .fr.show .pt.hot { animation: none; }
  .fr.show .wire path { stroke-dashoffset: 0; }
}
</style>
