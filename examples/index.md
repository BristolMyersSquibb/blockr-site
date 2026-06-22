---
sidebar: false
aside: false
---

# Examples

Curated demo workflows running on [blockr.cloud](https://blockr.cloud). Open any example to explore it interactively.

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
<img src="/examples/admiral.jpg" alt="Admiral SDTM to ADSL" />
<div class="example-body">
<p class="example-title">Admiral SDTM → ADSL</p>
<p>SDTM DM to ADSL derivation pipeline using admiral blocks (blockr.admiral).</p>
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
<p>Life-insurance underwriting workbench spanning Inputs, Claims, Underwrite, Analysis, and Actuarial views over an employees census, claims history, and bundled actuarial tables.</p>
<span class="example-link">Open in Playground →</span>
</div>
</a>
<a class="example-card" href="https://blockr.cloud/app/actuarial" target="_blank">
<img src="/examples/actuarial.jpg" alt="Actuarial Workbench" />
<div class="example-body">
<p class="example-title">Actuarial Workbench</p>
<p>Property-insurance actuarial workbench with portfolio inputs, country / base-rate / experience pricing grids, premium components and run-vs-run comparison over the bundled property portfolio.</p>
<span class="example-link">Open in Playground →</span>
</div>
</a>
<a class="example-card" href="https://blockr.cloud/app/reinsurance" target="_blank">
<img src="/examples/reinsurance.jpg" alt="Reinsurance Dashboard" />
<div class="example-body">
<p class="example-title">Reinsurance Dashboard</p>
<p>Reinsurance portfolio analytics with scenario / peril / region crossfilter, premium and exposure KPIs, and cedant / peril drill-downs over a synthetic exposure and event-loss cube.</p>
<span class="example-link">Open in Playground →</span>
</div>
</a>
</div>

## Finance

<div class="examples-grid">
<a class="example-card" href="https://blockr.cloud/app/portfolio" target="_blank">
<img src="/examples/portfolio.jpg" alt="Portfolio Advisor" />
<div class="example-body">
<p class="example-title">Portfolio Advisor</p>
<p>Portfolio optimization with investor profiling and dashboard (blockr.portfolio).</p>
<span class="example-link">Open in Playground →</span>
</div>
</a>
<a class="example-card" href="https://blockr.cloud/app/explorer" target="_blank">
<img src="/examples/explorer.jpg" alt="Share Explorer" />
<div class="example-body">
<p class="example-title">Share Explorer</p>
<p>Interactive stock ticker explorer with candlestick charts (blockr.portfolio).</p>
<span class="example-link">Open in Playground →</span>
</div>
</a>
</div>

## Statistics

<div class="examples-grid">
<a class="example-card" href="https://blockr.cloud/app/tidymodels" target="_blank">
<img src="/examples/tidymodels.jpg" alt="Tidymodels ML" />
<div class="example-body">
<p class="example-title">Tidymodels ML</p>
<p>Machine learning workflows powered by tidymodels: preprocessing, model fitting, and evaluation.</p>
<span class="example-link">Open in Playground →</span>
</div>
</a>
<a class="example-card" href="https://blockr.cloud/app/stats-101" target="_blank">
<img src="/examples/stats-101.jpg" alt="Stats 101 (Penguins)" />
<div class="example-body">
<p class="example-title">Stats 101 (Penguins)</p>
<p>Teaching-grade statistical workflow on palmerpenguins: descriptives, correlation, lm, t-test, normality.</p>
<span class="example-link">Open in Playground →</span>
</div>
</a>
</div>

## Run an example locally

The demos above run on [blockr.cloud](https://blockr.cloud). To run one in your own R session, follow the setup below.

### Clinical Explorer

First install blockr as described on the [Install](/install) page. Then add the extra packages:

```r
pak::pak("BristolMyersSquibb/blockr.viz")                # drilldown chart/table, KPIs, summary tables
pak::pak("BristolMyersSquibb/blockr.dm")    # multi-table / ADaM data-model handling
pak::pak("BristolMyersSquibb/blockr.session") # save, restore, share board state
pak::pak("BristolMyersSquibb/blockr.pharma")  # patient profile, swim-lane plot
```

Launch the demo:

```r
source(system.file("examples/clinical-explorer.R", package = "blockr.pharma"))
```

This loads the ADaM tables from [pharmaverseadam](https://pharmaverse.github.io/pharmaverseadam/) and the same blocks as the live demo: cross-filter, drilldown chart and table, patient profile, swim-lane plot. Open [`inst/examples/clinical-explorer.R`](https://github.com/BristolMyersSquibb/blockr.pharma/blob/main/inst/examples/clinical-explorer.R) on GitHub to see exactly what the script does.

### Treaty Pricer

A simulation-based pricer for a layered excess-of-loss reinsurance treaty. One editable treaty tower drives a piecewise-Pareto severity fit, loss simulation, layer structuring, and a premium build-up. Edit a layer and the KPIs, the per-layer quote chart, and the build-up waterfall all recompute.

First install blockr as described on the [Install](/install) page. Then add the extra packages:

```r
pak::pak("BristolMyersSquibb/blockr.viz")     # tiles, KPIs, charts, tables, drilldown
pak::pak("BristolMyersSquibb/blockr.dm")      # relational / multi-table data model
pak::pak("BristolMyersSquibb/blockr.session") # save, restore, share board state
pak::pak("BristolMyersSquibb/blockr.code")    # show / export the generated R code
pak::pak("cynkra/blockr.input")               # editable data grids (the treaty tower)
pak::pak("cynkra/blockr.extra")               # function blocks (Pareto fit, per-claim layering)
pak::pak("cynkra/blockr.insurance")           # the treaty tower data + this example
install.packages("Pareto")                    # piecewise-Pareto severity fit + loss simulation
```

Launch the demo:

```r
source(system.file("examples/treaty-pricer.R", package = "blockr.insurance"))
```

This loads the treaty tower bundled in blockr.insurance and the same blocks as the live demo: the editable tower, Pareto fit and loss simulation, the per-layer quote chart and premium build-up waterfall, the layer-detail drilldown, and a challenger-vs-base comparison. Open [`inst/examples/treaty-pricer.R`](https://github.com/cynkra/blockr.insurance/blob/main/inst/examples/treaty-pricer.R) on GitHub to see exactly what the script does.

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
