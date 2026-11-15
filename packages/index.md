---
title: Packages
description: The R packages that make up blockr, what the one-line install gives you, and the packages you add for a field.
sidebar: false
aside: false
---

# Packages

blockr is a set of R packages. One line installs the app and the blocks the
tutorials use. Packages for a field, such as clinical trials or time series,
are separate installs on top of it. All packages are open source, released
under [GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.html).

Each card links to the package's documentation site where it has one, else to
its README on GitHub.

## In the one-line install

```r
pak::pak("BristolMyersSquibb/blockr@dev")
blockr::run_app()
```

[Install](/install) has the details.

### The app

<div class="packages-grid">

<div class="package-card">
<p class="package-title">blockr.core</p>
<p>The engine: blocks, boards, reactivity, saving and loading.</p>
<p class="package-src"><a href="https://bristolmyerssquibb.github.io/blockr.core/" target="_blank">Docs site</a></p>
</div>

<div class="package-card">
<p class="package-title">blockr.dock</p>
<p>The layout: views with tabbed and split panels.</p>
<p class="package-src"><a href="https://bristolmyerssquibb.github.io/blockr.dock/" target="_blank">Docs site</a></p>
</div>

<div class="package-card">
<p class="package-title">blockr.dag</p>
<p>The Workflow canvas: the board as a graph, to add and connect blocks.</p>
<p class="package-src"><a href="https://bristolmyerssquibb.github.io/blockr.dag/" target="_blank">Docs site</a></p>
</div>

<div class="package-card">
<p class="package-title">blockr.session</p>
<p>Save, restore and share boards, with version history.</p>
<p class="package-src"><a href="https://bristolmyerssquibb.github.io/blockr.session/" target="_blank">Docs site</a></p>
</div>

<div class="package-card">
<p class="package-title">blockr.ui</p>
<p>Inputs, tables and styling shared by all blockr packages.</p>
<p class="package-src"><a href="https://bristolmyerssquibb.github.io/blockr.ui/" target="_blank">Docs site</a></p>
</div>

<div class="package-card">
<p class="package-title">blockr.assistant</p>
<p>A chat panel that adds, connects and configures blocks. Needs an LLM key, see <a href="/install#turn-on-the-assistant">Install</a>.</p>
<p class="package-src"><a href="https://github.com/BristolMyersSquibb/blockr.assistant" target="_blank">GitHub</a></p>
</div>

</div>

### Blocks

<div class="packages-grid">

<div class="package-card">
<p class="package-title">blockr.io</p>
<p>Read and write CSV, Excel, Parquet, SAS, Stata, SPSS and JSON from a path, a URL or an upload.</p>
<p class="package-src"><a href="https://bristolmyerssquibb.github.io/blockr.io/" target="_blank">Docs site</a></p>
</div>

<div class="package-card">
<p class="package-title">blockr.dplyr</p>
<p>Select, filter, mutate, summarise, pivot, join and bind, with <code>dplyr</code> and <code>tidyr</code>.</p>
<p class="package-src"><a href="https://bristolmyerssquibb.github.io/blockr.dplyr/" target="_blank">Docs site</a></p>
</div>

<div class="package-card">
<p class="package-title">blockr.ggplot</p>
<p><code>ggplot2</code> charts: scatter, bar, line, histogram, boxplot, facets, themes.</p>
<p class="package-src"><a href="https://bristolmyerssquibb.github.io/blockr.ggplot/" target="_blank">Docs site</a></p>
</div>

<div class="package-card">
<p class="package-title">blockr.viz</p>
<p>Interactive charts, summary and drilldown tables, KPI tiles, cross-filtering.</p>
<p class="package-src"><a href="https://github.com/BristolMyersSquibb/blockr.viz" target="_blank">GitHub</a></p>
</div>

<div class="package-card">
<p class="package-title">blockr.dm</p>
<p>Many tables at once: inspect, filter and join related tables, backed by <code>dm</code>.</p>
<p class="package-src"><a href="https://github.com/BristolMyersSquibb/blockr.dm" target="_blank">GitHub</a></p>
</div>

<div class="package-card">
<p class="package-title">blockr.script</p>
<p>An R script as a block, its plain values as controls. Used in <a href="/learn/04-custom-code">Custom code</a>.</p>
<p class="package-src"><a href="https://github.com/BristolMyersSquibb/blockr.script" target="_blank">GitHub</a></p>
</div>

</div>

## Add for your field

Install these next to blockr. Their blocks show up in "Add block" once the
package is loaded. They change faster than the packages above.

### Clinical trials

<div class="packages-grid">

<div class="package-card">
<p class="package-title">blockr.pharma</p>
<p>Population filters, adverse-event heatmaps, patient profiles.</p>
<code class="package-install">pak::pak("BristolMyersSquibb/blockr.pharma")</code>
<p class="package-src"><a href="https://github.com/BristolMyersSquibb/blockr.pharma" target="_blank">GitHub</a></p>
</div>

<div class="package-card">
<p class="package-title">blockr.admiral</p>
<p>ADaM derivations on top of <code>admiral</code>.</p>
<code class="package-install">pak::pak("BristolMyersSquibb/blockr.admiral")</code>
<p class="package-src"><a href="https://github.com/BristolMyersSquibb/blockr.admiral" target="_blank">GitHub</a></p>
</div>

</div>

### Statistics and time series

<div class="packages-grid">

