<script setup>
// Example dashboards, mirroring the original blockr.site "Try an example"
// section: a static three-up grid of cards (screenshot + title + description),
// each linking to a live demo on blockr.cloud.
const examples = [
  {
    img: '/examples/clinical-explorer.jpg',
    name: 'Clinical Explorer',
    desc: 'AI-enabled exploration of an ADaM trial: demographics, AE, lab, vitals, patient profile.',
    link: 'https://blockr.cloud/app/clinical-explorer'
  },
  {
    img: '/examples/portfolio.jpg',
    name: 'Portfolio Advisor',
    desc: 'Portfolio optimization with investor profiling and dashboard.',
    link: 'https://blockr.cloud/app/portfolio'
  },
  {
    img: '/examples/admiral.jpg',
    name: 'Admiral SDTM → ADSL',
    desc: 'SDTM DM to ADSL derivation pipeline using admiral blocks.',
    link: 'https://blockr.cloud/app/admiral'
  }
]
</script>

<template>
  <section class="show lp-container">
    <div class="show-head" v-reveal>
      <span class="lp-eyebrow">Built with blockr</span>
      <h2 class="lp-h2">Try an example</h2>
      <p class="lp-lead" style="margin-inline:auto;text-align:center">
        Open a demo workflow on blockr.cloud, no install needed.
      </p>
    </div>

    <div class="show-grid">
      <a
        v-for="(e, i) in examples"
        :key="e.name"
        class="ex-card"
        :href="e.link"
        target="_blank"
        v-reveal="{ delay: i * 100 }"
      >
        <div class="ex-shot"><img :src="e.img" :alt="e.name" loading="lazy" /></div>
        <div class="ex-body">
          <h3 class="ex-name">{{ e.name }}</h3>
          <p class="ex-desc">{{ e.desc }}</p>
        </div>
      </a>
    </div>

    <div class="show-cta">
      <a class="lp-btn lp-btn--alt" href="/examples/">All examples →</a>
    </div>
  </section>
</template>

<style scoped>
.show { margin: var(--lp-gap) auto; }
.show-head { text-align: center; max-width: 680px; margin: 0 auto 40px; }

.show-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
@media (min-width: 760px) { .show-grid { grid-template-columns: repeat(3, 1fr); } }

.ex-card {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  text-decoration: none !important;
  color: inherit !important;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}
.ex-card:hover {
  transform: translateY(-4px);
  border-color: var(--vp-c-brand-1);
  box-shadow: var(--lp-shadow);
}
.ex-shot {
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}
.ex-shot img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top left;
  display: block;
}
.ex-body { padding: 16px 18px 20px; }
.ex-name {
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin: 0 0 6px;
  border: 0;
  padding: 0;
}
.ex-desc {
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  margin: 0;
}

.show-cta { text-align: center; margin-top: 34px; }
</style>
