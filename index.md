---
layout: home

hero:
  name: blockr
  text: A visual, no-code framework for R
  tagline: Drag analysis steps into interactive dashboards
  actions:
    - theme: brand
      text: Try it in the browser
      link: https://blockr.cloud/app/empty
    - theme: alt
      text: Get started
      link: /learn/01-build-your-first-app

demo:
  src: /videos/hero-build
  poster: /videos/hero-build-poster.jpg
  dark:
    src: /videos/hero-build-dark
    poster: /videos/hero-build-dark-poster.jpg
    times: [0, 4.8, 10.0, 22.5, 27.1]
  alt: "Building a blockr board: add a dataset, filter it, plot it, change the filter, then show the R code the board wrote"
  chapters:
    - { t: 0, title: "Add data", text: "Pick a dataset" }
    - { t: 4.8, title: "Filter", text: "Append a block from the one above" }
    - { t: 10.0, title: "Plot", text: "Choose the columns" }
    - { t: 22.6, title: "Change it", text: "Edit the filter, the chart follows" }
    - { t: 27.2, title: "Get the R code", text: "Show code gives the whole script" }

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
</style>

## Clinical trial data, in blocks

blockr is developed by cynkra and Bristol Myers Squibb and used on clinical trial data. The demos open on blockr.cloud, with no install or account.

<a class="example-card usecase-feature" href="https://blockr.cloud/app/clinical-explorer" target="_blank">
  <img src="/examples/clinical-explorer.jpg" alt="Clinical Explorer" />
  <div class="example-body">
    <span class="usecase-label">Pharma</span>
    <p class="example-title">Clinical Explorer</p>
    <p class="example-desc">Explore an ADaM trial: demographics, adverse events, labs, vitals and patient profiles, with an AI assistant on the board.</p>
    <span class="example-link">Open the demo →</span>
  </div>
</a>

<p class="usecase-also">Also used for</p>

<div class="usecase-minis">
  <a class="usecase-mini" href="https://blockr.cloud/app/treaty-pricer" target="_blank">
    <img src="/examples/treaty-pricer.jpg" alt="" />
    <span class="usecase-mini-body">
      <span class="usecase-label">Insurance</span>
      <span class="usecase-mini-title">Treaty Pricer</span>
      <span class="usecase-mini-desc">Reinsurance pricing from an editable treaty tower.</span>
    </span>
  </a>
  <a class="usecase-mini" href="https://blockr.cloud/app/ch-gdp-season" target="_blank">
    <img src="/examples/ch-gdp-season.jpg" alt="" />
    <span class="usecase-mini-body">
      <span class="usecase-label">Public sector</span>
      <span class="usecase-mini-title">Seasonal adjustment of GDP</span>
      <span class="usecase-mini-desc">X-13ARIMA-SEATS on official statistics.</span>
    </span>
  </a>
</div>

[More pharma examples](/examples/#pharma) · [All examples](/examples/) · [blockr for organisations](/organisations)

## Install

```r
# install.packages("pak")
pak::pak("BristolMyersSquibb/blockr@dev")
blockr::run_app()
```

R 4.5 or later. Details and the assistant: [Install](/install).

<div class="intro-band">
  <p>Bring a real problem and we build it with you in blockr, in two free 30-minute sessions.</p>
  <a class="intro-band-btn" href="/intro">Book a free intro</a>
</div>
