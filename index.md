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
  alt: "Building a blockr board: add a dataset, filter it, plot it, arrange the panels, change the filter"
  chapters:
    - { t: 0, title: "Add data", text: "Pick a dataset" }
    - { t: 5.0, title: "Filter", text: "Append a block from the one above" }
    - { t: 11.4, title: "Plot", text: "Choose the columns" }
    - { t: 22.0, title: "Arrange", text: "Drag panels into place" }
    - { t: 24.5, title: "Change it", text: "Edit the filter, the chart follows" }

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

## Every click writes R

Each block adds a step of R code to the board. The Report tab gives you the whole script: run it without blockr, review it, or hand it to someone who codes.

<ClipWithCode :from="2.8" :to="7.9">
<div>
<video class="clip-light" autoplay muted loop playsinline poster="/videos/hero-filter-poster.jpg" aria-label="Adding Chinstrap to the filter; the chart gains the green points">
  <source src="/videos/hero-filter.webm" type="video/webm" />
  <source src="/videos/hero-filter.mp4" type="video/mp4" />
</video>
<video class="clip-dark" autoplay muted loop playsinline poster="/videos/hero-filter-dark-poster.jpg" aria-label="Adding Chinstrap to the filter; the chart gains the green points">
  <source src="/videos/hero-filter-dark.webm" type="video/webm" />
  <source src="/videos/hero-filter-dark.mp4" type="video/mp4" />
</video>
</div>

```r
penguins <- datasets::penguins

filtered <- dplyr::filter(
  penguins,
  species %in% c(
    "Adelie",
    "Gentoo" # [!code --]
    "Gentoo", # [!code ++]
    "Chinstrap" # [!code ++]
  )
)

ggplot2::ggplot(
  filtered,
  ggplot2::aes(
    x = bill_len,
    y = bill_dep,
    colour = species
  )
) +
  ggplot2::geom_point()
```

</ClipWithCode>

[Custom code in a board](/learn/04-custom-code) · [Create a block](/learn/05-create-a-block)

## Try an example

Open a demo board on blockr.cloud, no install needed.

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

[All examples](/examples/)

## Install

```r
# install.packages("pak")
pak::pak("BristolMyersSquibb/blockr@dev")
blockr::run_app()
```

R 4.1 or later. Details, smaller installs and the AI features: [Install](/install).
