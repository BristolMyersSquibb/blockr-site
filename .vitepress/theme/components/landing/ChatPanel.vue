<script setup>
// The blockr assistant chat. Driven by `active`: turns 0..active-1 are settled
// history; turn `active` plays live — the message is typed letter by letter into
// the composer, "sent" (emits `sent` so the board reacts), then the reply lands.
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { assistantSteps as steps } from './assistant-steps.js'

const props = defineProps({ active: { type: Number, default: 0 } })
const emit = defineEmits(['sent'])
const md = (s) => s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
const botIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><rect x="4" y="8" width="16" height="11" rx="3"/><path d="M12 4v4M8 13h.01M16 13h.01" stroke-linecap="round"/><path d="M9 16h6" stroke-linecap="round"/></svg>`

const shown = computed(() => steps.slice(0, props.active + 1))
const typed = ref('')                 // the message as it is typed
const phase = ref('typing')           // typing | sent | replied
const reduced = typeof window !== 'undefined' && window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const PER_CHAR = 48                   // ms per character
let tType, tSent, tReply
function clearTimers () { clearInterval(tType); clearTimeout(tSent); clearTimeout(tReply) }

watch(() => props.active, (k) => {
  clearTimers()
  const msg = steps[k].msg
  if (reduced) { typed.value = msg; phase.value = 'replied'; emit('sent', k); return }
  typed.value = ''
  phase.value = 'typing'
  let i = 0
  tType = setInterval(() => {
    typed.value = msg.slice(0, ++i)
    if (i >= msg.length) {
      clearInterval(tType)
      tSent = setTimeout(() => {           // brief pause, then "send"
        phase.value = 'sent'
        emit('sent', k)                    // board reacts now
        tReply = setTimeout(() => { phase.value = 'replied' }, 650)
      }, 380)
    }
  }, PER_CHAR)
}, { immediate: true })
onBeforeUnmount(clearTimers)
</script>

<template>
  <div class="aside">
    <div class="ptab"><span class="tab on"><span class="dot bot"></span>Assistant</span></div>
    <div class="chat">
      <template v-for="(s, i) in shown" :key="i">
        <div v-if="i < active || phase !== 'typing'" class="umsg" :class="{ live: i === active }"><span>{{ s.msg }}</span></div>
        <div v-if="i < active || phase === 'replied'" class="amsg" :class="{ live: i === active }">
          <span class="bot" v-html="botIcon"></span>
          <p class="areply" v-html="md(s.reply)"></p>
        </div>
      </template>
    </div>
    <div class="composer">
      <div class="cinput">
        <span v-if="phase === 'typing'" class="typed">{{ typed }}<span class="caret"></span></span>
        <span v-else class="ph">Enter a message…</span>
      </div>
      <button class="csend" :class="{ press: phase !== 'typing' }" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg></button>
    </div>
  </div>
</template>

<style scoped>
/* fills the BoardSteps `aside` slot column; aligned with the board's dock panels */
.aside { --ink:#3c3c43; --mut:#67676c; --line:#e6e7eb; --soft:#f4f4f6;
  position: absolute; top: 10px; bottom: 10px; left: 10px; right: 0;
  display: flex; flex-direction: column; min-height: 0;
  border: 1px solid var(--line); border-radius: 10px; overflow: hidden;
  background: #fff; color: var(--ink); font-size: 13.5px; }
.ptab { display: flex; align-items: center; gap: 6px; padding: 8px 10px; border-bottom: 1px solid var(--line); }
.tab { display: inline-flex; align-items: center; gap: 6px; padding: 5px 11px; border-radius: 8px; font-weight: 600; background: #fff; border: 1px solid var(--line); }
.dot { width: 8px; height: 8px; border-radius: 50%; }
.dot.bot { background: var(--vp-c-brand-1); }

.chat { flex: 1; min-height: 0; display: flex; flex-direction: column; justify-content: flex-end; gap: 9px; padding: 12px; overflow: hidden; }
.umsg { display: flex; justify-content: flex-end; }
.umsg span { background: var(--soft); border: 1px solid var(--line); border-radius: 12px 12px 4px 12px; padding: 7px 11px; font-weight: 500; max-width: 86%; }
.amsg { display: flex; gap: 8px; align-items: flex-start; }
.amsg .bot { flex: none; width: 24px; height: 24px; border: 1px solid var(--line); border-radius: 50%; display: grid; place-items: center; }
.amsg .bot svg { width: 15px; height: 15px; }
.areply { margin: 0; padding-top: 3px; line-height: 1.45; min-width: 0; }
.areply :deep(strong) { font-weight: 700; }
.umsg.live, .amsg.live { animation: msgIn .4s ease both; }
@keyframes msgIn { from { opacity: 0; transform: translateY(8px); } }

.composer { display: flex; align-items: center; gap: 8px; padding: 9px 11px; border-top: 1px solid var(--line); }
.cinput { position: relative; flex: 1; border: 1px solid var(--line); border-radius: 20px; padding: 8px 14px; min-height: 18px; line-height: 18px; overflow: hidden; white-space: nowrap; }
.typed { color: var(--ink); }
.ph { color: var(--mut); }
.caret { display: inline-block; width: 1.5px; height: 15px; background: var(--vp-c-brand-1); margin-left: 1px; vertical-align: -2px; animation: caretBlink .8s steps(1) infinite; }
@keyframes caretBlink { 50% { opacity: 0; } }
.csend { flex: none; width: 30px; height: 30px; border-radius: 50%; background: var(--vp-c-brand-1); color: #fff; border: 0; display: grid; place-items: center; transition: transform .18s ease; }
.csend svg { width: 15px; height: 15px; }
.csend.press { animation: sendPress .35s ease; }
@keyframes sendPress { 40% { transform: scale(.88); } }

@media (prefers-reduced-motion: reduce) {
  .umsg.live, .amsg.live, .caret, .csend.press { animation: none; }
}
</style>
