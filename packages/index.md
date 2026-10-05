---
title: The blockr universe
description: Packages that make up the blockr ecosystem, infrastructure and block packages, from stable to experimental.
sidebar: false
aside: false
---

# The blockr universe

blockr is split into two layers: **infrastructure** packages that frame the
app (engine, layout, sessions, code export) and **block packages** that
provide the blocks users add to a board. Each layer spans three maturity
tiers: stable on CRAN, in development, and experimental.

All packages are free and open source, released under
[GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.html).
Source for each package lives on GitHub (linked from the cards below).

::: tip Just want to get started?
`install.packages("blockr")` pulls the whole stable stack in one step. The
**blockr** meta-package re-exports the six CRAN packages blockr.core,
blockr.dock, blockr.dag, blockr.dplyr, blockr.ggplot and blockr.io.
:::

## Infrastructure

The framework itself: engine, layout, sessions, assistants and code tooling.

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
<p>Docking layout: views with tabbed and split panels, arranged like an IDE.</p>
</div>
</a>

<a class="package-card" href="https://bristolmyerssquibb.github.io/blockr.dag/" target="_blank">
<div class="package-body">
<p class="package-title">blockr.dag</p>
<p>Workflow view: the board as a graph of blocks, to add, connect and navigate them.</p>
</div>
</a>

<a class="package-card" href="https://bristolmyerssquibb.github.io/blockr.session/" target="_blank">
<div class="package-body">
<p class="package-title">blockr.session</p>
<p>Save, restore and share boards, with version history.</p>
</div>
</a>

</div>

### In development <Badge type="info" text="usable" />

<div class="packages-grid">

<a class="package-card" href="https://bristolmyerssquibb.github.io/blockr.ui/" target="_blank">
<div class="package-body">
<p class="package-title">blockr.ui</p>
<p>The design system: inputs, tables and styling shared by all blockr packages.</p>
</div>
</a>

<a class="package-card" href="https://github.com/BristolMyersSquibb/blockr.ai" target="_blank">
<div class="package-body">
<p class="package-title">blockr.ai</p>
<p>AI helpers that set a block's controls and explain data and outputs in plain English.</p>
</div>
</a>

<a class="package-card" href="https://github.com/BristolMyersSquibb/blockr.assistant" target="_blank">
<div class="package-body">
<p class="package-title">blockr.assistant</p>
<p>A board-level LLM assistant that adds, connects and configures blocks from a chat.</p>
</div>
</a>

<a class="package-card" href="https://github.com/BristolMyersSquibb/blockr.code" target="_blank">
<div class="package-body">
<p class="package-title">blockr.code</p>
<p>Export a board as idiomatic, runnable R code anyone can read.</p>
</div>
</a>

<a class="package-card" href="https://github.com/cynkra/blockr.outline" target="_blank">
<div class="package-body">
<p class="package-title">blockr.outline</p>
<p>The outline rail, the report builder and the code views of a board.</p>
</div>
</a>

</div>

## Block packages

The blocks users add to a board: data wrangling, visualisation, I/O, and verticals.

### Stable <Badge type="tip" text="on CRAN" />

<div class="packages-grid">

<a class="package-card" href="https://bristolmyerssquibb.github.io/blockr.dplyr/" target="_blank">
<div class="package-body">
<p class="package-title">blockr.dplyr</p>
<p>Interactive <code>dplyr</code> and <code>tidyr</code> blocks: select, filter, mutate, summarise, pivot, joins, binds.</p>
</div>
</a>

<a class="package-card" href="https://bristolmyerssquibb.github.io/blockr.ggplot/" target="_blank">
<div class="package-body">
<p class="package-title">blockr.ggplot</p>
<p>Interactive <code>ggplot2</code> blocks: scatter, bar, line, histogram, boxplot, facet, themes.</p>
</div>
</a>

