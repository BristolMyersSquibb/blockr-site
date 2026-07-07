<script setup>
// Scroll-scrubbed walkthrough of composing a blockr dashboard, mirroring the
// real app: start from the DAG, open panels, add blocks with +, drag windows
// into place, maximise, react to a filter change, and split across pages.
// Same sticky-scrub pattern as HowItWorks; the pinned stage is a faithful
// light-mode mock and the active frame is driven by scroll progress.
import { ref, computed } from 'vue'
import { useScrollProgress } from './motion.js'

const steps = [
  { n: '01', t: 'Open from the graph', b: 'Click a node to open its panel.' },
  { n: '02', t: 'Panel docks', b: 'Ready to edit.' },
  { n: '03', t: 'Add with +', b: 'Any block, from the + menu.' },
  { n: '04', t: 'Arrange', b: 'Drag windows where you want them.' },
  { n: '05', t: 'Maximise', b: 'Pop a panel to full width.' },
  { n: '06', t: 'Stay reactive', b: 'Change an input, outputs follow.' },
  { n: '07', t: 'Scale to pages', b: 'Split bigger dashboards across pages.' }
]

const sectionEl = ref(null)
const { progress } = useScrollProgress(sectionEl)
const active = computed(() =>
  Math.min(Math.floor(progress.value * steps.length), steps.length - 1)
)
const railStyle = computed(() => ({ transform: `scaleY(${Math.min(progress.value, 1)})` }))

const ggIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 20V4M4 20h16" stroke-linecap="round"/><rect x="7" y="11" width="3" height="6" fill="currentColor" stroke="none"/><rect x="12" y="8" width="3" height="9" fill="currentColor" stroke="none"/><rect x="17" y="13" width="3" height="4" fill="currentColor" stroke="none"/></svg>`
const dbIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"><ellipse cx="12" cy="6" rx="7" ry="2.6"/><path d="M5 6v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6"/><path d="M5 12v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6v-6"/></svg>`
const flIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 5h18l-7 8v6l-4 2v-8z" stroke-linejoin="round"/></svg>`
</script>

