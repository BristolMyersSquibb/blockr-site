<script setup>
// Presentational board mock for the walkthrough. The parent controls which
// step (frame) is visible via the `active` prop; this component just renders
// the 7 frames and their entrance animations. Generic blocks (Data / Filter /
// Plot) so it reads for any data and any chart.
defineProps({ active: { type: Number, default: 0 } })

const dbIcon = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><ellipse cx="12" cy="6" rx="7" ry="2.6"/><path d="M5 6v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6"/><path d="M5 12v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6v-6"/></svg>`
const flIcon = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 5h18l-7 8v6l-4 2v-8z" stroke-linejoin="round"/></svg>`
const ggIcon = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 20V4M4 20h16" stroke-linecap="round"/><circle cx="9" cy="13" r="1.6" fill="currentColor" stroke="none"/><circle cx="14" cy="9" r="1.6" fill="currentColor" stroke="none"/><circle cx="18" cy="11" r="1.6" fill="currentColor" stroke="none"/></svg>`
const importIcon = `<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 14V4m0 0-3.5 3.5M12 4l3.5 3.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 14v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3" stroke-linecap="round"/></svg>`
</script>

<template>
  <div class="bw">
    <div class="app">
      <div class="appbar">
        <span class="ab-logo"></span>
        <span class="ab-title">Build a dashboard</span>
        <button class="ab-save" :class="{ pressed: active === 4 }" type="button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M5 4h11l3 3v13H5z"/><path d="M8 4v5h7V4M8 20v-5h8v5"/></svg>
          Save
        </button>
        <span class="ab-spacer"></span>
      </div>
      <div class="frames">
        <!-- 01 add data: right-click -> Add block -> sidebar opens -> click Data block -->
        <div class="fr" :class="{ show: active === 0 }">
          <div class="dock">
            <div class="panel">
              <div class="ptab"><span class="tab on"><span class="dot wf"></span>Workflow</span></div>
              <div class="canvas">
                <div class="gn a2node"><div class="gtile" style="--t:#e6f0f7;--c:#0072b2"><span class="gicon" v-html="dbIcon"></span></div><em>Data</em><span class="pt out"></span></div>
              </div>
            </div>
            <div class="addpanel a2panel">
              <div class="ap-inner">
                <div class="ap-head"><span class="ap-x">✕</span><strong>Add Block</strong><span class="ap-sub">Select a block type</span></div>
                <div class="ap-search"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3" stroke-linecap="round"/></svg>Search…</div>
                <div class="ap-sec">Input</div>
                <div class="ap-item sel a2pick"><span class="ap-ic" style="--t:#e6f0f7;--c:#0072b2" v-html="dbIcon"></span><div class="ap-txt"><strong>Data block</strong><small>Load data from a package</small></div><span class="ap-tag">blockr.core</span></div>
                <div class="ap-item"><span class="ap-ic" style="--t:#e6f0f7;--c:#0072b2" v-html="importIcon"></span><div class="ap-txt"><strong>Import Data</strong><small>Read data from files or a URL</small></div><span class="ap-tag">blockr.io</span></div>
                <div class="ap-sec">Plot</div>
                <div class="ap-item"><span class="ap-ic" style="--t:#fbf0db;--c:#e69f00" v-html="ggIcon"></span><div class="ap-txt"><strong>Plot</strong><small>Scatter, bar, line, and more</small></div><span class="ap-tag">blockr.plot</span></div>
              </div>
            </div>
          </div>
          <svg class="a2cur" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3l14 7-6 2-2 6-6-15z" fill="#fff" stroke="#1b1b1f" stroke-width="1.5" stroke-linejoin="round"/></svg>
        </div>

        <!-- 02 connect: drag output port -> input port (top to bottom) -->
        <div class="fr" :class="{ show: active === 1 }">
          <div class="dock"><div class="panel">
            <div class="ptab"><span class="tab on"><span class="dot wf"></span>Workflow</span></div>
            <div class="canvas col connect">
              <div class="gn"><div class="gtile" style="--t:#e6f0f7;--c:#0072b2"><span class="gicon" v-html="dbIcon"></span></div><em>Data</em><span class="pt out hot"></span></div>
              <div class="wirebox">
                <svg class="wire" viewBox="0 0 24 64"><path d="M12 3 V58" stroke="#7b61ff" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path class="ahead" d="M7 53l5 5 5-5" stroke="#7b61ff" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <svg class="cur grab" viewBox="0 0 24 24" fill="#fff" stroke="#1b1b1f" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12.5V8.4a1.25 1.25 0 0 1 2.5 0v3.4"/><path d="M11.5 11.2V6.9a1.25 1.25 0 0 1 2.5 0v4.5"/><path d="M14 11.4V7.7a1.25 1.25 0 0 1 2.5 0V12"/><path d="M16.5 12v-2a1.25 1.25 0 0 1 2.5 0v5c0 3-1.9 5-5 5-1.8 0-3-.6-4.1-1.8L8 16c-.6-.8.4-1.9 1.3-1.4l1.2.7"/></svg>
              </div>
              <div class="gn"><span class="pt in hot"></span><div class="gtile" style="--t:#e3f3ee;--c:#009e73"><span class="gicon" v-html="flIcon"></span></div><em>Filter</em></div>
            </div>
          </div></div>
        </div>

        <!-- 03 transform (filter) -->
        <div class="fr" :class="{ show: active === 2 }">
          <div class="dock two">
            <div class="panel">
              <div class="ptab"><span class="tab on"><span class="dot wf"></span>Workflow</span></div>
              <div class="canvas col">
                <div class="gn"><div class="gtile" style="--t:#e6f0f7;--c:#0072b2"><span class="gicon" v-html="dbIcon"></span></div><em>Data</em></div>
                <svg class="edge" viewBox="0 0 16 34" preserveAspectRatio="none"><path d="M8 0 V28 m0 0-4-4m4 4 4-4" stroke="#c5c7cd" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <div class="gn sel"><div class="gtile" style="--t:#e3f3ee;--c:#009e73"><span class="gicon" v-html="flIcon"></span></div><em>Filter</em><span class="pt out"></span></div>
              </div>
            </div>
            <div class="panel">
              <div class="ptab"><span class="tab on"><span class="dot fl"></span>Filter</span></div>
              <div class="detail f4detail">
                <div class="dl">Values</div>
                <div class="chips f4chips">
                  <span>A ×</span><span class="f4cnew">B ×</span><span class="f4add">+</span>
                </div>
                <div class="f4table">
                  <div class="f4tr f4thead"><span>#</span><span>category</span><span>value</span></div>
                  <div class="f4tr"><span>1</span><span>A</span><span>21</span></div>
                  <div class="f4tr"><span>2</span><span>A</span><span>9</span></div>
                  <div class="f4tr f4r3"><span>3</span><span>B</span><span>18</span></div>
                  <div class="f4tr f4r4"><span>4</span><span>B</span><span>7</span></div>
                </div>
              </div>
            </div>
          </div>
          <svg class="f4cur" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3l14 7-6 2-2 6-6-15z" fill="#fff" stroke="#1b1b1f" stroke-width="1.5" stroke-linejoin="round"/></svg>
        </div>

        <!-- 04 visualise & arrange: plot connects, then the Filter docks as its own panel -->
        <div class="fr" :class="{ show: active === 3 }">
          <div class="dock arr3">
            <div class="panel pw">
              <div class="ptab"><span class="tab on"><span class="dot wf"></span>Workflow</span></div>
              <div class="canvas col">
                <div class="gn"><div class="gtile" style="--t:#e6f0f7;--c:#0072b2"><span class="gicon" v-html="dbIcon"></span></div><em>Data</em></div>
                <svg class="edge" viewBox="0 0 16 22" preserveAspectRatio="none"><path d="M8 0 V16 m0 0-4-4m4 4 4-4" stroke="#c5c7cd" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <div class="gn"><div class="gtile" style="--t:#e3f3ee;--c:#009e73"><span class="gicon" v-html="flIcon"></span></div><em>Filter</em><span class="pt out hot"></span></div>
                <div class="wirebox m5wire">
                  <svg class="wire" viewBox="0 0 24 64"><path d="M12 3 V58" stroke="#7b61ff" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path class="ahead" d="M7 53l5 5 5-5" stroke="#7b61ff" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  <svg class="m5cur" viewBox="0 0 24 24" fill="#fff" stroke="#1b1b1f" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12.5V8.4a1.25 1.25 0 0 1 2.5 0v3.4"/><path d="M11.5 11.2V6.9a1.25 1.25 0 0 1 2.5 0v4.5"/><path d="M14 11.4V7.7a1.25 1.25 0 0 1 2.5 0V12"/><path d="M16.5 12v-2a1.25 1.25 0 0 1 2.5 0v5c0 3-1.9 5-5 5-1.8 0-3-.6-4.1-1.8L8 16c-.6-.8.4-1.9 1.3-1.4l1.2.7"/></svg>
                </div>
                <div class="gn"><span class="pt in hot"></span><div class="gtile" style="--t:#fbf0db;--c:#e69f00"><span class="gicon" v-html="ggIcon"></span></div><em>Plot</em></div>
              </div>
            </div>
            <div class="panel pf">
              <div class="pcontent">
                <div class="ptab"><span class="tab on"><span class="dot fl"></span>Filter</span></div>
                <div class="detail">
                  <div class="dl">Values</div><div class="chips"><span>A ×</span><span>B ×</span></div>
                  <div class="f4table">
                    <div class="f4tr f4thead"><span>#</span><span>category</span><span>value</span></div>
                    <div class="f4tr"><span>1</span><span>A</span><span>21</span></div>
                    <div class="f4tr"><span>2</span><span>A</span><span>9</span></div>
                    <div class="f4tr"><span>3</span><span>B</span><span>18</span></div>
                    <div class="f4tr"><span>4</span><span>B</span><span>7</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="panel pp">
              <div class="ptab multi">
                <span class="tab on dragging"><span class="dot fl"></span>Filter</span>
                <span class="tab plottab"><span class="dot gg"></span>Plot</span>
                
                
              </div>
              <div class="ppbody">
                <div class="detail ppfilter">
                  <div class="dl">Values</div><div class="chips"><span>A ×</span><span>B ×</span></div>
                  <div class="f4table">
                    <div class="f4tr f4thead"><span>#</span><span>category</span><span>value</span></div>
                    <div class="f4tr"><span>1</span><span>A</span><span>21</span></div>
                    <div class="f4tr"><span>2</span><span>A</span><span>9</span></div>
                    <div class="f4tr"><span>3</span><span>B</span><span>18</span></div>
                    <div class="f4tr"><span>4</span><span>B</span><span>7</span></div>
                  </div>
                </div>
                <div class="bars ppplot"><span style="height:44%"></span><span style="height:72%"></span><span style="height:58%"></span><span style="height:88%"></span><span style="height:64%"></span></div>
              </div>
            </div>
          </div>
          <div class="vguide" aria-hidden="true"></div>
          <div class="ghost" aria-hidden="true"><span class="dot fl"></span>Filter</div>
          <svg class="grabcur" viewBox="0 0 24 24" fill="#fff" stroke="#1b1b1f" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M9 12.5V8.4a1.25 1.25 0 0 1 2.5 0v3.4"/>
            <path d="M11.5 11.2V6.9a1.25 1.25 0 0 1 2.5 0v4.5"/>
            <path d="M14 11.4V7.7a1.25 1.25 0 0 1 2.5 0V12"/>
            <path d="M16.5 12v-2a1.25 1.25 0 0 1 2.5 0v5c0 3-1.9 5-5 5-1.8 0-3-.6-4.1-1.8L8 16c-.6-.8.4-1.9 1.3-1.4l1.2.7"/>
          </svg>
        </div>

        <!-- 05 save & share: persist the built board, copy a link -->
        <div class="fr" :class="{ show: active === 4 }">
          <div class="dock">
            <div class="panel">
              <div class="ptab"><span class="tab on"><span class="dot wf"></span>Workflow</span></div>
              <div class="canvas col">
                <div class="gn"><div class="gtile" style="--t:#e6f0f7;--c:#0072b2"><span class="gicon" v-html="dbIcon"></span></div><em>Data</em></div>
                <svg class="edge" viewBox="0 0 16 22" preserveAspectRatio="none"><path d="M8 0 V16 m0 0-4-4m4 4 4-4" stroke="#c5c7cd" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <div class="gn"><div class="gtile" style="--t:#e3f3ee;--c:#009e73"><span class="gicon" v-html="flIcon"></span></div><em>Filter</em></div>
                <svg class="edge" viewBox="0 0 16 22" preserveAspectRatio="none"><path d="M8 0 V16 m0 0-4-4m4 4 4-4" stroke="#c5c7cd" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <div class="gn"><div class="gtile" style="--t:#fbf0db;--c:#e69f00"><span class="gicon" v-html="ggIcon"></span></div><em>Plot</em></div>
              </div>
            </div>
            <div class="panel">
              <div class="ptab"><span class="tab on"><span class="dot fl"></span>Filter</span></div>
              <div class="detail">
                <div class="dl">Values</div><div class="chips"><span>A ×</span><span>B ×</span></div>
                <div class="f4table">
                  <div class="f4tr f4thead"><span>#</span><span>category</span><span>value</span></div>
                  <div class="f4tr"><span>1</span><span>A</span><span>21</span></div>
                  <div class="f4tr"><span>2</span><span>A</span><span>9</span></div>
                  <div class="f4tr"><span>3</span><span>B</span><span>18</span></div>
                  <div class="f4tr"><span>4</span><span>B</span><span>7</span></div>
                </div>
              </div>
            </div>
            <div class="panel">
              <div class="ptab"><span class="tab on"><span class="dot gg"></span>Plot</span></div>
              <div class="bars"><span style="height:44%"></span><span style="height:72%"></span><span style="height:58%"></span><span style="height:88%"></span><span style="height:64%"></span></div>
            </div>
          </div>
          <div class="swf">
            <div class="swf-tabs">
              <button class="swf-tab active" type="button">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="m12 4 7 4-7 4-7-4 7-4Z"/><path d="m5 12 7 4 7-4"/></svg>
                Workflows
              </button>
              <button class="swf-tab" type="button">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/></svg>
                History
              </button>
              <span class="swf-ink"></span>
            </div>
            <div class="swf-pane">
              <span class="swf-lab">Recent</span>
              <div class="swf-row">
                <span class="swf-text"><strong>Build_a_dashboard</strong><small>Just now</small></span>
                <span class="swf-dot"></span>
              </div>
              <div class="swf-sep"></div>
              <span class="swf-more">View all workflows
                <svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
            </div>
          </div>
          <svg class="s8cur" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3l14 7-6 2-2 6-6-15z" fill="#fff" stroke="#1b1b1f" stroke-width="1.5" stroke-linejoin="round"/></svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bw { --ink:#3c3c43; --mut:#67676c; --line:#e6e7eb; --soft:#f4f4f6; --purple:#7b61ff; width: 100%; }
