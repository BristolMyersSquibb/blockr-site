<script setup>
// Demo loop under the home hero, with clickable chapters. Configured by the
// `demo:` key in the page frontmatter; renders nothing without it. `demo` is
// one clip, or `demo.tabs` a list of clips shown as tabs above the player.
// A clip's `dark` holds the dark-mode recording (src, poster, and `times`,
// the chapter starts in that recording when they differ from the light one).
// A tab with an `id` opens from a link to `#<id>`.
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useData } from 'vitepress'

const { frontmatter, isDark } = useData()
const tabs = computed(() => {
  const d = frontmatter.value.demo
  return d ? (d.tabs || [d]) : []
})
const tab = ref(0)
const demo = computed(() => tabs.value[tab.value])
// The server renders the light clip. Switching only after mount makes the
// dark clip replace it; during hydration Vue would keep the server's <source>.
const mounted = ref(false)
const clip = computed(() => demo.value && ((mounted.value && isDark.value && demo.value.dark) || demo.value))
const dark = computed(() => clip.value && clip.value === demo.value.dark)
const times = computed(() => (dark.value && demo.value.dark.times) || demo.value.chapters.map((c) => c.t))
const video = ref(null)
const active = ref(0)
let raf = 0

function sync() {
  const v = video.value
  if (v && demo.value) {
    let i = 0
    times.value.forEach((t, k) => { if (v.currentTime >= t) i = k })
    active.value = i
  }
  raf = requestAnimationFrame(sync)
}
function seek(i) {
  video.value.currentTime = times.value[i] + 0.05
  video.value.play()
}
function select(i) {
  tab.value = i
  active.value = 0
}
// a click on a tab keeps the address in step, so a reload opens the same tab
function choose(i) {
  select(i)
  const id = tabs.value[i].id
  history.replaceState(history.state, '', id ? `#${id}` : location.pathname + location.search)
}
function fromHash() {
  const i = tabs.value.findIndex((t) => t.id && location.hash === `#${t.id}`)
  if (i >= 0) select(i)
}
onMounted(() => {
  mounted.value = true
  fromHash()
  window.addEventListener('hashchange', fromHash)
  raf = requestAnimationFrame(sync)
})
onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('hashchange', fromHash)
})
</script>

<template>
  <div v-if="demo" class="demo">
    <div v-if="tabs.length > 1" class="demo-tabs" role="tablist">
      <button
        v-for="(t, i) in tabs"
        :id="t.id"
        :key="t.label"
        role="tab"
        :aria-selected="i === tab"
        :class="{ on: i === tab }"
        @click="choose(i)"
      >
        {{ t.label }}<span v-if="t.sub" class="sub">{{ t.sub }}</span>
      </button>
      <a v-if="demo.more" class="more" :href="demo.more.link">{{ demo.more.text }} →</a>
    </div>
    <div class="demo-player">
      <video ref="video" :key="clip.src" autoplay muted loop playsinline :poster="clip.poster" :aria-label="demo.alt">
        <source :src="`${clip.src}.webm`" type="video/webm" />
        <source :src="`${clip.src}.mp4`" type="video/mp4" />
      </video>
      <ol class="chapters">
        <li v-for="(c, i) in demo.chapters" :key="c.t" :class="{ on: i === active }" @click="seek(i)">
          <span class="title">{{ c.title }}</span>
          <span class="text">{{ c.text }}</span>
        </li>
      </ol>
    </div>
  </div>
</template>

<style scoped>
.demo {
  max-width: 1152px;
  margin: 0 auto 64px;
}
.demo-player {
  display: grid;
  grid-template-columns: 1fr 240px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
  background: var(--vp-c-bg-soft);
}
.demo-tabs {
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 0 0 12px;
}
.demo-tabs button {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  padding: 7px 16px;
  border-radius: 8px;
  border: 1px solid transparent;
  transition: color 0.2s, background-color 0.2s;
  scroll-margin-top: calc(var(--vp-nav-height) + 24px);
}
.demo-tabs button:hover { color: var(--vp-c-text-1); }
.demo-tabs button.on {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-divider);
}
.demo-tabs .sub {
  font-weight: 400;
  color: var(--vp-c-text-3);
  margin-left: 6px;
}
.demo-tabs .more {
  margin-left: auto;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  text-decoration: none;
}
.demo-tabs .more:hover { text-decoration: underline; }
@media (max-width: 959px) {
  .demo { margin: 0 24px 48px; }
  .demo-player { grid-template-columns: 1fr; }
  .chapters { display: none; }
  .demo-tabs .sub, .demo-tabs .more { display: none; }
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