<template>
  <section ref="sectionEl" class="csteps">
    <div class="csteps-sticky">
      <div class="lp-container">
        <div class="csteps-head">
          <span class="lp-eyebrow">Compose the dashboard</span>
          <h2 class="lp-h2">From graph to dashboard</h2>
          <p class="lp-lead">
            Open windows, arrange them, ship the layout. Scroll to watch.
          </p>
        </div>
        <div class="csteps-grid">
        <div class="csteps-text">
          <ol class="csteps-list">
            <li v-for="(s, i) in steps" :key="s.n" :class="{ active: i === active, done: i < active }">
              <span class="cs-num">{{ s.n }}</span>
              <span class="cs-body"><strong>{{ s.t }}</strong><span>{{ s.b }}</span></span>
            </li>
            <span class="cs-rail"><span class="cs-rail-fill" :style="railStyle"></span></span>
          </ol>
        </div>

        <div class="csteps-stage">
          <div class="app" :data-step="active">
            <!-- persistent app bar -->
            <div class="appbar">
              <span class="ab-logo"></span>
              <span class="ab-title">Build a dashboard</span>
              <span class="ab-saved">saved</span>
              <span class="ab-spacer"></span>
              <span class="ab-page">Page 1 <i>▾</i></span>
              <span class="ab-gear">⚙</span>
              <span class="ab-avatar">D</span>
            </div>

            <div class="frames">
              <!-- F1: DAG, clicking a node -->
              <div class="frame" :class="{ active: active === 0 }">
                <div class="dock">
                  <div class="panel grow">
                    <div class="ptab"><span class="tab on"><span class="bd g"></span>Workflow <i>×</i></span><span class="add">+</span><span class="full">⤢</span></div>
                    <div class="canvas">
                      <div class="dag">
                        <div class="node"><span class="ni" style="--t:#e6f0f7;--c:#0072b2" v-html="dbIcon"></span><em>Dataset</em></div>
                        <svg class="lk" viewBox="0 0 20 22"><path d="M10 0v14m0 0-4-4m4 4 4-4" stroke="#c5c7cd" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        <div class="node"><span class="ni" style="--t:#e3f3ee;--c:#009e73" v-html="flIcon"></span><em>Filter</em></div>
                        <svg class="lk" viewBox="0 0 20 22"><path d="M10 0v14m0 0-4-4m4 4 4-4" stroke="#c5c7cd" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        <div class="node clicked"><span class="ring"></span><span class="ni" style="--t:#fbf0db;--c:#e69f00" v-html="ggIcon"></span><em>Ggplot</em></div>
                      </div>
                    </div>
                  </div>
                </div>
                <svg class="cur" style="left:54%;top:74%" viewBox="0 0 24 24"><path d="M5 3l14 7-6 2-2 6-6-15z" fill="#fff" stroke="#1b1b1f" stroke-width="1.5" stroke-linejoin="round"/></svg>
              </div>

              <!-- F2: panel opened on the right -->
              <div class="frame" :class="{ active: active === 1 }">
                <div class="dock">
                  <div class="panel"><div class="ptab"><span class="tab on"><span class="bd g"></span>Workflow <i>×</i></span><span class="add">+</span><span class="full">⤢</span></div>
                    <div class="canvas sm"><div class="dag">
                      <div class="node"><span class="ni" style="--t:#e6f0f7;--c:#0072b2" v-html="dbIcon"></span><em>Dataset</em></div>
                      <svg class="lk" viewBox="0 0 20 18"><path d="M10 0v11m0 0-4-4m4 4 4-4" stroke="#c5c7cd" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
                      <div class="node"><span class="ni" style="--t:#e3f3ee;--c:#009e73" v-html="flIcon"></span><em>Filter</em></div>
                      <svg class="lk" viewBox="0 0 20 18"><path d="M10 0v11m0 0-4-4m4 4 4-4" stroke="#c5c7cd" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
                      <div class="node sel"><span class="ni" style="--t:#fbf0db;--c:#e69f00" v-html="ggIcon"></span><em>Ggplot</em></div>
                    </div></div>
                  </div>
                  <div class="panel slidein"><div class="ptab"><span class="tab on"><span class="bd o"></span>Ggplot <i>×</i></span><span class="full">⤢</span></div>
                    <div class="detail"><div class="dh"><span class="ni sm" style="--t:#fbf0db;--c:#e69f00" v-html="ggIcon"></span><span class="dn"><strong>Ggplot</strong><small>ggplot</small></span><span class="tg">Input</span><span class="tg">Output</span></div>
                      <div class="dl">Chart type</div><div class="tys"><span class="ty on">Scatter</span><span class="ty">Bar</span><span class="ty">Line</span><span class="ty">Box</span></div>
                      <div class="dl">Mappings</div><div class="dr"><span class="fl">X-axis<b>bill_len ▾</b></span><span class="fl">Y-axis<b>bill_dep ▾</b></span></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- F3: + add-block modal -->
              <div class="frame" :class="{ active: active === 2 }">
                <div class="dock dim">
                  <div class="panel"><div class="ptab"><span class="tab on"><span class="bd g"></span>Workflow <i>×</i></span><span class="add hot">+</span><span class="full">⤢</span></div><div class="canvas"></div></div>
                  <div class="panel"><div class="ptab"><span class="tab on"><span class="bd o"></span>Ggplot <i>×</i></span><span class="full">⤢</span></div><div class="canvas"></div></div>
                </div>
                <div class="modal">
                  <div class="md-h">Add a panel <i>×</i></div>
                  <div class="md-grid">
                    <span class="md-it dis"><span class="bd b"></span>Dataset <em>added</em></span>
                    <span class="md-it dis"><span class="bd g2"></span>Filter <em>added</em></span>
                    <span class="md-it dis"><span class="bd o"></span>Ggplot <em>added</em></span>
                    <span class="md-it pick"><span class="bd p"></span>Table <b>+ Add</b></span>
                    <span class="md-it"><span class="bd t"></span>Summary <b>+ Add</b></span>
                    <span class="md-it"><span class="bd c"></span>Download <b>+ Add</b></span>
                  </div>
                </div>
                <svg class="cur" style="left:36%;top:62%" viewBox="0 0 24 24"><path d="M5 3l14 7-6 2-2 6-6-15z" fill="#fff" stroke="#1b1b1f" stroke-width="1.5" stroke-linejoin="round"/></svg>
              </div>

              <!-- F4: arrange (filter left, plot right) -->
              <div class="frame" :class="{ active: active === 3 }">
                <div class="dock three">
                  <div class="panel a-left"><div class="ptab"><span class="tab on"><span class="bd g2"></span>Filter <i>×</i></span><span class="full">⤢</span></div>
                    <div class="filterui"><div class="dl">Column</div><div class="ddl">species ▾</div><div class="dl">Values</div><div class="chips"><span>Adelie ×</span><span>Gentoo ×</span></div></div>
                  </div>
                  <div class="panel a-mid"><div class="ptab"><span class="tab on"><span class="bd g"></span>Workflow <i>×</i></span><span class="full">⤢</span></div><div class="canvas tiny"></div></div>
                  <div class="panel a-right"><div class="ptab"><span class="tab on"><span class="bd o"></span>Ggplot <i>×</i></span><span class="full">⤢</span></div>
                    <div class="bars"><span style="height:42%"></span><span style="height:70%"></span><span style="height:55%"></span><span style="height:88%"></span><span style="height:62%"></span></div>
                  </div>
                  <div class="drop r" aria-hidden="true"></div>
                </div>
                <svg class="cur" style="left:80%;top:46%" viewBox="0 0 24 24"><path d="M5 3l14 7-6 2-2 6-6-15z" fill="#fff" stroke="#1b1b1f" stroke-width="1.5" stroke-linejoin="round"/></svg>
              </div>

              <!-- F5: maximise -->
              <div class="frame" :class="{ active: active === 4 }">
                <div class="dock">
                  <div class="panel grow maxed"><div class="ptab"><span class="tab on"><span class="bd o"></span>Ggplot <i>×</i></span><span class="full hot">⤢</span></div>
                    <div class="bars big"><span style="height:40%"></span><span style="height:66%"></span><span style="height:52%"></span><span style="height:84%"></span><span style="height:60%"></span><span style="height:74%"></span><span style="height:46%"></span></div>
                  </div>
                </div>
                <svg class="cur" style="left:94%;top:13%" viewBox="0 0 24 24"><path d="M5 3l14 7-6 2-2 6-6-15z" fill="#fff" stroke="#1b1b1f" stroke-width="1.5" stroke-linejoin="round"/></svg>
              </div>

              <!-- F6: reactive filter -> plot -->
              <div class="frame" :class="{ active: active === 5 }">
                <div class="dock">
                  <div class="panel"><div class="ptab"><span class="tab on"><span class="bd g2"></span>Filter <i>×</i></span><span class="full">⤢</span></div>
                    <div class="filterui"><div class="dl">Column</div><div class="ddl">species ▾</div><div class="dl">Values</div><div class="chips"><span class="flash">Gentoo ×</span></div><div class="hint">input changed</div></div>
                  </div>
                  <div class="panel"><div class="ptab"><span class="tab on"><span class="bd o"></span>Ggplot <i>×</i></span><span class="full">⤢</span></div>
                    <div class="bars react"><span></span><span></span><span></span><span></span><span></span></div>
                    <div class="updated">updated</div>
                  </div>
                </div>
              </div>

              <!-- F7: pages -->
              <div class="frame" :class="{ active: active === 6 }">
                <div class="dock grid4">
                  <div class="panel"><div class="ptab"><span class="tab on"><span class="bd g2"></span>Filter</span></div><div class="filterui sm"><div class="ddl">species ▾</div><div class="chips"><span>Gentoo ×</span></div></div></div>
                  <div class="panel"><div class="ptab"><span class="tab on"><span class="bd o"></span>Ggplot</span></div><div class="bars"><span style="height:50%"></span><span style="height:80%"></span><span style="height:62%"></span><span style="height:70%"></span></div></div>
                  <div class="panel"><div class="ptab"><span class="tab on"><span class="bd b"></span>Table</span></div><div class="tbl"><span></span><span></span><span></span><span></span></div></div>
                  <div class="panel"><div class="ptab"><span class="tab on"><span class="bd t"></span>Summary</span></div><div class="kpis"><b>344</b><b>3</b><b>2007</b></div></div>
                </div>
                <div class="pagemenu">
                  <span class="pm-it on">Overview</span>
                  <span class="pm-it">Trends</span>
                  <span class="pm-it">Detail</span>
                  <span class="pm-it add">+ New page</span>
                </div>
                <svg class="cur" style="left:90%;top:5%" viewBox="0 0 24 24"><path d="M5 3l14 7-6 2-2 6-6-15z" fill="#fff" stroke="#1b1b1f" stroke-width="1.5" stroke-linejoin="round"/></svg>
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
.csteps { position: relative; height: 560vh; margin: var(--lp-gap) 0; }
.csteps-sticky { position: sticky; top: 0; min-height: 100vh; display: flex; align-items: center; }
.csteps-sticky .lp-container { max-width: 1152px; width: 100%; }
.csteps-head { text-align: center; max-width: 680px; margin: 0 auto 32px; }
.csteps-head .lp-lead { margin-inline: auto; }
.csteps-grid { display: grid; grid-template-columns: 1fr; gap: 36px; width: 100%; max-width: 960px; margin-inline: auto; align-items: center; }
@media (min-width: 980px) { .csteps-grid { grid-template-columns: 0.6fr 1.4fr; gap: 40px; } }

