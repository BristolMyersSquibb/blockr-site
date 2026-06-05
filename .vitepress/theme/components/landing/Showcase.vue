<script setup>
// Real apps people have built. Two marquee rows drift in opposite
// directions; pause on hover. Pure CSS animation (cheap, GPU-friendly).
const apps = [
  { img: '/examples/clinical-explorer.jpg', name: 'Clinical Explorer', tag: 'Trial data', link: 'https://blockr.cloud/app/clinical-explorer' },
  { img: '/examples/admiral.jpg', name: 'Admiral SDTM → ADSL', tag: 'CDISC pipeline', link: 'https://blockr.cloud/app/admiral' },
  { img: '/examples/portfolio.jpg', name: 'Portfolio Advisor', tag: 'Finance', link: 'https://blockr.cloud/app/portfolio' },
  { img: '/examples/reinsurance.jpg', name: 'Reinsurance', tag: 'Actuarial', link: 'https://blockr.cloud/app/reinsurance' },
  { img: '/examples/actuarial.jpg', name: 'Actuarial', tag: 'Insurance', link: 'https://blockr.cloud/app/actuarial' },
  { img: '/examples/tidymodels.jpg', name: 'Tidymodels', tag: 'ML', link: 'https://blockr.cloud/app/tidymodels' },
  { img: '/examples/uwr.jpg', name: 'Underwriting', tag: 'Risk', link: 'https://blockr.cloud/app/uwr' },
  { img: '/examples/stats-101.jpg', name: 'Stats 101', tag: 'Teaching', link: 'https://blockr.cloud/app/stats-101' }
]
const half = Math.ceil(apps.length / 2)
const rowA = apps.slice(0, half)
const rowB = apps.slice(half)
</script>

<template>
  <section class="show">
    <div class="lp-container show-head" v-reveal>
      <span class="lp-eyebrow">Built with blockr</span>
      <h2 class="lp-h2">From clinical trials to actuarial models</h2>
      <p class="lp-lead" style="margin-inline:auto;text-align:center">
        Real dashboards, dragged together. Open any one live.
      </p>
    </div>

    <div class="marquee">
      <div class="marquee-track left">
        <a v-for="(a, i) in [...rowA, ...rowA]" :key="'a' + i" class="card" :href="a.link" target="_blank">
          <img :src="a.img" :alt="a.name" loading="lazy" />
          <div class="card-meta">
            <span class="card-name">{{ a.name }}</span>
            <span class="card-tag">{{ a.tag }}</span>
          </div>
        </a>
      </div>
    </div>
    <div class="marquee">
      <div class="marquee-track right">
        <a v-for="(a, i) in [...rowB, ...rowB]" :key="'b' + i" class="card" :href="a.link" target="_blank">
          <img :src="a.img" :alt="a.name" loading="lazy" />
          <div class="card-meta">
            <span class="card-name">{{ a.name }}</span>
            <span class="card-tag">{{ a.tag }}</span>
          </div>
        </a>
      </div>
    </div>

    <div class="lp-container show-cta">
      <a class="lp-btn lp-btn--alt" href="/examples/">See all examples</a>
    </div>
  </section>
</template>

<style scoped>
.show { margin: var(--lp-gap) 0; }
.show-head { text-align: center; margin-bottom: 36px; }
.marquee {
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  padding: 10px 0;
}
.marquee-track {
  display: flex;
  gap: 18px;
  width: max-content;
}
.marquee-track.left { animation: scroll-l 46s linear infinite; }
.marquee-track.right { animation: scroll-r 52s linear infinite; }
.marquee:hover .marquee-track { animation-play-state: paused; }
@keyframes scroll-l {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@keyframes scroll-r {
  from { transform: translateX(-50%); }
  to { transform: translateX(0); }
}
.card {
  flex: none;
  width: 320px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  text-decoration: none !important;
  color: inherit !important;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}
.card:hover {
  transform: translateY(-4px);
  border-color: var(--vp-c-brand-1);
  box-shadow: var(--lp-shadow);
}
.card img {
  width: 100%;
  height: 178px;
  object-fit: cover;
  object-position: top left;
  display: block;
  border-bottom: 1px solid var(--vp-c-divider);
}
.card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px 14px;
}
.card-name { font-weight: 600; font-size: 0.92rem; }
.card-tag {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  padding: 3px 9px;
}
.show-cta { text-align: center; margin-top: 34px; }
@media (prefers-reduced-motion: reduce) {
  .marquee-track.left, .marquee-track.right { animation: none; }
  .marquee {
    overflow-x: auto;
    -webkit-mask-image: none;
    mask-image: none;
  }
}
</style>
