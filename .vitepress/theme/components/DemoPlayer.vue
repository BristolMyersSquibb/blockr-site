<script setup>
// Demo loop under the home hero, with clickable chapters. Configured by the
// `demo:` key in the page frontmatter; renders nothing without it. `demo.dark`
// holds the dark-mode recording (src, poster); the chapters are shared.
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useData } from 'vitepress'

const { frontmatter, isDark } = useData()
const demo = computed(() => frontmatter.value.demo)
// The server renders the light clip. Switching only after mount makes the
// dark clip replace it; during hydration Vue would keep the server's <source>.
const mounted = ref(false)
const clip = computed(() => demo.value && ((mounted.value && isDark.value && demo.value.dark) || demo.value))
const video = ref(null)
const active = ref(0)
let raf = 0

function sync() {
  const v = video.value
  if (v && demo.value) {
    let i = 0
    demo.value.chapters.forEach((c, k) => { if (v.currentTime >= c.t) i = k })
    active.value = i
  }
  raf = requestAnimationFrame(sync)
}
function seek(c) {
  video.value.currentTime = c.t + 0.05
  video.value.play()
}
onMounted(() => {
  mounted.value = true
  raf = requestAnimationFrame(sync)
})
onBeforeUnmount(() => cancelAnimationFrame(raf))
</script>

<template>
  <div v-if="demo" class="demo-player">
    <video ref="video" :key="clip.src" autoplay muted loop playsinline :poster="clip.poster" :aria-label="demo.alt">
      <source :src="`${clip.src}.webm`" type="video/webm" />
      <source :src="`${clip.src}.mp4`" type="video/mp4" />
    </video>
    <ol class="chapters">
      <li v-for="(c, i) in demo.chapters" :key="c.t" :class="{ on: i === active }" @click="seek(c)">
        <span class="title">{{ c.title }}</span>
        <span class="text">{{ c.text }}</span>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.demo-player {
  display: grid;
  grid-template-columns: 1fr 240px;
  max-width: 1152px;
  margin: 0 auto 64px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
  background: var(--vp-c-bg-soft);
}
@media (max-width: 959px) {
  .demo-player { grid-template-columns: 1fr; margin: 0 24px 48px; }
  .chapters { display: none; }
}
video { display: block; width: 100%; }
.chapters {
  list-style: none;
  margin: 0;
  padding: 12px 0;
  border-left: 1px solid var(--vp-c-divider);
  counter-reset: ch;
}
.chapters li {
  counter-increment: ch;
  padding: 10px 18px;
  border-left: 3px solid transparent;
  cursor: pointer;
  font-size: 14px;
  line-height: 1.4;
}
.chapters li .title::before { content: counter(ch) ". "; }
.chapters li .title { display: block; font-weight: 500; color: var(--vp-c-text-1); }
.chapters li .text { display: block; font-size: 13px; color: var(--vp-c-text-2); }
.chapters li.on { border-left-color: var(--vp-c-brand-1); background: var(--vp-c-bg); }
.chapters li.on .title { font-weight: 600; }
</style>