<div class="package-card">
<p class="package-title">blockr.stats</p>
<p>Models (lm, glm, mixed), model summaries, tests, correlations, survival.</p>
<code class="package-install">pak::pak("cynkra/blockr.stats")</code>
<p class="package-src"><a href="https://github.com/cynkra/blockr.stats" target="_blank">GitHub</a></p>
</div>

<div class="package-card">
<p class="package-title">blockr.ts</p>
<p>Transform one series, combine several, pick a few out of many, forecast.</p>
<code class="package-install">pak::pak("cynkra/blockr.ts")</code>
<p class="package-src"><a href="https://github.com/cynkra/blockr.ts" target="_blank">GitHub</a></p>
</div>

<div class="package-card">
<p class="package-title">blockr.seasonal</p>
<p>Seasonal adjustment with X-13ARIMA-SEATS.</p>
<code class="package-install">pak::pak("cynkra/blockr.seasonal")</code>
<p class="package-src"><a href="https://github.com/cynkra/blockr.seasonal" target="_blank">GitHub</a></p>
</div>

</div>

### Insurance and finance

<div class="packages-grid">

<div class="package-card">
<p class="package-title">blockr.insurance</p>
<p>Insurance datasets and example workflows: underwriting, pricing, reinsurance.</p>
<code class="package-install">pak::pak("cynkra/blockr.insurance")</code>
<p class="package-src"><a href="https://github.com/cynkra/blockr.insurance" target="_blank">GitHub</a></p>
</div>

<div class="package-card">
<p class="package-title">blockr.portfolio <Badge type="warning" text="prototype" /></p>
<p>Investor profiles, optimisation, allocation, share prices.</p>
<code class="package-install">pak::pak("cynkra/blockr.portfolio")</code>
<p class="package-src"><a href="https://github.com/cynkra/blockr.portfolio" target="_blank">GitHub</a></p>
</div>

</div>

### Operations and maps

<div class="packages-grid">

<div class="package-card">
<p class="package-title">blockr.process</p>
<p>Run a process: a definition, an append-only event log and a worker that runs the scripts.</p>
<code class="package-install">pak::pak("cynkra/blockr.process")</code>
<p class="package-src"><a href="https://cynkra.github.io/blockr.process/" target="_blank">Docs site</a></p>
</div>

<div class="package-card">
<p class="package-title">blockr.leaflet <Badge type="warning" text="prototype" /></p>
<p>Map blocks built on <code>leaflet</code>: markers and routes.</p>
<code class="package-install">pak::pak("cynkra/blockr.leaflet")</code>
<p class="package-src"><a href="https://github.com/cynkra/blockr.leaflet" target="_blank">GitHub</a></p>
</div>

</div>

## More blocks and views

General-purpose packages that are not in the one-line install.

<div class="packages-grid">

<div class="package-card">
<p class="package-title">blockr.outline</p>
<p>The outline rail, the report builder and the code view of a board.</p>
<code class="package-install">pak::pak("cynkra/blockr.outline")</code>
<p class="package-src"><a href="https://github.com/cynkra/blockr.outline" target="_blank">GitHub</a></p>
</div>

<div class="package-card">
<p class="package-title">blockr.page</p>
<p>A board shown as one document: blocks in reading order with text in between, rendered to HTML.</p>
<code class="package-install">pak::pak("cynkra/blockr.page")</code>
<p class="package-src"><a href="https://github.com/cynkra/blockr.page" target="_blank">GitHub</a></p>
</div>

<div class="package-card">
<p class="package-title">blockr.extra</p>
<p>Utility blocks: a function block for custom R code, search, compare, labelling.</p>
<code class="package-install">pak::pak("cynkra/blockr.extra")</code>
<p class="package-src"><a href="https://github.com/cynkra/blockr.extra" target="_blank">GitHub</a></p>
</div>

<div class="package-card">
<p class="package-title">blockr.input</p>
<p>Edit data inside a board: pick a row and change it, paste new rows, page through a large table.</p>
<code class="package-install">pak::pak("cynkra/blockr.input")</code>
<p class="package-src"><a href="https://github.com/cynkra/blockr.input" target="_blank">GitHub</a></p>
</div>

<div class="package-card">
<p class="package-title">blockr.ai</p>
<p>Set a block's controls from a sentence, and explain data and outputs.</p>
<code class="package-install">pak::pak("BristolMyersSquibb/blockr.ai")</code>
<p class="package-src"><a href="https://github.com/BristolMyersSquibb/blockr.ai" target="_blank">GitHub</a></p>
</div>

</div>

<style>
.packages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 14px;
  margin: 12px 0 28px;
}
.package-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
  padding: 14px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
}
.package-card p {
  margin: 0 !important;
}
.package-card > p.package-title {
  font-size: 0.95em;
  font-weight: 600;
  color: var(--vp-c-text-1);
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}
.package-card > p.package-title .VPBadge {
  margin: 0;
}
.package-card > p:not(.package-title):not(.package-src) {
  color: var(--vp-c-text-2);
  font-size: 0.85em;
  line-height: 1.5;
  flex: 1;
}
.package-card > code.package-install {
  display: block;
  font-size: 0.76em;
  padding: 5px 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  overflow-wrap: anywhere;
  user-select: all;
}
.package-card > p.package-src {
  font-size: 0.78em;
}
.package-card > p.package-src a {
  font-weight: 500;
  text-decoration: none;
}
</style>
