<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue'

const { isDark } = useData()
const e4 = computed(() => (isDark.value ? '/logos/logo-e4-dark.svg' : '/logos/logo-e4-light.svg'))
</script>

<template>
  <section class="cta">
    <div class="cta-glow" aria-hidden="true"></div>
    <div class="lp-container cta-inner" v-reveal>
      <img :src="e4" class="cta-logo" alt="blockr" />
      <h2 class="cta-title">Start building in your browser</h2>
      <p class="cta-sub">
        No install, no signup. Drag your first block.
      </p>
      <div class="cta-actions">
        <a class="lp-btn lp-btn--brand" href="https://blockr.cloud/app/empty" target="_blank">Try online</a>
        <a class="lp-btn lp-btn--alt" href="/install">Install the R package</a>
        <a class="lp-btn lp-btn--alt" href="/learn/01-build-your-first-app">Get started</a>
      </div>

      <div class="cta-trust">
        <span class="cta-os">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38v-1.34c-2.23.48-2.7-1.07-2.7-1.07-.36-.93-.89-1.18-.89-1.18-.73-.5.05-.49.05-.49.8.06 1.23.83 1.23.83.72 1.23 1.88.88 2.34.67.07-.52.28-.88.5-1.08-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.83-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.22 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.52.56.83 1.28.83 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 8 0Z"/></svg>
          Open source · GPL-3.0
        </span>
        <a class="cta-gh" href="https://github.com/BristolMyersSquibb/blockr" target="_blank">Source on GitHub →</a>
      </div>

      <div class="cta-by">
        <span>Built by</span>
        <a href="https://cynkra.com" target="_blank"><img src="/logos/logo-cynkra.png" alt="cynkra" /></a>
        <span>&amp;</span>
        <a href="https://www.bms.com" target="_blank"><img src="/logos/logo-bms.png" alt="BMS" class="bms" /></a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  position: relative;
  margin-top: var(--lp-gap);
  padding: clamp(64px, 10vw, 120px) 0 clamp(48px, 7vw, 88px);
  border-top: 1px solid var(--vp-c-divider);
  overflow: hidden;
  text-align: center;
}
.cta-glow {
  position: absolute;
  inset: -40% 0 auto 0;
  height: 80%;
  background: radial-gradient(50% 60% at 50% 0%, color-mix(in srgb, var(--vp-c-brand-1) 18%, transparent), transparent 70%);
  pointer-events: none;
}
.cta-inner { position: relative; }
.cta-logo { height: 44px; width: auto; margin: 0 auto 22px; }
.cta-title {
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 800;
  letter-spacing: -0.025em;
  line-height: 1.1;
  margin: 0 0 14px;
}
.cta-sub { color: var(--vp-c-text-2); font-size: 1.08rem; margin: 0 0 28px; }
.cta-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 13px;
  margin-bottom: 30px;
}
.cta-trust {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 18px;
  font-size: 0.88rem;
  color: var(--vp-c-text-2);
  margin-bottom: 34px;
}
.cta-os { display: inline-flex; align-items: center; gap: 7px; }
.cta-gh { font-weight: 600; text-decoration: none; }
.cta-by {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  padding: 12px 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 30px;
}
.cta-by img { height: 26px; vertical-align: middle; }
.cta-by img.bms { height: 20px; }
</style>
