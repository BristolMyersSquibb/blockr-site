<script setup>
// Save & restore: a board persists. The mockup cycles through the lifecycle:
// unsaved -> saved (auto-versioned) -> the workflows menu -> the version
// history you can roll back to. Phases advance on a timer while in view,
// paused off-screen. Mirrors the Extend cube's motion approach.
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { useInView } from './motion.js'

const scene = ref(null)
const { inView } = useInView(scene, { once: false })
const phase = ref(0)
const reduced = typeof window !== 'undefined' && window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
// Dwell per phase: linger on the menu / history states.
const dwell = [2600, 2600, 4200, 4600]
let timer = null
function tick() { timer = setTimeout(() => { phase.value = (phase.value + 1) % 4; tick() }, dwell[phase.value]) }
function start() { if (timer || reduced) return; tick() }
function stop() { if (timer) { clearTimeout(timer); timer = null } }
watch(inView, (v) => { v ? start() : stop() }, { immediate: true })
onBeforeUnmount(stop)
if (reduced) phase.value = 2

const saved = computed(() => phase.value >= 1)
const open = computed(() => phase.value >= 2)
const onHistory = computed(() => phase.value >= 3)

const versions = [
  { t: 'Just now', note: 'Renamed Ggplot output' },
  { t: '14 min ago', note: 'Added Plot block' },
  { t: '1 hour ago', note: 'Filter: species == "Adelie"' },
  { t: 'Yesterday', note: 'Initial board' }
]

const captions = [
  'Not saved? One click saves the board.',
  'Saved. Every change is versioned.',
  'All your boards in one place.',
  'Roll back to any version.'
]
</script>

<template>
  <section class="save lp-container">
    <div class="save-head" v-reveal>
      <span class="lp-eyebrow">Save &amp; restore</span>
      <h2 class="lp-h2">Save, version, and share boards</h2>
      <p class="lp-lead" style="margin-inline:auto;text-align:center">
        A board is a document. Save it, browse every version, and pick up exactly where you left off.
      </p>
    </div>

    <div class="save-grid">
      <div class="save-copy" v-reveal>
        <ul class="save-points">
          <li><strong>One click to save.</strong></li>
          <li><strong>Automatic version history.</strong></li>
          <li><strong>Restore any earlier state.</strong></li>
          <li><strong>Share a board by link.</strong></li>
        </ul>
        <a class="save-link" href="/learn/02-build-a-dashboard">
          Save &amp; share a board
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
      </div>

      <div class="save-viz" ref="scene" v-reveal>
        <div class="sr-win" :class="{ 'is-open': open }">
          <!-- toolbar -->
          <div class="sr-tb">
            <span class="sr-logo">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z"/><path d="m4 12 8 4.5 8-4.5"/></svg>
            </span>
            <span class="sr-title">Share Explorer</span>
            <span class="sr-div"></span>
            <span class="sr-status" :class="{ on: saved }" :key="saved">
              {{ saved ? 'Just now' : 'Not saved' }}
            </span>
            <button class="sr-save" :class="{ pulse: !saved, done: saved }" type="button" aria-label="Save board">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M5 4h11l3 3v13H5z"/><path d="M8 4v5h7V4M8 14h8v6H8z"/></svg>
            </button>
            <button class="sr-new" type="button">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
              New
            </button>
          </div>

          <!-- dropdown menu -->
          <div class="sr-menu" :class="{ show: open }">
            <div class="sr-tabs">
              <button class="sr-tab" :class="{ active: !onHistory }" type="button">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="m12 4 7 4-7 4-7-4 7-4Z"/><path d="m5 12 7 4 7-4"/></svg>
                Workflows
              </button>
              <button class="sr-tab" :class="{ active: onHistory }" type="button">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/></svg>
                History
              </button>
              <span class="sr-ink" :class="{ right: onHistory }"></span>
            </div>

            <!-- workflows pane -->
            <div class="sr-pane" v-show="!onHistory">
              <span class="sr-lab">Recent</span>
              <div class="sr-wf">
                <span class="sr-wf-text"><strong>Share_Explorer</strong><small>Just now</small></span>
                <span class="sr-wf-dot"></span>
              </div>
              <div class="sr-sep"></div>
              <a class="sr-more" href="#" @click.prevent>
                View all workflows
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </a>
            </div>

            <!-- history pane -->
            <div class="sr-pane" v-show="onHistory">
              <span class="sr-lab">Versions</span>
              <div class="sr-hist">
                <div class="sr-hr" v-for="(v, i) in versions" :key="v.t" :class="{ cur: i === 0 }">
                  <span class="sr-time">{{ v.t }}</span>
                  <span class="sr-note">{{ v.note }}</span>
                  <span class="sr-act">
                    <span v-if="i === 0" class="sr-curtag">current</span>
                    <svg v-else viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8a9 9 0 1 1-2 6"/><path d="M3 3v5h5"/></svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p class="save-cap" :key="phase">{{ captions[phase] }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.save { margin: var(--lp-gap) auto; }
.save-head { text-align: center; max-width: 680px; margin: 0 auto 40px; }
.save-grid { display: grid; grid-template-columns: 1fr; gap: 40px; width: 100%; max-width: 960px; margin-inline: auto; align-items: center; }
@media (min-width: 920px) { .save-grid { grid-template-columns: 0.8fr 1.2fr; gap: 48px; } }

