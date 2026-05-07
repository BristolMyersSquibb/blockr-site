---
title: The blockr universe
description: Packages that make up the blockr ecosystem — infrastructure and block packages, from stable to experimental.
sidebar: false
aside: false
---

# The blockr universe

blockr is split into two layers: **infrastructure** packages that frame the
app (engine, layout, sessions, code export) and **block packages** that
provide the actual building blocks users drag onto a board. Each layer spans
three maturity tiers — stable on CRAN, in development, and experimental.

::: tip Just want to get started?
`install.packages("blockr")` pulls the whole stable stack in one step — the
**blockr** meta‑package re‑exports the six CRAN packages below.
:::

## Infrastructure

The framework itself: engine, layout managers, session and code tooling.

### Stable <Badge type="tip" text="on CRAN" />

<div class="packages-grid">

<a class="package-card" href="https://bristolmyerssquibb.github.io/blockr.core/" target="_blank">
<div class="package-body">
<p class="package-title">blockr.core</p>
<p>The engine: blocks, boards, reactivity, serialisation. Everything else is built on top of it.</p>
</div>
</a>

<a class="package-card" href="https://bristolmyerssquibb.github.io/blockr.dock/" target="_blank">
<div class="package-body">
<p class="package-title">blockr.dock</p>
<p>Docking layout manager — drag, dock and tab blocks like an IDE.</p>
</div>
</a>

<a class="package-card" href="https://bristolmyerssquibb.github.io/blockr.dag/" target="_blank">
<div class="package-body">
<p class="package-title">blockr.dag</p>
<p>Directed acyclic graph view of a board — visualise and navigate the dependency structure of your blocks.</p>
</div>
</a>

</div>

### In development <Badge type="info" text="usable" />

<div class="packages-grid">

<a class="package-card" href="https://github.com/BristolMyersSquibb/blockr.ai" target="_blank">
<div class="package-body">
<p class="package-title">blockr.ai</p>
<p>AI assistant — configures exposed controls and explains data and outputs in plain English.</p>
</div>
</a>

<a class="package-card" href="https://bristolmyerssquibb.github.io/blockr.session/" target="_blank">
<div class="package-body">
<p class="package-title">blockr.session</p>
<p>Session management — save, restore and share board state across users.</p>
</div>
</a>

<a class="package-card" href="https://github.com/BristolMyersSquibb/blockr.code" target="_blank">
<div class="package-body">
<p class="package-title">blockr.code</p>
<p>Export a board as idiomatic, runnable R code anyone can read.</p>
</div>
</a>

</div>

## Block packages

The blocks users drag onto a board: data wrangling, visualisation, I/O, and verticals.

### Stable <Badge type="tip" text="on CRAN" />

<div class="packages-grid">

<a class="package-card" href="https://bristolmyerssquibb.github.io/blockr.dplyr/" target="_blank">
<div class="package-body">
<p class="package-title">blockr.dplyr</p>
<p>Interactive <code>dplyr</code> and <code>tidyr</code> blocks — select, filter, mutate, summarise, pivot, joins, binds.</p>
</div>
</a>

<a class="package-card" href="https://bristolmyerssquibb.github.io/blockr.ggplot/" target="_blank">
<div class="package-body">
<p class="package-title">blockr.ggplot</p>
<p>Interactive <code>ggplot2</code> blocks — scatter, bar, line, histogram, boxplot, facet, themes.</p>
</div>
</a>

<a class="package-card" href="https://bristolmyerssquibb.github.io/blockr.io/" target="_blank">
<div class="package-body">
<p class="package-title">blockr.io</p>
<p>Read and write blocks — CSV, Excel, Parquet, Feather, SPSS, Stata, SAS, JSON, plus URL and upload modes.</p>
</div>
</a>

</div>

### In development <Badge type="info" text="usable" />

<div class="packages-grid">

<a class="package-card" href="https://github.com/cynkra/blockr.bi" target="_blank">
<div class="package-body">
<p class="package-title">blockr.bi</p>
<p>Business intelligence blocks — KPI cards, value boxes, and dashboard widgets for executive views.</p>
</div>
</a>

<a class="package-card" href="https://github.com/BristolMyersSquibb/blockr.dm" target="_blank">
<div class="package-body">
<p class="package-title">blockr.dm</p>
<p>Relational data management blocks — visually inspect and join multi‑table datasets backed by <code>dm</code>.</p>
</div>
</a>

</div>

### Experimental <Badge type="warning" text="will change" />

<div class="packages-grid">

<a class="package-card" href="https://github.com/cynkra/blockr.stats" target="_blank">
<div class="package-body">
<p class="package-title">blockr.stats</p>
<p>Statistical test blocks — t‑tests, ANOVA, regression diagnostics.</p>
</div>
</a>

<a class="package-card" href="https://github.com/BristolMyersSquibb/blockr.admiral" target="_blank">
<div class="package-body">
<p class="package-title">blockr.admiral</p>
<p>ADaM derivation blocks — clinical data prep on top of admiral.</p>
</div>
</a>

<a class="package-card" href="https://github.com/cynkra/blockr.insurance" target="_blank">
<div class="package-body">
<p class="package-title">blockr.insurance</p>
<p>Insurance datasets and example workflows for the insurance vertical.</p>
</div>
</a>

<a class="package-card" href="https://github.com/cynkra/blockr.task" target="_blank">
<div class="package-body">
<p class="package-title">blockr.task</p>
<p>Task pipeline — long‑running, cancellable jobs inside a board.</p>
</div>
</a>

</div>

<style>
.packages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  margin: 12px 0 32px;
}
.package-card {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  text-decoration: none !important;
  color: inherit !important;
  transition: border-color 0.25s, box-shadow 0.25s;
}
.package-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}
.package-body {
  padding: 14px 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.package-title {
  font-size: 0.95em;
  font-weight: 600;
  margin: 0 0 8px !important;
  color: var(--vp-c-text-1) !important;
}
.package-body > p:not(.package-title) {
  color: var(--vp-c-text-2);
  font-size: 0.85em;
  margin: 0 !important;
  flex: 1;
  line-height: 1.5;
}
</style>
