<script setup>
// Three ways to use blockr, from the framework's own framing (USE / BUILD /
// EXTEND). Card-less per the brand guide: unDraw illustrations + Inter text +
// whitespace, no frames. Illustrations are the same ones used in the deck.
const roles = [
  {
    key: 'user',
    badge: 'Use',
    role: 'User',
    img: '/illustrations/undraw_data_report.svg',
    tagline: 'Open a board, filter, explore. No R needed.',
    points: [
      ['In the browser:', 'nothing to install, just open the link.'],
      ['Interact:', 'filter, drill down, read results live.'],
      ['Consume:', 'use a dashboard someone shared with you.']
    ],
    cta: { text: 'Try an example', link: '/examples/' }
  },
  {
    key: 'builder',
    badge: 'Build',
    role: 'Builder',
    img: '/illustrations/undraw_automation.svg',
    tagline: 'Pick blocks, draw links, save and share. Still no R needed.',
    points: [
      ['Assemble:', 'drag blocks onto the canvas and draw links.'],
      ['Arrange:', 'lay out panels, then save and restore.'],
      ['Or prompt:', 'let blockr.assistant build it for you.']
    ],
    cta: { text: 'Build your first app', link: '/learn/01-build-your-first-app' }
  },
  {
    key: 'developer',
    badge: 'Extend',
    role: 'Developer',
    img: '/illustrations/undraw_web_development.svg',
    tagline: 'Write custom blocks for your own data and tasks.',
    points: [
      ['Just Shiny:', 'a block is a module doing one task.'],
      ['Wrap anything:', 'any R code, package or API.'],
      ['With AI:', 'an LLM gets you most of the way there.']
    ],
    cta: { text: 'Create a block', link: '/learn/03-create-a-block' }
  }
]
</script>

<template>
  <section class="ways lp-container">
    <div class="ways-head" v-reveal>
      <span class="lp-eyebrow">One framework</span>
      <h2 class="lp-h2">Three ways to use blockr</h2>
      <p class="lp-lead" style="margin-inline:auto;text-align:center">
        One board. Use it, build it, or extend it.
      </p>
    </div>

    <div class="ways-grid">
      <div
        v-for="(r, i) in roles"
        :key="r.key"
        class="way"
        v-reveal="{ delay: i * 100 }"
      >
        <div class="way-art">
          <img :src="r.img" :alt="r.role" loading="lazy" />
        </div>
        <span class="way-badge">{{ r.badge }}</span>
        <h3 class="way-role">{{ r.role }}</h3>
        <p class="way-tag">{{ r.tagline }}</p>
        <a class="way-link" :href="r.cta.link">
          {{ r.cta.text }}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ways { margin: var(--lp-gap) auto; }
.ways-head { text-align: center; margin-bottom: 56px; }
.ways-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 56px 40px;
}
@media (min-width: 760px) {
  .ways-grid { grid-template-columns: repeat(3, 1fr); }
}
.way {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 28px 26px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg-soft);
  transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
}
.way:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-4px);
  box-shadow: var(--lp-shadow);
}
.way-art {
  width: 100%;
  height: 132px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
}
.way-art img {
  max-height: 150px;
  max-width: 78%;
  width: auto;
}
.way-badge {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--vp-c-brand-1);
  margin-bottom: 6px;
}
.way-role {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0 0 8px;
  border: 0;
  padding: 0;
}
.way-tag {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 16px;
  line-height: 1.45;
}
.way-points { list-style: none; padding: 0; margin: 0 0 18px; }
.way-points li {
  padding: 5px 0;
  font-size: 0.92rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}
.way-points li strong { color: var(--vp-c-text-1); font-weight: 600; }
.way-link {
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  color: var(--vp-c-brand-1);
}
.way-link:hover { gap: 9px; }
</style>