.save-points { list-style: none; padding: 0; margin: 0 0 22px; }
.save-points li { padding: 9px 0; font-size: 0.98rem; line-height: 1.5; color: var(--vp-c-text-2); border-bottom: 1px solid var(--vp-c-divider); }
.save-points li:last-child { border-bottom: 0; }
.save-points li strong { color: var(--vp-c-text-1); font-weight: 600; }
.save-link { display: inline-flex; align-items: center; gap: 6px; font-weight: 600; text-decoration: none; color: var(--vp-c-brand-1); }
.save-link:hover { gap: 9px; }

/* ===== mockup window ===== */
.save-viz {
  --ink:#27272b; --mut:#82828c; --line:#e6e7eb; --soft:#f4f4f6; --acc:#3451b2; --ok:#009e73;
  display: flex; flex-direction: column; align-items: center;
  position: relative; padding-bottom: 34px;
}
.sr-win {
  position: relative; width: 100%; max-width: 420px;
  background: #fff; border: 1px solid var(--line); border-radius: 14px;
  box-shadow: 0 22px 50px -20px rgba(0,0,0,.34);
  z-index: 1; text-align: left;
}

/* toolbar */
.sr-tb { display: flex; align-items: center; gap: 10px; padding: 13px 15px; }
.sr-logo { color: var(--ink); display: grid; place-items: center; }
.sr-title { font-weight: 700; font-size: 14px; color: var(--ink); white-space: nowrap; }
.sr-div { width: 1px; height: 18px; background: var(--line); }
.sr-status { font-size: 12px; color: var(--mut); white-space: nowrap; animation: sr-fadein .35s ease; }
.sr-status.on { color: var(--ok); }
.sr-save {
  margin-left: auto; display: grid; place-items: center;
  width: 30px; height: 30px; border-radius: 8px;
  background: #fff; border: 1px solid var(--line); color: var(--ink); cursor: pointer;
  transition: background .25s ease, color .25s ease, border-color .25s ease;
}
.sr-save.pulse { animation: sr-pulse 1.6s ease-in-out infinite; }
.sr-save.done { background: var(--acc); border-color: var(--acc); color: #fff; }
.sr-new {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 6px 11px; border-radius: 8px;
  background: #fff; border: 1px solid var(--line); color: var(--ink);
  font-weight: 600; font-size: 12.5px; cursor: pointer;
}
@keyframes sr-pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(52,81,178,0); } 50% { box-shadow: 0 0 0 5px rgba(52,81,178,.16); border-color: var(--acc); } }
@keyframes sr-fadein { from { opacity: 0; transform: translateY(-2px); } }

/* dropdown menu */
.sr-menu {
  border-top: 1px solid var(--line);
  max-height: 0; opacity: 0; overflow: hidden;
  transition: max-height .55s cubic-bezier(.16,1,.3,1), opacity .4s ease;
}
.sr-menu.show { max-height: 340px; opacity: 1; }

.sr-tabs { position: relative; display: grid; grid-template-columns: 1fr 1fr; }
.sr-tab {
  display: inline-flex; align-items: center; justify-content: center; gap: 7px;
  padding: 12px 0; background: none; border: 0; cursor: pointer;
  font-weight: 600; font-size: 13px; color: var(--mut);
  transition: color .25s ease;
}
.sr-tab.active { color: var(--acc); }
.sr-ink { position: absolute; bottom: 0; left: 0; width: 50%; height: 2px; background: var(--acc); transition: transform .35s cubic-bezier(.16,1,.3,1); }
.sr-ink.right { transform: translateX(100%); }

.sr-pane { padding: 14px 16px 16px; border-top: 1px solid var(--line); animation: sr-fadein .3s ease; }
.sr-lab { display: block; font-size: 10.5px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; color: var(--mut); margin-bottom: 10px; }

.sr-wf { display: flex; align-items: center; gap: 10px; padding: 4px 0; }
.sr-wf-text { display: flex; flex-direction: column; gap: 1px; }
.sr-wf-text strong { font-size: 14px; color: var(--ink); }
.sr-wf-text small { font-size: 11.5px; color: var(--mut); }
.sr-wf-dot { margin-left: auto; width: 8px; height: 8px; border-radius: 50%; background: var(--ok); }
.sr-sep { height: 1px; background: var(--line); margin: 12px 0; }
.sr-more { display: inline-flex; align-items: center; gap: 6px; font-weight: 600; font-size: 13px; color: var(--acc); text-decoration: none; }

.sr-hist { display: flex; flex-direction: column; }
.sr-hr { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 10px; padding: 8px; border-radius: 8px; transition: background .2s ease; }
.sr-hr + .sr-hr { border-top: 1px solid var(--soft); }
.sr-hr.cur { background: #eef0ff; }
.sr-time { font-size: 12px; font-weight: 600; color: var(--ink); white-space: nowrap; }
.sr-note { font-size: 11.5px; color: var(--mut); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.sr-act { color: var(--mut); display: grid; place-items: center; }
.sr-act svg { transition: color .2s ease; }
.sr-hr:hover .sr-act svg { color: var(--acc); }
.sr-curtag { font-size: 10px; font-weight: 700; color: var(--acc); }

.save-cap { position: absolute; bottom: 0; left: 0; right: 0; text-align: center; font-weight: 600; color: var(--vp-c-text-1); animation: sr-capin .4s ease; }
@keyframes sr-capin { from { opacity: 0; transform: translateY(6px); } }

@media (prefers-reduced-motion: reduce) {
  .sr-save, .sr-menu, .sr-ink, .save-cap, .sr-status, .sr-pane { transition: none; animation: none; }
  .sr-menu { max-height: 340px; opacity: 1; }
}
</style>
