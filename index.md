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
    link: /learn/05-create-a-block
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
  max-width: 1000px;
  margin: 0 auto;
  padding: 48px 24px;
  text-align: center;
}
.demo-loop {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 10;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
  background: var(--vp-c-bg-soft);
}
.video-links a {
  margin: 0 12px;
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
</style>

<div class="video-section">
  <h2>See it in action</h2>
  <p>Build a board in under a minute</p>
  <video class="demo-loop" autoplay muted loop playsinline poster="/videos/landing-build-poster.jpg"
         aria-label="Building a blockr board: add a dataset, filter it, plot it, change the filter, get the R code">
    <source src="/videos/landing-build.webm" type="video/webm" />
    <source src="/videos/landing-build.mp4" type="video/mp4" />
  </video>
  <p class="video-links" style="margin-top:16px"><a href="/learn/01-build-your-first-app">Build it yourself →</a></p>
</div>

<div class="examples-section">
  <h2>Try an example</h2>
  <p>Open a demo workflow on blockr.cloud, no install needed</p>
  <div class="examples-grid examples-row">
    <a class="example-card" href="https://blockr.cloud/app/clinical-explorer" target="_blank">
      <img src="/examples/clinical-explorer.jpg" alt="Clinical Explorer" />
      <div class="example-body">
        <p class="example-title">Clinical Explorer</p>
        <p class="example-desc">AI-enabled exploration of an ADaM trial: demographics, AE, lab, vitals, patient profile.</p>
        <span class="example-link">Open in Playground →</span>
      </div>
    </a>
    <a class="example-card" href="https://blockr.cloud/app/treaty-pricer" target="_blank">
      <img src="/examples/treaty-pricer.jpg" alt="Treaty Pricer" />
      <div class="example-body">
        <p class="example-title">Treaty Pricer</p>
        <p class="example-desc">Reinsurance pricing: an editable treaty tower drives the loss simulation and premium.</p>
        <span class="example-link">Open in Playground →</span>
      </div>
    </a>
    <a class="example-card" href="https://blockr.cloud/app/aedes-ivm" target="_blank">
      <img src="/examples/aedes-ivm.jpg" alt="Does mosquito control work?" />
      <div class="example-body">
        <p class="example-title">Does mosquito control work?</p>
        <p class="example-desc">Refits a published mosquito-control study. The Quarto report comes out of the same board.</p>
        <span class="example-link">Open in Playground →</span>
      </div>
    </a>
  </div>
  <p style="text-align:center;margin-top:16px"><a href="/examples/">All examples →</a></p>
</div>