<a class="package-card" href="https://bristolmyerssquibb.github.io/blockr.io/" target="_blank">
<div class="package-body">
<p class="package-title">blockr.io</p>
<p>Read and write blocks: CSV, Excel, Parquet, Feather, SPSS, Stata, SAS, JSON, from a path, a URL or an upload.</p>
</div>
</a>

</div>

### In development <Badge type="info" text="usable" />

<div class="packages-grid">

<a class="package-card" href="https://github.com/BristolMyersSquibb/blockr.viz" target="_blank">
<div class="package-body">
<p class="package-title">blockr.viz</p>
<p>Visualisation blocks: interactive charts, summary and drilldown tables, KPI tiles, cross-filtering.</p>
</div>
</a>

<a class="package-card" href="https://github.com/BristolMyersSquibb/blockr.dm" target="_blank">
<div class="package-body">
<p class="package-title">blockr.dm</p>
<p>Relational data blocks: inspect, filter and join multi-table datasets backed by <code>dm</code>.</p>
</div>
</a>

<a class="package-card" href="https://github.com/cynkra/blockr.input" target="_blank">
<div class="package-body">
<p class="package-title">blockr.input</p>
<p>Data entry blocks: editable grids, tables and forms inside a board.</p>
</div>
</a>

</div>

### Experimental <Badge type="warning" text="will change" />

<div class="packages-grid">

<a class="package-card" href="https://github.com/cynkra/blockr.extra" target="_blank">
<div class="package-body">
<p class="package-title">blockr.extra</p>
<p>Experimental blocks, among them a code block for custom R functions.</p>
</div>
</a>

<a class="package-card" href="https://github.com/cynkra/blockr.stats" target="_blank">
<div class="package-body">
<p class="package-title">blockr.stats</p>
<p>Statistical blocks: models (lm, glm, mixed), model summaries, tests, correlations, survival.</p>
</div>
</a>

<a class="package-card" href="https://github.com/BristolMyersSquibb/blockr.pharma" target="_blank">
<div class="package-body">
<p class="package-title">blockr.pharma</p>
<p>Clinical trial blocks: population filters, adverse-event heatmaps, patient profiles.</p>
</div>
</a>

<a class="package-card" href="https://github.com/BristolMyersSquibb/blockr.admiral" target="_blank">
<div class="package-body">
<p class="package-title">blockr.admiral</p>
<p>ADaM derivation blocks: clinical data preparation on top of admiral.</p>
</div>
</a>

<a class="package-card" href="https://github.com/cynkra/blockr.insurance" target="_blank">
<div class="package-body">
<p class="package-title">blockr.insurance</p>
<p>Insurance datasets and example workflows: underwriting, pricing, reinsurance.</p>
</div>
</a>

<a class="package-card" href="https://github.com/cynkra/blockr.portfolio" target="_blank">
<div class="package-body">
<p class="package-title">blockr.portfolio</p>
<p>Portfolio blocks: investor profiles, optimisation, allocation, share prices.</p>
</div>
</a>

<a class="package-card" href="https://github.com/cynkra/blockr.ts" target="_blank">
<div class="package-body">
<p class="package-title">blockr.ts</p>
<p>Time series blocks: transform one series, combine several, pick a few out of many, forecast.</p>
</div>
</a>

<a class="package-card" href="https://github.com/cynkra/blockr.seasonal" target="_blank">
<div class="package-body">
<p class="package-title">blockr.seasonal</p>
<p>Seasonal adjustment with X-13ARIMA-SEATS.</p>
</div>
</a>

<a class="package-card" href="https://github.com/cynkra/blockr.leaflet" target="_blank">
<div class="package-body">
<p class="package-title">blockr.leaflet</p>
<p>Map blocks built on <code>leaflet</code>: markers and routes.</p>
</div>
</a>

<a class="package-card" href="https://cynkra.github.io/blockr.process/" target="_blank">
<div class="package-body">
<p class="package-title">blockr.process</p>
<p>Process orchestration: a process definition, an append-only event log and a worker that runs the scripts.</p>
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
