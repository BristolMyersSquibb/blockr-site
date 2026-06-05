<script setup>
// No magic: a board is real R. Left = the blocks, right = the code they
// export. Code is hand-tokenised so it renders identically under SSR with
// no highlighter dependency.
const blocks = [
  { color: '#0072b2', label: 'Dataset', detail: 'palmerpenguins' },
  { color: '#009e73', label: 'Filter', detail: 'species == "Adelie"' },
  { color: '#e69f00', label: 'Plot', detail: 'bill length × body mass' }
]
</script>

<template>
  <section class="code lp-container">
    <div class="code-head" v-reveal>
      <span class="lp-eyebrow">No lock-in</span>
      <h2 class="lp-h2">Every board is real, reproducible R</h2>
      <p class="lp-lead" style="margin-inline:auto;text-align:center">
        Drag blocks, get idiomatic R you can read, version, and run.
      </p>
    </div>

    <div class="code-grid">
      <div class="blocks" v-reveal>
        <template v-for="(b, i) in blocks" :key="b.label">
          <div class="block" :style="{ '--c': b.color }">
            <span class="block-dot"></span>
            <span class="block-text">
              <strong>{{ b.label }}</strong>
              <small>{{ b.detail }}</small>
            </span>
          </div>
          <div v-if="i < blocks.length - 1" class="wire" aria-hidden="true">
            <svg width="20" height="28" viewBox="0 0 20 28" fill="none"><path d="M10 0v20m0 0-5-5m5 5 5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
        </template>
      </div>

      <div class="arrow" aria-hidden="true">
        <svg width="40" height="24" viewBox="0 0 40 24" fill="none"><path d="M2 12h34m0 0-8-8m8 8-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>

      <div class="code-card" v-reveal>
        <div class="code-bar"><span></span><span></span><span></span><em>pipeline.R</em></div>
        <pre><code><span class="line"><span class="k">library</span>(palmerpenguins)</span><span class="line"></span><span class="line">penguins <span class="o">|></span></span><span class="line">  <span class="k">filter</span>(species <span class="o">==</span> <span class="s">"Adelie"</span>) <span class="o">|></span></span><span class="line">  <span class="k">ggplot</span>(<span class="k">aes</span>(bill_length_mm, body_mass_g)) <span class="o">+</span></span><span class="line">  <span class="k">geom_point</span>()</span></code></pre>
      </div>
    </div>
  </section>
</template>

<style scoped>
.code { margin: var(--lp-gap) auto; }
.code-head { text-align: center; margin-bottom: 40px; }
.code-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  align-items: center;
}
@media (min-width: 900px) {
  .code-grid { grid-template-columns: 0.7fr auto 1.3fr; gap: 28px; }
}
.blocks { display: flex; flex-direction: column; align-items: center; gap: 6px; }
.block {
  width: 100%;
  max-width: 320px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-left: 4px solid var(--c);
  box-shadow: 0 6px 18px -10px rgba(0, 0, 0, 0.25);
}
.block-dot {
  width: 10px; height: 10px; border-radius: 50%;
  background: var(--c); flex: none;
}
.block-text { display: flex; flex-direction: column; }
.block-text strong { font-size: 0.95rem; }
.block-text small { color: var(--vp-c-text-2); font-size: 0.8rem; font-family: var(--vp-font-family-mono); }
.wire { color: var(--vp-c-text-3); line-height: 0; }
.arrow { display: none; color: var(--vp-c-brand-1); justify-self: center; }
@media (min-width: 900px) { .arrow { display: block; } }

.code-card {
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  box-shadow: var(--lp-shadow);
  background: #1b1b1f;
}
.code-bar {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 11px 14px;
  background: #2a2a32;
}
.code-bar span { width: 11px; height: 11px; border-radius: 50%; background: #4a4a55; }
.code-bar em {
  margin-left: auto;
  font-style: normal;
  font-size: 0.78rem;
  color: #9a9aa8;
  font-family: var(--vp-font-family-mono);
}
.code-card pre {
  margin: 0;
  padding: 20px 22px;
  overflow-x: auto;
}
.code-card code {
  display: block;
  font-family: var(--vp-font-family-mono);
  font-size: 0.92rem;
  line-height: 1.7;
  color: #d6d6df;
}
.line { display: block; min-height: 1.7em; }
.k { color: #82aaff; }
.s { color: #c3e88d; }
.o { color: #f78c6c; }

/* staggered line reveal once the card scrolls in */
.code-card .line { opacity: 0; transform: translateX(8px); }
.code-card.is-visible .line {
  animation: lineIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
}
.code-card.is-visible .line:nth-child(1) { animation-delay: 0.05s; }
.code-card.is-visible .line:nth-child(2) { animation-delay: 0.12s; }
.code-card.is-visible .line:nth-child(3) { animation-delay: 0.19s; }
.code-card.is-visible .line:nth-child(4) { animation-delay: 0.26s; }
.code-card.is-visible .line:nth-child(5) { animation-delay: 0.33s; }
.code-card.is-visible .line:nth-child(6) { animation-delay: 0.40s; }
@keyframes lineIn {
  to { opacity: 1; transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .code-card .line { opacity: 1; transform: none; animation: none; }
}
</style>
