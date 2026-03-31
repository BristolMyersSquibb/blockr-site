<script setup>
import { ShikiMagicMove } from 'shiki-magic-move/vue'
import 'shiki-magic-move/dist/style.css'
import { createHighlighter } from 'shiki'
import { ref, onMounted } from 'vue'

const props = defineProps({
  steps: { type: Array, required: true },
  lang: { type: String, default: 'r' },
  theme: { type: String, default: 'github-light' }
})

const currentStep = ref(0)
const highlighter = ref(null)
const ready = ref(false)

onMounted(async () => {
  highlighter.value = await createHighlighter({
    themes: [props.theme],
    langs: [props.lang]
  })
  ready.value = true
})

function prev() {
  if (currentStep.value > 0) currentStep.value--
}
function next() {
  if (currentStep.value < props.steps.length - 1) currentStep.value++
}
</script>

<template>
  <div class="code-stepper" v-if="ready">
    <div class="code-stepper-header">
      <span class="code-stepper-title">
        <strong>{{ steps[currentStep].label }}</strong>
      </span>
      <div class="code-stepper-controls">
        <button @click="prev" :disabled="currentStep === 0">&larr; Prev</button>
        <span class="code-stepper-indicator">Step {{ currentStep + 1 }} / {{ steps.length }}</span>
        <button @click="next" :disabled="currentStep === steps.length - 1">Next &rarr;</button>
      </div>
    </div>
    <div class="code-stepper-body">
      <ShikiMagicMove
        :highlighter="highlighter"
        :code="steps[currentStep].code"
        :lang="lang"
        :theme="theme"
        :options="{ duration: 500, stagger: 2 }"
      />
    </div>
  </div>
  <div v-else class="code-stepper-loading">Loading code animation...</div>
</template>

<style scoped>
.code-stepper {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  margin: 16px 0;
}

.code-stepper-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 0.85rem;
}

.code-stepper-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.code-stepper-controls button {
  padding: 4px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  cursor: pointer;
  font-size: 0.8rem;
  transition: background 0.2s, border-color 0.2s;
}

.code-stepper-controls button:hover:not(:disabled) {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand);
}

.code-stepper-controls button:disabled {
  opacity: 0.4;
  cursor: default;
}

.code-stepper-indicator {
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-2);
}

.code-stepper-body {
  padding: 16px 20px;
  overflow-x: auto;
  font-size: 0.875rem;
  line-height: 1.6;
}

.code-stepper-loading {
  padding: 24px;
  text-align: center;
  color: var(--vp-c-text-3);
  font-size: 0.85rem;
}
</style>
