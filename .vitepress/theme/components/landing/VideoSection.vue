<script setup>
import { ref } from 'vue'
import { useInView } from './motion.js'

const wrap = ref(null)
const { inView } = useInView(wrap)
</script>

<template>
  <section class="vid lp-container" ref="wrap">
    <div class="vid-head" v-reveal>
      <span class="lp-eyebrow">See it in action</span>
      <h2 class="lp-h2">A 90-second tour</h2>
    </div>
    <div class="vid-frame" v-reveal>
      <VideoEmbed v-if="inView" id="_j0dOkGrkew" title="What is blockr?" />
      <div v-else class="vid-skeleton" aria-hidden="true"></div>
    </div>
    <p class="vid-more"><a href="/videos/getting-started">More videos →</a></p>
  </section>
</template>

<style scoped>
.vid { margin: var(--lp-gap) auto; max-width: 880px; }
.vid-head { text-align: center; margin-bottom: 26px; }
.vid-frame { border-radius: 12px; }
.vid-skeleton {
  width: 100%;
  padding-bottom: 56.25%;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
}
.vid-more { text-align: center; margin-top: 18px; }
.vid-more a { font-weight: 600; text-decoration: none; }
</style>
