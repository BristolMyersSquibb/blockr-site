<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { useInView } from './motion.js'
import BoardSteps from './BoardSteps.vue'
import ChatPanel from './ChatPanel.vue'
import { assistantSteps as steps } from './assistant-steps.js'

// Same board build as the hero walkthrough — but driven by the assistant: each
// step the user types a prompt and submits it (ChatPanel), then the board (the
// original BoardSteps, reused untouched) performs the action. `boardActive` lags
// `active` so the board acts *after* the message is sent.
const active = ref(0)
const boardActive = ref(-1)                        // board waits for the message to be sent
const artEl = ref(null)
const { inView } = useInView(artEl, { once: false })
const hovering = ref(false)
const reduced = typeof window !== 'undefined' && window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
const dwell = [6800, 6200, 8200, 10800]
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
  <section class="ahero">
    <div class="lp-container ahero-head">
      <span class="lp-eyebrow">Prefer to chat?</span>
      <h2 class="lp-h2">Or just ask the assistant</h2>
      <p class="lp-lead">Describe what you want in plain language. The blockr assistant adds blocks, connects them, configures them, and arranges the layout for you.</p>
    </div>

    <div class="lp-container">
      <div
        class="ahero-art"
        ref="artEl"
        @mouseenter="hovering = true"
        @mouseleave="hovering = false"
        @focusin="hovering = true"
        @focusout="hovering = false"
      >
        <BoardSteps class="aboard" :active="boardActive">
          <template #aside><ChatPanel :active="active" @sent="boardActive = $event" /></template>
        </BoardSteps>

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
.ahero { padding: clamp(48px, 8vw, 96px) 0; }
.ahero-head { text-align: center; margin-bottom: clamp(28px, 4vw, 44px); }
.ahero-head .lp-lead { margin: 10px auto 0; max-width: 52ch; }
.ahero-art { position: relative; max-width: 1040px; margin: 0 auto; }

/* the board (BoardSteps, aspect-ratio) defines the row height; the chat is
   absolutely filled into its column so it matches that height and scrolls. */
/* the assistant performs the actions, so hide the board's fake mouse cursors
   in this variant (the wire/panel animations stay) */
.ahero-art :deep(.a2cur),
.ahero-art :deep(.connect .cur),
.ahero-art :deep(.grabcur),
.ahero-art :deep(.ghost),
.ahero-art :deep(.f4cur),
.ahero-art :deep(.m5cur) { display: none !important; }

/* the assistant adds the block directly — no "Add Block" sidebar to click
   through — so drop it and let the Workflow canvas fill the row */
.ahero-art :deep(.a2panel) { display: none !important; }

.hsteps { margin-top: 22px; }
.hs-track { display: flex; align-items: center; justify-content: center; gap: 7px; }
.hs-dot { width: 9px; height: 9px; padding: 0; border: 0; border-radius: 50%; background: var(--vp-c-divider); cursor: pointer; transition: width .3s ease, background .3s ease; }
.hs-dot.done { background: var(--vp-c-brand-1); opacity: .55; }
.hs-dot.on { width: 26px; border-radius: 5px; background: var(--vp-c-brand-1); opacity: 1; }
.hs-cap { display: flex; align-items: baseline; justify-content: center; gap: 8px; margin: 13px 0 0; font-size: .92rem; line-height: 1.4; animation: hs-fade .45s ease; }
.hs-n { font-variant-numeric: tabular-nums; font-weight: 700; font-size: .76rem; color: var(--vp-c-brand-1); border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 35%, transparent); border-radius: 6px; padding: 1px 6px; }
.hs-cap strong { font-weight: 700; color: var(--vp-c-text-1); }
.hs-b { color: var(--vp-c-text-2); }
@keyframes hs-fade { from { opacity: 0; transform: translateY(4px); } }

@media (max-width: 560px) { .hs-b { display: none; } }
@media (prefers-reduced-motion: reduce) { .hs-cap { animation: none; } }
</style>
