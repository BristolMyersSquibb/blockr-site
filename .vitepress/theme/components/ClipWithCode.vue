<script setup>
// A screencast next to the R code it writes. The code is a plain Markdown
// block in the slot; lines marked `# [!code ++]` show while the video is
// between `from` and `to` seconds, lines marked `# [!code --]` show outside.
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  from: { type: Number, required: true },
  to: { type: Number, required: true }
})
const root = ref(null)
const added = ref(false)
let raf = 0

function sync() {
  // light and dark clips both sit in the slot; follow the one on screen
  const v = [...root.value.querySelectorAll('video')].find((el) => el.offsetParent)
  if (v) added.value = v.currentTime >= props.from && v.currentTime < props.to
  raf = requestAnimationFrame(sync)
}
onMounted(() => {
  // drop the newlines between lines so a hidden line leaves no blank row
  root.value.querySelectorAll('pre code').forEach((code) => {
    code.childNodes.forEach((n) => { if (n.nodeType === 3 && n.textContent === '\n') n.textContent = '' })
  })
  raf = requestAnimationFrame(sync)
})
onBeforeUnmount(() => cancelAnimationFrame(raf))
</script>

<template>
  <div ref="root" class="clip-with-code" :class="{ added }">
    <slot />
  </div>
</template>

<style>
.clip-with-code {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 24px;
  align-items: center;
  margin: 24px 0 16px;
}
@media (max-width: 767px) {
  .clip-with-code { grid-template-columns: 1fr; }
}
.clip-with-code video {
  display: block;
  width: 100%;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
}
.clip-with-code .clip-dark,
.dark .clip-with-code .clip-light {
  display: none;
}
.dark .clip-with-code .clip-dark {
  display: block;
}
.clip-with-code div[class*='language-'] {
  margin: 0 !important;
}
/* VitePress makes diff lines inline-block; one line per row instead */
.clip-with-code pre code .line {
  display: block !important;
}
.clip-with-code pre code .line:empty::after {
  content: '\200b';
}
/* a `--` line is the normal state, not a removal */
.clip-with-code pre code .line.diff.remove {
  background: transparent;
  opacity: 1;
}
.clip-with-code pre code .line.diff.remove::before {
  content: none;
}
.clip-with-code:not(.added) pre code .line.diff.add,
.clip-with-code.added pre code .line.diff.remove {
  display: none !important;
}
</style>
