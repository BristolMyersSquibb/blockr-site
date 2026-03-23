---
layout: home

hero:
  name: blockr
  text: A visual, no-code framework for R
  tagline: Drag analysis steps into interactive dashboards
  image:
    light: /hero-workflow.png
    dark: /hero-workflow-dark.png
    alt: A blockr DAG workflow
  actions:
    - theme: brand
      text: Get Started
      link: /learn/01-build-your-first-app
    - theme: alt
      text: Try Online
      link: https://blockr.cloud/app/empty

features:
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><rect width="48" height="48" rx="7" fill="#0072B24D"/><line x1="30" y1="32" x2="30" y2="24" stroke="#0072B2" stroke-width="1.5" stroke-linecap="round"/><line x1="24" y1="32" x2="24" y2="16" stroke="#0072B2" stroke-width="1.5" stroke-linecap="round"/><line x1="18" y1="32" x2="18" y2="28" stroke="#0072B2" stroke-width="1.5" stroke-linecap="round"/></svg>'
    title: For Analysts
    details: Explore and transform data visually, no coding needed. Point, click, and see results instantly.
    link: /learn/01-build-your-first-app
    linkText: Build your first app
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><rect width="48" height="48" rx="7" fill="#009E734D"/><polyline points="28 30 34 24 28 18" fill="none" stroke="#009E73" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><polyline points="20 18 14 24 20 30" fill="none" stroke="#009E73" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    title: For R Developers
    details: Create custom blocks with a coding agent. Describe what you want, get a working block in minutes.
    link: /learn/03-create-a-block
    linkText: Create a block
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><rect width="48" height="48" rx="7" fill="#E69F004D"/><path d="M29 33v-2a4 4 0 0 0-4-4H17a4 4 0 0 0-4 4v2" fill="none" stroke="#E69F00" stroke-width="1.5" stroke-linecap="round"/><circle cx="21" cy="19" r="4" fill="none" stroke="#E69F00" stroke-width="1.5"/><path d="M35 33v-2a4 4 0 0 0-3-3.87" fill="none" stroke="#E69F00" stroke-width="1.5" stroke-linecap="round"/><path d="M28 15.13a4 4 0 0 1 0 7.75" fill="none" stroke="#E69F00" stroke-width="1.5" stroke-linecap="round"/></svg>'
    title: For Teams
    details: Share reproducible workflows across skill levels. Export pipelines as idiomatic R code anyone can run.
    link: /examples/
    linkText: Browse examples
---

<style>
.VPFeature .icon {
  background-color: transparent !important;
}
.VPFeature .icon svg {
  width: 48px;
  height: 48px;
}
.VPHero .main .text {
  line-height: 1.3;
}
.VPHero .main .tagline {
  margin-bottom: 32px;
}
.VPHero .main .actions {
  margin-top: 16px;
}
.VPHero {
  padding-top: 120px !important;
  padding-bottom: 76px !important;
}
@media (min-width: 960px) {
  .VPHero .image-container {
    margin: 0 0 0 auto !important;
    transform: translate(0, -32px) !important;
  }
}
.video-section {
  max-width: 800px;
  margin: 0 auto;
  padding: 48px 24px;
  text-align: center;
}
.video-section h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 8px;
}
.video-section > p {
  color: var(--vp-c-text-2);
  margin-bottom: 24px;
}
.examples-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px 80px;
}
.examples-section h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 8px;
  text-align: center;
}
.examples-section > p {
  color: var(--vp-c-text-2);
  text-align: center;
  margin-bottom: 24px;
}
.examples-row {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}
.example-preview {
  display: block;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  text-decoration: none !important;
  color: inherit !important;
  transition: border-color 0.25s;
}
.example-preview:hover {
  border-color: var(--vp-c-brand-1);
}
.example-preview img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  object-position: top left;
  display: block;
  border-bottom: 1px solid var(--vp-c-divider);
}
.example-preview .ep-body {
  padding: 12px 14px;
}
.example-preview .ep-title {
  font-weight: 600;
  font-size: 0.95em;
  margin: 0 0 4px;
}
.example-preview .ep-desc {
  color: var(--vp-c-text-2);
  font-size: 0.85em;
  margin: 0;
}
</style>

<div class="video-section">
  <h2>See it in action</h2>
  <p>A 90-second tour of blockr</p>
  <VideoEmbed id="_j0dOkGrkew" title="blockr quick tour" />
  <p style="margin-top:16px"><a href="/videos/getting-started">More videos →</a></p>
</div>

<div class="examples-section">
  <h2>Try an example</h2>
  <p>Open a demo workflow on blockr.cloud, no install needed</p>
  <div class="examples-row">
    <a class="example-preview" href="https://blockr.cloud/app/insurance" target="_blank">
      <img src="/examples/insurance.png" alt="Insurance Portfolio" />
      <div class="ep-body">
        <p class="ep-title">Insurance Portfolio</p>
        <p class="ep-desc">Star schema data with dm-based crossfilter for insurance portfolio analysis.</p>
      </div>
    </a>
    <a class="example-preview" href="https://blockr.cloud/app/adam" target="_blank">
      <img src="/examples/adam.png" alt="ADaM Crossfilter" />
      <div class="ep-body">
        <p class="ep-title">ADaM Crossfilter</p>
        <p class="ep-desc">Explore CDISC ADaM clinical trial data with dynamic crossfiltering.</p>
      </div>
    </a>
    <a class="example-preview" href="https://blockr.cloud/app/tidymodels" target="_blank">
      <img src="/examples/tidymodels.png" alt="Tidymodels ML" />
      <div class="ep-body">
        <p class="ep-title">Tidymodels ML</p>
        <p class="ep-desc">Machine learning workflows with tidymodels.</p>
      </div>
    </a>
  </div>
  <p style="text-align:center;margin-top:16px"><a href="/examples/">All examples →</a></p>
</div>
