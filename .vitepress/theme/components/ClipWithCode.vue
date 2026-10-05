<script setup>
// A screencast next to the R code it writes. The code is a plain Markdown
// block in the slot. A line ending in `# @name` shows while the video is
// inside the window `windows[name]` (seconds, [from, to]) and is highlighted
// as changed; a line ending in `# @!name` shows outside it. The marker
// comments are removed from the rendered code.
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  windows: { type: Object, required: true }
})
const root = ref(null)
let lines = []
let raf = 0

const MARKER = /\s*#\s*@(!?)([\w-]+)\s*$/

function stripTail(line, n) {
  // remove the last n characters of the line, token by token
  while (n > 0 && line.lastChild) {
    const node = line.lastChild
    const t = node.textContent
    if (t.length <= n) { n -= t.length; node.remove() }
    else { node.textContent = t.slice(0, t.length - n); n = 0 }
  }
}

function sync() {
  // light and dark clips both sit in the slot; follow the one on screen
  const v = [...root.value.querySelectorAll('video')].find((el) => el.offsetParent)
  if (v) {
    const t = v.currentTime
    for (const { el, name, negate } of lines) {
      const [from, to] = props.windows[name] || [Infinity, Infinity]
      const inside = t >= from && t < to
      const show = negate ? !inside : inside
      el.style.display = show ? '' : 'none'
      el.classList.toggle('changed', show && !negate)
    }
  }
  raf = requestAnimationFrame(sync)
}

onMounted(() => {
  root.value.querySelectorAll('pre code').forEach((code) => {
    // drop the newlines between lines so a hidden line leaves no blank row
    code.childNodes.forEach((n) => { if (n.nodeType === 3 && n.textContent === '\n') n.textContent = '' })
    code.querySelectorAll('.line').forEach((el) => {
      const m = el.textContent.match(MARKER)
      if (!m) return
      stripTail(el, m[0].length)
      lines.push({ el, name: m[2], negate: m[1] === '!' })
    })
  })
  raf = requestAnimationFrame(sync)
})
onBeforeUnmount(() => cancelAnimationFrame(raf))
</script>

<template>
  <div ref="root" class="clip-with-code">
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
.clip-with-code pre code .line {
  display: block;
  margin: 0 -24px;
  padding: 0 24px;
}
.clip-with-code pre code .line:empty::after {
  content: '\200b';
}
.clip-with-code pre code .line.changed {
  background-color: var(--vp-code-line-diff-add-color);
}
</style>