.app { border-radius: 16px; overflow: hidden; border: 1px solid var(--vp-c-divider); box-shadow: var(--lp-shadow); background: #fff; color: var(--ink); font-size: 14px; }
.appbar { display: flex; align-items: center; gap: 10px; padding: 9px 14px; background: #fff; border-bottom: 1px solid var(--line); }
.ab-logo { width: 19px; height: 19px; border-radius: 5px; background: linear-gradient(135deg,#0072b2,#e69f00); }
.ab-title { font-weight: 650; }
.ab-saved { position: relative; color: #b26b00; background: #fdf6e9; font-size: 11px; border: 1px solid #f0d6a8; border-radius: 10px; padding: 1px 8px; }
.ab-saved .s-ok { display: none; }
/* step 8 only: recolour amber -> green and crossfade the label after the click */
.ab-saved.saving { animation: pillSave 3.4s ease forwards; }
.ab-saved.saving .s-un { animation: pillUn 3.4s ease forwards; }
.ab-saved.saving .s-ok { display: inline; position: absolute; left: 8px; top: 1px; opacity: 0; animation: pillOk 3.4s ease forwards; }
@keyframes pillSave { 0%,52% { background: #fdf6e9; border-color: #f0d6a8; color: #b26b00; } 60%,100% { background: #eafaf3; border-color: #b9e6d6; color: #009e73; } }
@keyframes pillUn { 0%,52% { opacity: 1; } 58%,100% { opacity: 0; } }
@keyframes pillOk { 0%,52% { opacity: 0; } 60%,100% { opacity: 1; } }
.ab-save { display: inline-flex; align-items: center; gap: 5px; font-size: 11.5px; font-weight: 600; color: #fff; background: var(--vp-c-brand-1); border: 0; border-radius: 8px; padding: 4px 10px; cursor: pointer; }
.ab-save svg { width: 13px; height: 13px; }
.ab-save.pressed { animation: savePress 3.4s ease forwards; }
@keyframes savePress { 0%,48% { transform: scale(1); filter: brightness(1); } 53% { transform: scale(.93); filter: brightness(.9); } 60%,100% { transform: scale(1); filter: brightness(1); } }
/* step 8 cursor: rises from the board up to the navbar Save button */
/* anchor the cursor's centre (not its tip) on small navbar buttons so the whole arrow sits inside */
.s8cur { position: absolute; left: 50%; top: 52%; width: 18px; height: 18px; z-index: 9; transform: translate(-9px, -9px); filter: drop-shadow(0 2px 3px rgba(0,0,0,.35)); opacity: 0; }
.fr.show .s8cur { animation: s8move 3.4s ease forwards; }
@keyframes s8move {
  0% { left: 50%; top: 52%; opacity: 0; }
  8% { left: 50%; top: 52%; opacity: 1; }
  46% { left: 208px; top: -26px; }
  53% { left: 208px; top: -26px; }
  100% { left: 208px; top: -26px; opacity: 1; }
}
.ab-spacer { flex: 1; }
.ab-page { font-weight: 600; border: 1px solid var(--line); border-radius: 7px; padding: 3px 10px; }
.ab-page i { font-style: normal; color: var(--mut); }
.ab-avatar { width: 22px; height: 22px; border-radius: 50%; background: #6b5bd6; color: #fff; display: grid; place-items: center; font-size: 11px; font-weight: 700; }

.frames { position: relative; aspect-ratio: 16 / 10; background: #fbfbfc; }
.fr { position: absolute; inset: 0; opacity: 0; transition: opacity .75s cubic-bezier(.4, 0, .2, 1); }
.fr.show { opacity: 1; }
.dock { display: flex; gap: 10px; padding: 10px; height: 100%; }
.panel { flex: 1; min-width: 0; display: flex; flex-direction: column; border: 1px solid var(--line); border-radius: 10px; overflow: hidden; background: #fff; }
.ptab { display: flex; align-items: center; gap: 6px; padding: 7px 9px; border-bottom: 1px solid var(--line); }
.tab { display: inline-flex; align-items: center; gap: 6px; padding: 5px 11px; border-radius: 8px; font-weight: 600; color: var(--ink); background: #fff; border: 1px solid var(--line); }
.tab i { font-style: normal; color: var(--mut); margin-left: 2px; }
.dot { width: 8px; height: 8px; border-radius: 50%; }
.dot.wf { background: #6b7280; } .dot.fl { background: #009e73; } .dot.gg { background: #e69f00; }

.canvas { position: relative; flex: 1; min-height: 0; display: grid; place-items: center; background-image: radial-gradient(var(--line) 1px, transparent 1px); background-size: 20px 20px; }
.canvas.col { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0; padding: 6px 0; }
/* compact the vertical DAG so 3 nodes + edges never overflow the panel */
.canvas.col .gn { padding: 5px 16px; gap: 3px; }
.canvas.col .gtile { width: 42px; height: 42px; border-radius: 11px; }
.canvas.col .gn em { font-size: 10px; }
.canvas.col .edge { height: 22px; }

.emptyhint { text-align: center; border: 1.5px dashed var(--line); border-radius: 12px; padding: 26px 34px; }
.eh-ic { display: flex; align-items: center; justify-content: center; gap: 9px; color: var(--mut); margin-bottom: 12px; }
.eh-ic svg { border: 1px solid var(--line); border-radius: 9px; padding: 7px; width: 34px; height: 34px; }
.eh-t { font-weight: 600; color: var(--ink); margin-bottom: 9px; }
.eh-k { font-size: 11.5px; color: var(--mut); margin-top: 4px; }
.eh-k b { background: var(--soft); border: 1px solid var(--line); border-radius: 5px; padding: 1px 6px; font-weight: 600; color: var(--ink); }

.gn { position: relative; display: flex; flex-direction: column; align-items: center; gap: 5px; padding: 9px 16px; }
.gtile { width: 50px; height: 50px; border-radius: 12px; display: grid; place-items: center; background: var(--t); color: var(--c); border: 1px solid color-mix(in srgb, var(--c) 24%, transparent); }
.gicon { display: grid; place-items: center; line-height: 0; }
.gn.sel .gtile { box-shadow: 0 0 0 2px var(--vp-c-brand-1); }
.gn em { font-style: normal; font-size: 11px; color: var(--mut); font-weight: 500; }
.pt { position: absolute; left: 50%; width: 13px; height: 13px; border-radius: 50%; background: #fff; border: 2.5px solid #9aa0b0; transform: translateX(-50%); z-index: 3; }
.pt.in { top: 0; } .pt.out { bottom: 0; }
.pt.hot { border-color: var(--purple); box-shadow: 0 0 0 4px color-mix(in srgb, var(--purple) 22%, transparent); }

.edge { width: 16px; height: 32px; flex: none; }
.wirebox { position: relative; width: 28px; height: 74px; flex: none; }
.wire { position: absolute; inset: 0; width: 100%; height: 100%; }
.connect .cur { position: absolute; left: 50%; top: 0; transform: translateX(-50%); width: 21px; height: 21px; filter: drop-shadow(0 2px 3px rgba(0,0,0,.35)); opacity: 0; }

/* entrance micro-animations */
.fr.show .pop { animation: pop .5s cubic-bezier(.16,1,.3,1); }
/* connect: the wire draws in step with the cursor dragging from port to port */
.fr.show .connect .wire path { stroke-dasharray: 55; stroke-dashoffset: 55; animation: drawWire 2.4s ease forwards .4s; }
.fr.show .connect .pt.out.hot { animation: pulse 1.6s ease-in-out infinite; }
.fr.show .connect .pt.in.hot { animation: pulse 1.6s ease-in-out infinite 1.2s; }
.fr.show .connect .cur { animation: dragWire 2.4s ease forwards .4s; }
.fr.show .bars span { animation: rise .5s ease backwards; }
.fr.show .bars span:nth-child(2){animation-delay:.05s} .fr.show .bars span:nth-child(3){animation-delay:.1s} .fr.show .bars span:nth-child(4){animation-delay:.15s} .fr.show .bars span:nth-child(5){animation-delay:.2s}
@keyframes pop { from { opacity: 0; transform: scale(.6); } }
@keyframes drawWire { to { stroke-dashoffset: 0; } }
@keyframes dragWire { 0% { top: -2px; opacity: 0; } 12% { opacity: 1; } 100% { top: 58px; opacity: 1; } }
/* arrowhead pops in once the wire reaches the port (kept off the dashed reveal so sync holds) */
.connect .wire .ahead { opacity: 0; }
.fr.show .connect .wire .ahead { animation: aheadIn .45s ease forwards 2.55s; }
@keyframes aheadIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes pulse { 0%,100% { box-shadow: 0 0 0 3px color-mix(in srgb, var(--purple) 10%, transparent); } 50% { box-shadow: 0 0 0 6px color-mix(in srgb, var(--purple) 28%, transparent); } }
@keyframes rise { from { height: 0 !important; opacity: .3; } }

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

/* 02 add data: right-click menu -> sidebar opens -> click Data block */
/* 02 add data: sidebar open, cursor clicks the Data block, it lands on the canvas */
.a2panel { flex: 0 0 0; overflow: hidden; }
.a2panel .ap-inner { display: flex; flex-direction: column; min-width: 236px; height: 100%; }
.fr.show .a2panel { animation: a2open 3.4s cubic-bezier(.16,1,.3,1) forwards; }
@keyframes a2open { 0% { flex-basis: 0; } 14%,100% { flex-basis: 44%; } }
.a2node { opacity: 0; }
.fr.show .a2node { animation: a2drop 3.4s ease forwards; }
@keyframes a2drop { 0%,50% { opacity: 0; transform: scale(.6); } 60%,100% { opacity: 1; transform: scale(1); } }
.fr.show .a2pick { animation: a2click 3.4s ease forwards; }
@keyframes a2click { 0%,38% { transform: scale(1); } 44% { transform: scale(.97); } 50%,100% { transform: scale(1); } }
.a2cur { position: absolute; left: 60%; top: 30%; width: 18px; height: 18px; z-index: 9; transform: translate(-3.75px, -2.25px); filter: drop-shadow(0 2px 3px rgba(0,0,0,.35)); opacity: 0; }
.fr.show .a2cur { animation: a2move 3.4s ease forwards; }
@keyframes a2move {
  0% { left: 60%; top: 30%; opacity: 0; }
  8% { left: 60%; top: 30%; opacity: 1; }
  34% { left: 78%; top: 40%; }
  44% { left: 78%; top: 40%; }
  100% { left: 78%; top: 40%; opacity: 1; }
}

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

/* 04 transform: live table. add B -> remove B -> switch column to value -> threshold */
.f4detail { position: relative; }
.f4chips .f4add { background: var(--soft); border: 1px solid var(--line); color: var(--mut); font-weight: 700; border-radius: 7px; padding: 4px 9px; }
/* B chip: appears (add), then disappears (remove) */
.f4cnew { overflow: hidden; white-space: nowrap; max-width: 0; opacity: 0; padding-left: 0; padding-right: 0; }
.fr.show .f4cnew { animation: f4chip 4.8s ease forwards; }
@keyframes f4chip {
  0%,16% { max-width: 0; opacity: 0; padding-left: 0; padding-right: 0; }
  26%,46% { max-width: 60px; opacity: 1; padding-left: 9px; padding-right: 9px; }
  56%,100% { max-width: 0; opacity: 0; padding-left: 0; padding-right: 0; }
}
.f4table { margin-top: 12px; border: 1px solid var(--line); border-radius: 8px; overflow: hidden; font-size: 11px; }
.f4tr { display: grid; grid-template-columns: 26px 1fr 46px; align-items: center; padding: 5px 10px; border-top: 1px solid var(--line); color: var(--ink); }
.f4tr:first-child { border-top: 0; }
.f4tr span:nth-child(2) { color: var(--vp-c-brand-1); font-weight: 700; }
.f4thead { background: var(--soft); color: var(--mut); font-weight: 700; font-size: 9.5px; text-transform: uppercase; letter-spacing: .04em; }
.f4thead span:nth-child(2) { color: var(--mut); font-weight: 700; }
/* B rows appear when B is added, disappear when removed */
.f4r3, .f4r4 { overflow: hidden; max-height: 0; opacity: 0; padding-top: 0; padding-bottom: 0; border-top-width: 0; }
.fr.show .f4r3 { animation: f4row 4.8s ease forwards; }
.fr.show .f4r4 { animation: f4row 4.8s ease forwards .1s; }
@keyframes f4row {
  0%,20% { max-height: 0; opacity: 0; padding-top: 0; padding-bottom: 0; border-top-width: 0; }
  30%,46% { max-height: 30px; opacity: 1; padding-top: 5px; padding-bottom: 5px; border-top-width: 1px; }
  56%,100% { max-height: 0; opacity: 0; padding-top: 0; padding-bottom: 0; border-top-width: 0; }
}
.f4cur { position: absolute; width: 18px; height: 18px; z-index: 9; filter: drop-shadow(0 2px 3px rgba(0,0,0,.35)); opacity: 0; transform: translate(-3.75px, -2.25px); }
.fr.show .f4cur { animation: f4move 4.8s ease forwards; }
@keyframes f4move {
  0% { left: 56%; top: 30%; opacity: 0; }
  8% { left: 56%; top: 32%; opacity: 1; }
  18% { left: 64.6%; top: 29.8%; }
  26% { left: 64.6%; top: 29.8%; }
  44% { left: 61%; top: 29.8%; }
  52% { left: 61%; top: 29.8%; }
  100% { left: 61%; top: 29.8%; opacity: 1; }
}
.plotctl { display: flex; gap: 8px; padding: 11px 14px 0; }
.pc { display: inline-flex; align-items: center; gap: 6px; background: var(--soft); border: 1px solid var(--line); border-radius: 7px; padding: 5px 10px; font-weight: 600; font-size: 11px; color: var(--ink); }
.pc i { font-style: normal; font-weight: 700; font-size: 9.5px; letter-spacing: .05em; color: var(--mut); }
.bars { flex: 1; display: flex; align-items: flex-end; gap: 9px; padding: 14px 18px 18px; }

/* 05 visualise: drag the Filter->Plot connection; right panel opens the Plot tab */
.v5wire { position: relative; width: 26px; height: 38px; flex: none; }
.v5wire .wire { position: absolute; inset: 0; width: 100%; height: 100%; }
.v5wire .wire path { stroke-dasharray: 100; stroke-dashoffset: 100; }
.fr.show .v5wire .wire path { animation: drawWire 1.8s ease forwards .4s; }
.v5wire .v5cur { position: absolute; left: 50%; top: 0; transform: translateX(-50%); width: 17px; height: 17px; opacity: 0; filter: drop-shadow(0 2px 3px rgba(0,0,0,.35)); }
.fr.show .v5wire .v5cur { animation: dragWire5 1.8s ease forwards .4s; }
@keyframes dragWire5 { 0% { top: -2px; opacity: 0; } 12% { opacity: 1; } 100% { top: 28px; opacity: 1; } }
.fr.show .v5port { animation: pulse 1.6s ease-in-out infinite; }
.fr.show .v5pin { animation: pulse 1.6s ease-in-out infinite 1s; }
.v5body { position: relative; flex: 1; min-height: 0; }
.v5filter, .v5plotpane { position: absolute; inset: 0; }
.v5plotpane { display: flex; flex-direction: column; opacity: 0; }
.fr.show .v5filter { animation: v5out 3.4s ease forwards; }
.fr.show .v5plotpane { animation: v5in 3.4s ease forwards; }
@keyframes v5out { 0%,64% { opacity: 1; } 74%,100% { opacity: 0; } }
@keyframes v5in { 0%,66% { opacity: 0; } 78%,100% { opacity: 1; } }
.fr.show .v5ftab { animation: v5ftab 3.4s ease forwards; }
@keyframes v5ftab { 0%,66% { background: #fff; border-color: var(--line); color: var(--ink); } 76%,100% { background: transparent; border-color: transparent; color: var(--mut); } }
.v5ptab { overflow: hidden; white-space: nowrap; max-width: 0; opacity: 0; padding-left: 0; padding-right: 0; background: transparent; border-color: transparent; color: var(--mut); }
.fr.show .v5ptab { animation: v5ptab 3.4s ease forwards; }
@keyframes v5ptab {
  0%,64% { max-width: 0; opacity: 0; padding-left: 0; padding-right: 0; background: transparent; border-color: transparent; color: var(--mut); }
  80%,100% { max-width: 120px; opacity: 1; padding-left: 11px; padding-right: 11px; background: #fff; border-color: var(--line); color: var(--ink); }
}
.bars span { flex: 1; border-radius: 4px 4px 0 0; background: #e69f00; opacity: .85; }

/* 04 visualise & arrange — one 6s, 3-phase sequence:
   (1) connect Filter->Plot in the DAG, (2) Plot nests as a tab on the Filter panel,
   (3) drag the Filter tab out; it docks as its own panel with a guide. */
.dock.arr3 .panel { flex: 0 1 0; min-width: 0; }
.arr3 .pw { flex-grow: 3; } .arr3 .pf { flex-grow: 0; overflow: hidden; } .arr3 .pp { flex-grow: 3; }
.fr.show .arr3 .pw { animation: arrW 7s cubic-bezier(.4,0,.2,1) forwards; }
.fr.show .arr3 .pf { animation: arrF 7s cubic-bezier(.4,0,.2,1) forwards; }
.fr.show .arr3 .pp { animation: arrP 7s cubic-bezier(.4,0,.2,1) forwards; }
/* panels open only after the cursor has released at the gap (>82%), gliding open */
@keyframes arrW { 0%,82% { flex-grow: 3; } 96%,100% { flex-grow: 2; } }
@keyframes arrF { 0%,82% { flex-grow: 0; } 96%,100% { flex-grow: 2; } }
@keyframes arrP { 0%,82% { flex-grow: 3; } 96%,100% { flex-grow: 2; } }
/* the docked Filter panel reveals its content once it opens (phase 3) */
.pf .pcontent { display: flex; flex-direction: column; height: 100%; opacity: 0; }
.fr.show .pf .pcontent { animation: arrLate 7s ease forwards; }
@keyframes arrLate { 0%,88% { opacity: 0; } 97%,100% { opacity: 1; } }
/* right panel: Filter detail -> Plot chart (phase 2), then Filter tab leaves (phase 3) */
.pp .ppbody { position: relative; flex: 1; min-height: 0; }
.pp .ppfilter, .pp .ppplot { position: absolute; inset: 0; }
.pp .ppplot { opacity: 0; }
.fr.show .pp .ppfilter { animation: ppOut 7s ease forwards; }
.fr.show .pp .ppplot { animation: ppIn 7s ease forwards; }
@keyframes ppOut { 0%,28% { opacity: 1; } 40%,100% { opacity: 0; } }
@keyframes ppIn { 0%,36% { opacity: 0; } 46%,100% { opacity: 1; } }
.pp .tab.dragging { overflow: hidden; white-space: nowrap; }
.fr.show .pp .tab.dragging { animation: ppFilterTab 7s ease forwards; }
@keyframes ppFilterTab {
  0%,28% { background: #fff; border-color: var(--line); color: var(--ink); max-width: 140px; opacity: 1; padding-left: 11px; padding-right: 11px; }
  40%,80% { background: transparent; border-color: transparent; color: var(--mut); max-width: 140px; opacity: 1; padding-left: 11px; padding-right: 11px; }
  84% { opacity: 0; max-width: 140px; }
  90%,100% { opacity: 0; max-width: 0; padding-left: 0; padding-right: 0; border-width: 0; }
}
/* Plot tab nests onto the Filter panel in phase 2 */
.pp .plottab { overflow: hidden; white-space: nowrap; max-width: 0; opacity: 0; padding-left: 0; padding-right: 0; background: transparent; border-color: transparent; color: var(--mut); }
.fr.show .pp .plottab { animation: ppPlotIn 7s ease forwards; }
@keyframes ppPlotIn {
  0%,26% { max-width: 0; opacity: 0; padding-left: 0; padding-right: 0; background: transparent; border-color: transparent; color: var(--mut); }
  42%,100% { max-width: 120px; opacity: 1; padding-left: 11px; padding-right: 11px; background: #fff; border-color: var(--line); color: var(--ink); }
}
/* drop guide (phase 3): previews the one-third footprint */
.vguide { position: absolute; top: 12px; bottom: 12px; left: 34.5%; width: 31%; border: 2px dashed var(--purple); background: color-mix(in srgb, var(--purple) 12%, transparent); border-radius: 10px; opacity: 0; pointer-events: none; z-index: 5; }
.fr.show .vguide { animation: arrGuide 7s ease forwards; }
@keyframes arrGuide { 0%,70% { opacity: 0; } 75%,84% { opacity: 1; } 90%,100% { opacity: 0; } }
/* the picked-up Filter tab + grabbing-hand cursor (phase 3): grab the header, dwell, then drag slowly */
.ghost { position: absolute; left: 54%; top: 9%; z-index: 7; display: inline-flex; align-items: center; gap: 6px; padding: 5px 11px; border-radius: 8px; font-weight: 600; font-size: 13px; color: var(--ink); background: #fff; border: 1px solid var(--purple); box-shadow: 0 12px 24px -7px rgba(0,0,0,.4); transform: translate(-4px, 13px) rotate(-3deg); opacity: 0; }
.grabcur { position: absolute; left: 68%; top: 38%; width: 21px; height: 21px; z-index: 8; filter: drop-shadow(0 2px 3px rgba(0,0,0,.35)); opacity: 0; }
/* hand: travel onto the Filter tab, dwell (grab), then drag out to the gap */
.fr.show .grabcur { animation: arrHand 7s ease forwards; }
/* dragged Filter pill: only appears once the hand has grabbed the tab */
.fr.show .ghost { animation: arrGhost 7s ease forwards; }
@keyframes arrHand {
  0%,48% { opacity: 0; left: 68%; top: 38%; }
  52% { opacity: 1; left: 68%; top: 38%; }
  66% { opacity: 1; left: 54%; top: 9%; }
  70% { opacity: 1; left: 54%; top: 9%; }
  79% { opacity: 1; left: 49%; top: 50%; }
  83% { opacity: 1; left: 49%; top: 50%; }
  89% { opacity: 0; left: 49%; top: 50%; }
  100% { opacity: 0; left: 49%; top: 50%; }
}
@keyframes arrGhost {
  0%,66% { opacity: 0; left: 54%; top: 9%; }
  70% { opacity: 1; left: 54%; top: 9%; }
  79% { opacity: 1; left: 49%; top: 50%; }
  83% { opacity: 1; left: 49%; top: 50%; }
  89% { opacity: 0; left: 49%; top: 50%; }
  100% { opacity: 0; left: 49%; top: 50%; }
}
/* phase 1: the Filter->Plot connection draws in purple, cursor dragging it */
.m5wire { position: relative; width: 26px; height: 38px; flex: none; }
.m5wire .wire { position: absolute; inset: 0; width: 100%; height: 100%; }
.m5wire .wire path { stroke-dasharray: 55; stroke-dashoffset: 55; }
.fr.show .m5wire .wire path { animation: drawWire 1.5s ease forwards .3s; }
.m5wire .m5cur { position: absolute; left: 50%; top: 0; transform: translateX(-50%); width: 19px; height: 19px; opacity: 0; filter: drop-shadow(0 2px 3px rgba(0,0,0,.35)); }
.fr.show .m5wire .m5cur { animation: m5drag 1.8s ease forwards .2s; }
@keyframes m5drag { 0% { top: -2px; opacity: 0; } 12% { opacity: 1; } 80% { top: 28px; opacity: 1; } 100% { top: 28px; opacity: 0; } }
.m5wire .wire .ahead { opacity: 0; }
.fr.show .m5wire .wire .ahead { animation: aheadIn .45s ease forwards 1.7s; }

/* 07 pages: page menu dropdown anchored under the page selector */
.pgdrop { position: absolute; top: 4px; right: 46px; width: 210px; max-width: 52%; background: #fff; border: 1px solid var(--line); border-radius: 0 0 12px 12px; box-shadow: 0 22px 46px -16px rgba(0,0,0,.42); overflow: hidden; z-index: 6; padding: 7px; opacity: 0; }
.fr.show .pgmenu { animation: pgOpen 6.6s ease forwards; transform-origin: top right; }
@keyframes pgOpen { 0%,13% { opacity: 0; transform: scale(.9); } 17%,32% { opacity: 1; transform: scale(1); } 37%,100% { opacity: 0; transform: scale(.97); } }
/* second dropdown reopens at the end, now listing the created Page 2 */
.pgmenu2 { z-index: 7; }
.fr.show .pgmenu2 { animation: pgOpen2 6.6s ease forwards; transform-origin: top right; }
@keyframes pgOpen2 { 0%,73% { opacity: 0; transform: scale(.92); } 79%,100% { opacity: 1; transform: scale(1); } }
.pg-row { display: flex; align-items: center; gap: 9px; padding: 9px 11px; border-radius: 8px; font-weight: 600; }
.pg-row svg { width: 15px; height: 15px; flex: none; }
.pg-row.active { background: #eef0ff; color: var(--vp-c-brand-1); }
.pg-row.new { color: var(--ink); }
.fr.show .pg-pick { animation: pgPick 6.6s ease forwards; }
@keyframes pgPick { 0%,27% { background: transparent; } 31%,35% { background: var(--soft); } 39%,100% { background: transparent; } }
.pg-sep { height: 1px; background: var(--line); margin: 6px 4px; }
/* New view modal: dim the board, pop a centred card */
.pgmodal { position: absolute; inset: 0; background: rgba(20,20,28,.34); display: grid; place-items: center; z-index: 10; opacity: 0; }
.fr.show .pgmodal { animation: pgModal 6.6s ease forwards; }
@keyframes pgModal { 0%,36% { opacity: 0; } 42%,52% { opacity: 1; } 58%,100% { opacity: 0; } }
.pgm-card { width: 80%; max-width: 380px; background: #fff; border-radius: 12px; box-shadow: 0 30px 60px -20px rgba(0,0,0,.5); overflow: hidden; }
.fr.show .pgm-card { animation: pgCard 6.6s cubic-bezier(.16,1,.3,1) forwards; }
@keyframes pgCard { 0%,36% { opacity: 0; transform: translateY(10px) scale(.96); } 44%,52% { opacity: 1; transform: none; } 58%,100% { opacity: 0; transform: translateY(6px) scale(.98); } }
.pgm-head { padding: 13px 18px; border-bottom: 1px solid var(--line); font-size: 11px; font-weight: 700; letter-spacing: .08em; color: var(--ink); }
.pgm-body { padding: 16px 18px 18px; }
.pgm-lab { font-size: 12px; color: var(--mut); margin-bottom: 6px; }
.pgm-lab:not(:first-child) { margin-top: 14px; }
.pgm-field { background: #fbfbfc; border: 1px solid var(--line); border-radius: 8px; padding: 10px 13px; font-weight: 600; color: var(--ink); }
.pgm-field.muted { color: var(--mut); font-weight: 500; }
.pgm-actions { display: flex; justify-content: flex-end; margin-top: 18px; }
.pgm-btn { background: var(--soft); border: 1px solid var(--line); border-radius: 8px; padding: 8px 16px; font-weight: 600; color: var(--ink); }
.fr.show .pgm-btn { animation: pgmBtn 6.6s ease forwards; }
@keyframes pgmBtn { 0%,49% { transform: scale(1); background: var(--soft); } 53% { transform: scale(.95); background: #e6e6ec; } 57%,100% { transform: scale(1); background: var(--soft); } }
/* the empty new view that the Create view click opens */
.v7empty { position: absolute; inset: 0; background: #f6f6f9; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 13px; opacity: 0; z-index: 4; }
.v7e-ic { color: #9aa0b0; }
.v7e-ic svg { width: 34px; height: 34px; }
.v7e-t { color: var(--mut); font-weight: 500; }
.v7e-btn { background: #fff; border: 1px solid var(--line); border-radius: 8px; padding: 9px 18px; font-weight: 600; color: var(--ink); }
.fr.show .v7empty { animation: v7reveal 6.6s ease forwards; }
@keyframes v7reveal { 0%,53% { opacity: 0; } 64%,100% { opacity: 1; } }
/* navbar page label flips to Page 2 once the view is created */
.ab-page { position: relative; }
.ab-page .pgl2 { display: none; }
.ab-page.renaming .pgl1 { animation: pglOut 6.6s ease forwards; }
.ab-page.renaming .pgl2 { display: inline; position: absolute; left: 10px; top: 3px; animation: pglIn 6.6s ease forwards; }
@keyframes pglOut { 0%,57% { opacity: 1; } 63%,100% { opacity: 0; } }
@keyframes pglIn { 0%,57% { opacity: 0; } 63%,100% { opacity: 1; } }
/* step 7 cursor: page selector -> New page -> Create view -> back to reopen the menu */
.s7cur { position: absolute; left: 50%; top: 52%; width: 18px; height: 18px; z-index: 11; transform: translate(-9px, -9px); filter: drop-shadow(0 2px 3px rgba(0,0,0,.35)); opacity: 0; }
.fr.show .s7cur { animation: s7move 6.6s ease forwards; }
@keyframes s7move {
  0% { left: 50%; top: 52%; opacity: 0; }
  5% { left: 50%; top: 52%; opacity: 1; }
  13% { left: calc(100% - 84px); top: -26px; opacity: 1; }
  18% { left: calc(100% - 84px); top: -26px; }
  29% { left: calc(100% - 151px); top: 88px; opacity: 1; }
  35% { left: calc(100% - 151px); top: 88px; }
  47% { left: calc(50% + 115px); top: calc(50% + 116px); opacity: 1; }
  53% { left: calc(50% + 115px); top: calc(50% + 116px); }
  67% { left: calc(100% - 84px); top: -26px; opacity: 1; }
  73% { left: calc(100% - 84px); top: -26px; opacity: 1; }
  80% { opacity: 0; }
  100% { left: calc(100% - 84px); top: -26px; opacity: 0; }
}
.ab-page.pressed { animation: pagePress 6.6s ease forwards; }
@keyframes pagePress { 0%,11% { background: #fff; } 14%,18% { background: var(--soft); } 22%,69% { background: #fff; } 72%,76% { background: var(--soft); } 80%,100% { background: #fff; } }

.swf { position: absolute; top: 4px; left: 10px; width: 300px; max-width: 62%; background: #fff; border: 1px solid var(--line); border-radius: 0 0 12px 12px; box-shadow: 0 22px 46px -16px rgba(0,0,0,.42); overflow: hidden; z-index: 6; }
.fr.show .swf { animation: pop .45s cubic-bezier(.16,1,.3,1) 1.85s backwards; transform-origin: top left; }
.swf-tabs { position: relative; display: grid; grid-template-columns: 1fr 1fr; border-bottom: 1px solid var(--line); }
.swf-tab { display: inline-flex; align-items: center; justify-content: center; gap: 7px; padding: 12px 0; background: none; border: 0; font-weight: 600; font-size: 13px; color: var(--mut); }
.swf-tab.active { color: var(--vp-c-brand-1); }
.swf-tab svg { width: 15px; height: 15px; }
.swf-ink { position: absolute; bottom: -1px; left: 0; width: 50%; height: 2px; background: var(--vp-c-brand-1); }
.swf-pane { padding: 14px 16px 16px; }
.swf-lab { display: block; font-size: 10.5px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; color: var(--mut); margin-bottom: 10px; }
.swf-row { display: flex; align-items: center; gap: 10px; padding: 4px 0; }
.swf-text { display: flex; flex-direction: column; gap: 1px; }
.swf-text strong { font-size: 14px; color: var(--ink); }
.swf-text small { font-size: 11.5px; color: var(--mut); }
.swf-dot { margin-left: auto; width: 8px; height: 8px; border-radius: 50%; background: #009e73; }
.swf-sep { height: 1px; background: var(--line); margin: 12px 0; }
.swf-more { display: inline-flex; align-items: center; gap: 6px; font-weight: 600; font-size: 13px; color: var(--vp-c-brand-1); }
.swf-more svg { width: 14px; height: 14px; }

@media (prefers-reduced-motion: reduce) {
  .fr { transition: none; }
  .fr.show .pop, .fr.show .wire path, .fr.show .cur, .fr.show .bars span, .fr.show .pt.hot,
  .fr.show .grabcur, .fr.show .ghost, .fr.show .vguide, .fr.show .pgmenu, .fr.show .swf,
  .fr.show .arr3 .pw, .fr.show .arr3 .pf, .fr.show .arr3 .pp, .fr.show .pf .pcontent,
  .fr.show .pp .ppfilter, .fr.show .pp .ppplot, .fr.show .pp .tab.dragging, .fr.show .pp .plottab,
  .fr.show .a2panel, .fr.show .a2hint, .fr.show .a2node, .fr.show .a2ctx, .fr.show .a2add, .fr.show .a2pick, .fr.show .a2cur,
  .fr.show .s8cur, .ab-saved.saving, .ab-saved.saving .s-un, .ab-saved.saving .s-ok, .ab-save.pressed,
  .fr.show .pgmenu, .fr.show .pgmenu2, .fr.show .pg-pick, .fr.show .pgmodal, .fr.show .pgm-card, .fr.show .pgm-btn, .fr.show .v7empty, .fr.show .s7cur, .ab-page.pressed, .ab-page.renaming .pgl1, .ab-page.renaming .pgl2,
  .fr.show .v5wire .wire path, .fr.show .v5wire .v5cur, .fr.show .v5port, .fr.show .v5pin, .fr.show .v5filter, .fr.show .v5plotpane, .fr.show .v5ftab, .fr.show .v5ptab,
  .fr.show .f4cnew, .fr.show .f4r3, .fr.show .f4r4, .fr.show .f4cur { animation: none; }
  .fr.show .connect .wire path { stroke-dashoffset: 0; }
  /* 04 at rest: A only (B removed) */
  .f4cnew { max-width: 0; opacity: 0; }
  .f4r3, .f4r4 { max-height: 0; opacity: 0; padding-top: 0; padding-bottom: 0; }
  .f4cur { opacity: 0; }
  .connect .cur { opacity: 0; }
  /* 05 at rest: Filter->Plot connected, Plot tab open */
  .v5wire .wire path { stroke-dashoffset: 0; }
  .v5wire .v5cur { opacity: 0; }
  .v5filter { opacity: 0; } .v5plotpane { opacity: 1; }
  .v5ftab { background: transparent; border-color: transparent; color: var(--mut); }
  .v5ptab { max-width: 120px; opacity: 1; padding-left: 11px; padding-right: 11px; background: #fff; border-color: var(--line); color: var(--ink); }
  /* step 7 at rest: empty view created, dropdown lists Page 2 */
  .pgmenu, .s7cur, .pgmodal { opacity: 0; }
  .v7empty, .pgmenu2 { opacity: 1; }
  .ab-page.renaming .pgl1 { display: none; }
  .ab-page.renaming .pgl2 { display: inline; position: static; opacity: 1; }
  /* 02 at rest: sidebar open, Data block placed, helpers hidden */
  .a2panel { flex-basis: 44%; }
  .a2hint, .a2ctx, .a2cur, .s8cur { opacity: 0; }
  .a2node { opacity: 1; }
  /* step 8 at rest: board saved */
  .ab-saved.saving { background: #eafaf3; border-color: #b9e6d6; color: #009e73; }
  .ab-saved.saving .s-un { display: none; }
  .ab-saved.saving .s-ok { display: inline; position: static; opacity: 1; }
  /* arrange at rest: show the committed three-panel result */
  .arr3 .pw, .arr3 .pf, .arr3 .pp { flex-grow: 2; }
  .pf .pcontent { opacity: 1; }
  .pp .ppfilter { opacity: 0; } .pp .ppplot { opacity: 1; }
  .pp .tab.dragging { display: none; }
  .pp .plottab { background: #fff; border-color: var(--line); color: var(--ink); }
  .vguide, .ghost, .grabcur { opacity: 0; }
}
</style>