.csteps-list { position: relative; list-style: none; margin: 24px 0 0; padding: 0 0 0 4px; }
.csteps-list li { position: relative; display: flex; gap: 14px; padding: 9px 0; opacity: .4; transition: opacity .35s; }
.csteps-list li.active, .csteps-list li.done { opacity: 1; }
.cs-num { flex: none; width: 28px; height: 28px; display: grid; place-items: center; border-radius: 50%; font-size: .74rem; font-weight: 700; background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider); transition: all .35s; z-index: 1; }
.csteps-list li.active .cs-num { background: var(--vp-c-brand-1); border-color: var(--vp-c-brand-1); color: #fff; transform: scale(1.08); }
.csteps-list li.done .cs-num { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); }
.cs-body { display: flex; flex-direction: column; gap: 1px; }
.cs-body strong { font-size: .96rem; }
.cs-body span { font-size: .85rem; color: var(--vp-c-text-2); line-height: 1.4; }
.cs-rail { position: absolute; left: 17px; top: 26px; bottom: 26px; width: 2px; background: var(--vp-c-divider); z-index: 0; }
.cs-rail-fill { display: block; width: 100%; height: 100%; background: var(--vp-c-brand-1); transform-origin: top; transition: transform .2s linear; }

/* ===== app mock (light) ===== */
.csteps-stage { --ink:#3c3c43; --mut:#67676c; --line:#e6e7eb; --soft:#f4f4f6; --purple:#7b61ff; }
.app { border-radius: 14px; overflow: hidden; border: 1px solid var(--vp-c-divider); box-shadow: var(--lp-shadow); background: #fff; color: var(--ink); font-size: 13.5px; }
.appbar { display: flex; align-items: center; gap: 9px; padding: 7px 12px; background: #fff; border-bottom: 1px solid var(--line); }
.ab-logo { width: 17px; height: 17px; border-radius: 5px; background: linear-gradient(135deg,#0072b2,#e69f00); }
.ab-title { font-weight: 650; }
.ab-saved { color: var(--mut); font-size: 10px; border: 1px solid var(--line); border-radius: 10px; padding: 1px 7px; }
.ab-spacer { flex: 1; }
.ab-page { font-weight: 600; border: 1px solid var(--line); border-radius: 7px; padding: 3px 9px; }
.ab-page i { font-style: normal; color: var(--mut); }
.ab-gear { color: var(--mut); }
.ab-avatar { width: 19px; height: 19px; border-radius: 50%; background: #6b5bd6; color: #fff; display: grid; place-items: center; font-size: 10px; font-weight: 700; }

.frames { position: relative; aspect-ratio: 16 / 9.2; background: #fbfbfc; }
.frame { position: absolute; inset: 0; opacity: 0; transition: opacity .5s ease; pointer-events: none; }
.frame.active { opacity: 1; }
.dock { display: flex; gap: 8px; padding: 8px; height: 100%; }
.dock.dim .panel { filter: brightness(.97); }
.panel { flex: 1; min-width: 0; display: flex; flex-direction: column; border: 1px solid var(--line); border-radius: 9px; overflow: hidden; background: #fff; }
.panel.grow { flex: 1; }
.ptab { display: flex; align-items: center; gap: 5px; padding: 5px 7px; background: #fff; border-bottom: 1px solid var(--line); }
.tab { display: inline-flex; align-items: center; gap: 5px; padding: 4px 9px; border-radius: 7px; font-weight: 600; color: var(--mut); background: var(--soft); white-space: nowrap; }
.tab.on { color: var(--ink); background: #fff; border: 1px solid var(--line); }
.tab i { font-style: normal; color: var(--mut); margin-left: 2px; }
.add, .full { color: var(--mut); padding: 0 4px; }
.full { margin-left: auto; }
.add.hot, .full.hot { color: #fff; background: var(--vp-c-brand-1); border-radius: 5px; }
.bd { width: 7px; height: 7px; border-radius: 50%; flex: none; }
.bd.g { background: #6b7280; } .bd.o { background: #e69f00; } .bd.b { background: #0072b2; }
.bd.g2 { background: #009e73; } .bd.p { background: #9b59b6; } .bd.t { background: #c0392b; } .bd.c { background: #16a085; }

.canvas { flex: 1; min-height: 0; display: grid; place-items: center; background-image: radial-gradient(var(--line) 1px, transparent 1px); background-size: 16px 16px; }
.dag { display: flex; flex-direction: column; align-items: center; }
.node { position: relative; display: flex; flex-direction: column; align-items: center; gap: 2px; }
.node.sel .ni, .node.clicked .ni { box-shadow: 0 0 0 2px var(--vp-c-brand-1); }
.node .ring { position: absolute; top: -4px; width: 42px; height: 42px; border-radius: 12px; border: 2px solid var(--vp-c-brand-1); opacity: .5; }
.frame.active .node.clicked .ring { animation: ring 1.4s ease-out infinite; }
.ni { width: 32px; height: 32px; border-radius: 9px; display: grid; place-items: center; background: var(--t); color: var(--c); border: 1px solid color-mix(in srgb, var(--c) 22%, transparent); }
.ni.sm { width: 26px; height: 26px; border-radius: 7px; }
.node em { font-style: normal; font-size: 9.5px; color: var(--mut); }
.lk { width: 18px; height: 20px; }
.canvas.sm .lk { height: 16px; }
.canvas.tiny { background-size: 12px 12px; }

.detail { padding: 10px 11px; }
.dh { display: flex; align-items: center; gap: 7px; margin-bottom: 10px; }
.dn { display: flex; flex-direction: column; line-height: 1.12; }
.dn strong { font-size: 12px; } .dn small { color: var(--mut); font-size: 9.5px; }
.tg { color: var(--mut); border: 1px solid var(--line); border-radius: 6px; padding: 2px 7px; font-weight: 600; }
.dh .tg:nth-of-type(1) { margin-left: auto; }
.dl { font-size: 9px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: var(--mut); margin: 9px 0 5px; }
.tys { display: flex; gap: 5px; flex-wrap: wrap; }
.ty { padding: 3px 8px; border-radius: 6px; background: var(--soft); border: 1px solid var(--line); font-weight: 600; }
.ty.on { background: #eef0ff; border-color: #d4d7ff; color: #4b40c4; }
.dr { display: flex; gap: 7px; }
.fl { flex: 1; display: flex; flex-direction: column; gap: 3px; font-size: 9px; color: var(--mut); }
.fl b { font-weight: 600; color: var(--ink); background: var(--soft); border: 1px solid var(--line); border-radius: 6px; padding: 4px 7px; font-size: 10.5px; display: flex; justify-content: space-between; }

.filterui { padding: 10px 11px; }
.filterui.sm { padding: 8px; }
.ddl { background: var(--soft); border: 1px solid var(--line); border-radius: 6px; padding: 5px 8px; font-weight: 600; }
.chips { display: flex; gap: 5px; flex-wrap: wrap; margin-top: 5px; }
.chips span { background: #eef0ff; border: 1px solid #d4d7ff; color: #4b40c4; border-radius: 6px; padding: 3px 7px; font-weight: 600; }
.hint, .updated { margin-top: 8px; font-size: 9.5px; font-weight: 700; color: var(--purple); }
.updated { color: #009e73; text-align: right; padding: 0 10px 8px; }
.frame.active .chips .flash { animation: flash 1.6s ease infinite; }

.bars { flex: 1; min-height: 0; display: flex; align-items: flex-end; gap: 6px; padding: 12px; }
.bars span { flex: 1; border-radius: 3px 3px 0 0; background: #e69f00; opacity: .85; }
.bars.big { padding: 18px; gap: 8px; }
.bars.react span { height: 30%; }
.frame.active .bars.react span { animation: grow 1.4s ease forwards; }
.frame.active .bars.react span:nth-child(1) { --h: 64%; }
.frame.active .bars.react span:nth-child(2) { --h: 40%; animation-delay:.05s; }
.frame.active .bars.react span:nth-child(3) { --h: 86%; animation-delay:.1s; }
.frame.active .bars.react span:nth-child(4) { --h: 58%; animation-delay:.15s; }
.frame.active .bars.react span:nth-child(5) { --h: 72%; animation-delay:.2s; }

/* arrange layout: filter | workflow | plot */
.dock.three .a-left { flex: 1; } .dock.three .a-mid { flex: .9; } .dock.three .a-right { flex: 1.1; }
.frame.active .dock.three .a-left { animation: fromR .6s ease; }
.frame.active .dock.three .a-right { animation: fromL .6s ease; }
.drop { position: absolute; top: 8px; bottom: 8px; border: 2px solid var(--purple); background: rgba(123,97,255,.13); border-radius: 8px; opacity: 0; }
.drop.r { right: 8px; width: 30%; }
.frame.active .drop.r { animation: dz 2s ease infinite; }

/* maximise */
.panel.maxed { animation: none; }
.frame.active .panel.maxed { animation: maxin .55s cubic-bezier(.16,1,.3,1); }

/* pages */
.dock.grid4 { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; }
.tbl { flex: 1; display: flex; flex-direction: column; gap: 5px; padding: 10px; justify-content: center; }
.tbl span { height: 6px; border-radius: 3px; background: var(--line); }
.tbl span:nth-child(odd) { width: 85%; } .tbl span:nth-child(even) { width: 60%; }
.kpis { flex: 1; display: flex; align-items: center; justify-content: space-around; }
.kpis b { font-size: 18px; color: var(--ink); }
.pagemenu { position: absolute; top: 4px; right: 60px; background: #fff; border: 1px solid var(--line); border-radius: 8px; box-shadow: 0 12px 28px -8px rgba(0,0,0,.25); padding: 5px; display: flex; flex-direction: column; gap: 2px; min-width: 120px; transform-origin: top right; }
.frame.active .pagemenu { animation: pop .35s cubic-bezier(.16,1,.3,1); }
.pm-it { padding: 6px 10px; border-radius: 6px; font-weight: 600; }
.pm-it.on { background: #eef0ff; color: #4b40c4; }
.pm-it.add { color: var(--vp-c-brand-1); border-top: 1px solid var(--line); border-radius: 0 0 6px 6px; margin-top: 2px; }

.modal { position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%); width: 62%; background: #fff; border: 1px solid var(--line); border-radius: 12px; box-shadow: 0 24px 60px -12px rgba(0,0,0,.4); overflow: hidden; }
.frame.active .modal { animation: pop .4s cubic-bezier(.16,1,.3,1); }
.md-h { padding: 9px 12px; font-weight: 700; border-bottom: 1px solid var(--line); display: flex; justify-content: space-between; }
.md-h i { font-style: normal; color: var(--mut); }
.md-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 7px; padding: 11px; }
.md-it { display: flex; align-items: center; gap: 7px; padding: 8px 10px; border: 1px solid var(--line); border-radius: 8px; font-weight: 600; }
.md-it em { font-style: normal; color: var(--mut); font-size: 10px; margin-left: auto; }
.md-it b { margin-left: auto; color: var(--vp-c-brand-1); font-weight: 700; }
.md-it.dis { opacity: .5; }
.md-it.pick { border-color: var(--vp-c-brand-1); box-shadow: 0 0 0 2px color-mix(in srgb, var(--vp-c-brand-1) 22%, transparent); }

.cur { position: absolute; width: 19px; height: 19px; z-index: 12; filter: drop-shadow(0 2px 3px rgba(0,0,0,.35)); }

@keyframes ring { 0% { transform: scale(.8); opacity: .6; } 100% { transform: scale(1.25); opacity: 0; } }
@keyframes flash { 0%,100% { box-shadow: 0 0 0 0 rgba(123,97,255,0); } 40% { box-shadow: 0 0 0 4px rgba(123,97,255,.25); } }
@keyframes grow { to { height: var(--h, 60%); } }
@keyframes fromR { from { transform: translateX(40%); opacity: .3; } }
@keyframes fromL { from { transform: translateX(-40%); opacity: .3; } }
@keyframes dz { 0%,100% { opacity: .5; } 50% { opacity: 1; } }
@keyframes maxin { from { transform: scale(.6); opacity: .4; } }
@keyframes pop { from { transform: translate(-50%,-50%) scale(.9); opacity: 0; } }

@media (prefers-reduced-motion: reduce) {
  .csteps { height: auto; }
  .csteps-sticky { position: static; min-height: 0; display: block; }
  .frames { height: 420px; }
  .frame { transition: none; }
  .frame:not(.active) { opacity: 0; }
  .frame.active { opacity: 1; }
  .frame.active .pagemenu, .frame.active .modal, .frame.active .bars.react span,
  .frame.active .node.clicked .ring, .frame.active .drop.r,
  .frame.active .dock.three .a-left, .frame.active .dock.three .a-right,
  .frame.active .panel.maxed, .frame.active .chips .flash { animation: none; }
  .bars.react span { height: 60%; }
}
</style>
