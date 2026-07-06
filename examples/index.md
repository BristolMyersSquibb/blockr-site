---
sidebar: false
aside: false
---

# Examples

Curated demo workflows running on [blockr.cloud](https://blockr.cloud). Open any example to explore it interactively.

<!-- BEGIN generated: gallery cards + run-locally (blockr.deploy/shinyproxy-hetzner/scripts/gen-website-examples.R) -->

## Getting Started

<div class="examples-grid">
<a class="example-card" href="https://blockr.cloud/app/empty" target="_blank">
<img src="/examples/empty.jpg" alt="Empty Workflow" />
<div class="example-body">
<p class="example-title">Empty Workflow</p>
<p>Start from a clean canvas. Add blocks, connect them, and build your own pipeline from scratch.</p>
<span class="example-link">Open in Playground →</span>
</div>
</a>
</div>

## Pharma

<div class="examples-grid">
<a class="example-card" href="https://blockr.cloud/app/clinical-explorer" target="_blank">
<img src="/examples/clinical-explorer.jpg" alt="Clinical Explorer" />
<div class="example-body">
<p class="example-title">Clinical Explorer</p>
<p>AI-enabled exploration of an ADaM trial: demographics, adverse events, lab values, vitals, and patient profile.</p>
<span class="example-link">Open in Playground →</span>
</div>
</a>
<a class="example-card" href="https://blockr.cloud/app/admiral" target="_blank">
<img src="/examples/admiral.jpg" alt="Admiral SDTM → ADSL" />
<div class="example-body">
<p class="example-title">Admiral SDTM → ADSL</p>
<p>SDTM DM to ADSL derivation pipeline using admiral blocks: each block is one derivation step with visible intermediate results.</p>
<span class="example-link">Open in Playground →</span>
</div>
</a>
</div>

## Insurance

<div class="examples-grid">
<a class="example-card" href="https://blockr.cloud/app/uwr" target="_blank">
<img src="/examples/uwr.jpg" alt="Life UWR Workbench" />
<div class="example-body">
<p class="example-title">Life UWR Workbench</p>
<p>Life-insurance underwriting workbench: a per-coverage expected-claims pipeline plus a UWR price-driver dashboard over a census, claims history, and bundled actuarial tables.</p>
<span class="example-link">Open in Playground →</span>
</div>
</a>
<a class="example-card" href="https://blockr.cloud/app/actuarial" target="_blank">
<img src="/examples/actuarial.jpg" alt="Actuarial Workbench" />
<div class="example-body">
<p class="example-title">Actuarial Workbench</p>
<p>Property-insurance actuarial workbench: Base vs Challenger portfolio simulations with editable base-rate grids, premium components, and a run-vs-run compare waterfall.</p>
<span class="example-link">Open in Playground →</span>
</div>
</a>
<a class="example-card" href="https://blockr.cloud/app/treaty-pricer" target="_blank">
<img src="/examples/treaty-pricer.jpg" alt="Treaty Pricer" />
<div class="example-body">
<p class="example-title">Treaty Pricer</p>
<p>Layered excess-of-loss treaty pricer: an editable treaty tower drives a piecewise-Pareto severity fit, loss simulation, and a per-layer premium build-up. Edit a layer and the KPIs, quote chart, and build-up waterfall all recompute.</p>
<span class="example-link">Open in Playground →</span>
</div>
</a>
</div>

## Statistics

<div class="examples-grid">
<a class="example-card" href="https://blockr.cloud/app/stats-101" target="_blank">
<img src="/examples/stats-101.jpg" alt="Stats 101 (Penguins)" />
<div class="example-body">
<p class="example-title">Stats 101 (Penguins)</p>
<p>A model-centric statistics tour on palmerpenguins: a model card (coefficient forest + adj-R2), residual diagnostics, and a survival side (Kaplan-Meier curve + Cox hazard-ratio forest).</p>
<span class="example-link">Open in Playground →</span>
</div>
</a>
</div>

## Showcase

<div class="examples-grid">
<a class="example-card" href="https://blockr.cloud/app/catbreeds" target="_blank">
<div class="example-body">
<p class="example-title">Cat Breeds</p>
<p>A full cat-breeds analysis end to end: trait radar, headline KPIs, correlations, a temperament word cloud and a chart-filter to drilldown pair, with AI wired both per-block and board-level (the useR! 2026 demo).</p>
<span class="example-link">Open in Playground →</span>
</div>
</a>
<a class="example-card" href="https://blockr.cloud/app/full-stack" target="_blank">
<div class="example-body">
<p class="example-title">Full-Stack Assistant</p>
<p>The whole board-facing blockr stack in one deployable app: a two-branch board (mtcars analytics + a single-patient clinical profile) that exercises one block or plugin from every major package, with the board-level LLM assistant mounted alongside.</p>
<span class="example-link">Open in Playground →</span>
</div>
</a>
</div>

## Run an example locally

The demos above run on [blockr.cloud](https://blockr.cloud). To run one in your own R session, follow the setup below.

### Clinical Explorer

AI-enabled exploration of an ADaM trial: demographics, adverse events, lab values, vitals, and patient profile.

First install blockr as described on the [Install](/install) page. Then add the extra packages:

```r
pak::pak("BristolMyersSquibb/blockr.pharma")   # patient profile, swim-lane plot, the ADaM dm data block
install.packages("safetyData")                 # ADaM example tables adsl/adae/adlbc/advs
```

Launch the demo:

```r
source(system.file("examples/clinical-explorer.R", package = "blockr.pharma"))
```

This loads the ADaM tables from safetyData and the same blocks as the live demo: cross-filter, drilldown chart and table, patient profile and swim-lane plot. Open [`inst/examples/clinical-explorer.R`](https://github.com/BristolMyersSquibb/blockr.pharma/blob/main/inst/examples/clinical-explorer.R) on GitHub to see exactly what the script does.

### Admiral SDTM → ADSL

SDTM DM to ADSL derivation pipeline using admiral blocks: each block is one derivation step with visible intermediate results.

First install blockr as described on the [Install](/install) page. Then add the extra packages:

```r
pak::pak("BristolMyersSquibb/blockr.admiral")   # admiral derivation blocks (derive_vars_*, merge, seq)
install.packages("pharmaversesdtm")             # SDTM example domains (dm, ex)
```

Launch the demo:

```r
source(system.file("examples/sdtm-to-adsl.R", package = "blockr.admiral"))
```

Open [`inst/examples/sdtm-to-adsl.R`](https://github.com/BristolMyersSquibb/blockr.admiral/blob/main/inst/examples/sdtm-to-adsl.R) on GitHub to see exactly what the script does.

### Life UWR Workbench

Life-insurance underwriting workbench: a per-coverage expected-claims pipeline plus a UWR price-driver dashboard over a census, claims history, and bundled actuarial tables.

First install blockr as described on the [Install](/install) page. Then add the extra packages:

```r
pak::pak("cynkra/blockr.input")              # editable data grid (the UWR uw_factors worksheet)
pak::pak("BristolMyersSquibb/blockr.code")   # show / export the generated R code
pak::pak("cynkra/blockr.insurance")          # census + claims data, formula chain, this example
```

Launch the demo:

```r
source(system.file("examples/life-underwriting.R", package = "blockr.insurance"))
```

Open [`inst/examples/life-underwriting.R`](https://github.com/cynkra/blockr.insurance/blob/main/inst/examples/life-underwriting.R) on GitHub to see exactly what the script does.

### Actuarial Workbench

Property-insurance actuarial workbench: Base vs Challenger portfolio simulations with editable base-rate grids, premium components, and a run-vs-run compare waterfall.

First install blockr as described on the [Install](/install) page. Then add the extra packages:

```r
pak::pak("cynkra/blockr.input")              # editable base_rate parameter grids (Base / Challenger)
pak::pak("BristolMyersSquibb/blockr.code")   # show / export the generated R code
pak::pak("cynkra/blockr.insurance")          # pricing engines + portfolio data, this example
```

Launch the demo:

```r
source(system.file("examples/property-workbench.R", package = "blockr.insurance"))
```

Open [`inst/examples/property-workbench.R`](https://github.com/cynkra/blockr.insurance/blob/main/inst/examples/property-workbench.R) on GitHub to see exactly what the script does.

### Treaty Pricer

Layered excess-of-loss treaty pricer: an editable treaty tower drives a piecewise-Pareto severity fit, loss simulation, and a per-layer premium build-up. Edit a layer and the KPIs, quote chart, and build-up waterfall all recompute.

First install blockr as described on the [Install](/install) page. Then add the extra packages:

```r
pak::pak("cynkra/blockr.input")              # the one editable treaty_tower grid (client structure)
pak::pak("BristolMyersSquibb/blockr.code")   # show / export the generated R code
pak::pak("cynkra/blockr.insurance")          # the treaty tower data + this example
install.packages("Pareto")                   # piecewise-Pareto severity fit + loss simulation
```

Launch the demo:

```r
source(system.file("examples/treaty-pricer.R", package = "blockr.insurance"))
```

This loads the treaty tower bundled in blockr.insurance and the same blocks as the live demo: the editable tower, Pareto fit and loss simulation, the per-layer quote chart and premium build-up waterfall, the layer-detail drilldown, and a challenger-vs-base comparison. Open [`inst/examples/treaty-pricer.R`](https://github.com/cynkra/blockr.insurance/blob/main/inst/examples/treaty-pricer.R) on GitHub to see exactly what the script does.

### Stats 101 (Penguins)

A model-centric statistics tour on palmerpenguins: a model card (coefficient forest + adj-R2), residual diagnostics, and a survival side (Kaplan-Meier curve + Cox hazard-ratio forest).

First install blockr as described on the [Install](/install) page. Then add the extra packages:

```r
pak::pak("cynkra/blockr.stats")      # model / broom / survival / correlate blocks (this example)
install.packages("palmerpenguins")   # penguins dataset for the regression side
```

Launch the demo:

```r
source(system.file("examples/stats-101.R", package = "blockr.stats"))
```

Open [`inst/examples/stats-101.R`](https://github.com/cynkra/blockr.stats/blob/main/inst/examples/stats-101.R) on GitHub to see exactly what the script does.

### Cat Breeds

A full cat-breeds analysis end to end: trait radar, headline KPIs, correlations, a temperament word cloud and a chart-filter to drilldown pair, with AI wired both per-block and board-level (the useR! 2026 demo).

First install blockr as described on the [Install](/install) page. Then add the extra packages:

```r
pak::pak("cynkra/blockr.leaflet")     # custom "map block" we built (markers per origin)
pak::pak("cynkra/blockr.catbreeds")   # this package: catbreeds data block + card/flags/stats/similar
```

Launch the demo:

```r
source(system.file("examples/app.R", package = "blockr.catbreeds"))
```

Open [`inst/examples/app.R`](https://github.com/cynkra/blockr.catbreeds/blob/main/inst/examples/app.R) on GitHub to see exactly what the script does.

### Full-Stack Assistant

The whole board-facing blockr stack in one deployable app: a two-branch board (mtcars analytics + a single-patient clinical profile) that exercises one block or plugin from every major package, with the board-level LLM assistant mounted alongside.

First install blockr as described on the [Install](/install) page. Then add the extra packages:

```r
pak::pak("BristolMyersSquibb/blockr.assistant@feat/agentic-loop")   # blockr.assistant — needs this branch (not yet on main)
pak::pak("BristolMyersSquibb/blockr.pharma")                        # patient-profile clinical block
pak::pak("BristolMyersSquibb/blockr.code")                          # idiomatic code-export plugin
install.packages("pharmaverseadam")                                 # adsl, adae, advs
```

Launch the demo:

```r
source(system.file("examples/full-stack/app.R", package = "blockr.assistant"))
```

This mounts one block or plugin from each package (data, chart, summary table, function block, patient profile, DAG, code export, per-block AI, and the board-level assistant). Ask the Assistant pane "What is on the board?" or "Add a scatter plot of mpg vs wt". Needs an LLM key (e.g. OPENAI_API_KEY). Open [`inst/examples/full-stack/app.R`](https://github.com/BristolMyersSquibb/blockr.assistant/blob/feat/agentic-loop/inst/examples/full-stack/app.R) on GitHub to see exactly what the script does.

<!-- END generated -->






<style>
.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  margin: 12px 0 32px;
}
.example-card {
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
.example-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}
.example-card img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  object-position: top left;
  display: block;
  border-bottom: 1px solid var(--vp-c-divider);
}
.example-body {
  padding: 12px 14px;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.example-title {
  font-size: 0.95em;
  font-weight: 600;
  margin: 0 0 6px !important;
  color: var(--vp-c-text-1) !important;
}
.example-body p {
  color: var(--vp-c-text-2);
  font-size: 0.85em;
  margin: 0 !important;
  flex: 1;
  line-height: 1.5;
}
.example-link {
  display: inline-block;
  margin-top: 10px;
  font-size: 0.85em;
  font-weight: 500;
  color: var(--vp-c-brand-1) !important;
}
</style>
