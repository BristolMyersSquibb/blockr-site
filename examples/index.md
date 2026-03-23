---
sidebar: false
aside: false
---

# Examples

Curated demo workflows running on [blockr.cloud](https://blockr.cloud). Open any example to explore it interactively.

## Getting Started

<div class="examples-grid">
<a class="example-card" href="https://blockr.cloud/app/empty" target="_blank">
<img src="/examples/empty.png" alt="Empty Workflow" />
<div class="example-body">
<p class="example-title">Empty Workflow</p>
<p>Start from a clean canvas. Add blocks, connect them, and build your own pipeline from scratch.</p>
<span class="example-link">Open in Playground →</span>
</div>
</a>
</div>

## Data & Analytics

<div class="examples-grid">
<a class="example-card" href="https://blockr.cloud/app/fredr" target="_blank">
<img src="/examples/fredr.png" alt="FRED Economic Data" />
<div class="example-body">
<p class="example-title">FRED Economic Data</p>
<p>Fetch and visualize economic indicators from the Federal Reserve using the FRED API.</p>
<span class="example-link">Open in Playground →</span>
</div>
</a>
<a class="example-card" href="https://blockr.cloud/app/lm" target="_blank">
<img src="/examples/lm.png" alt="Linear Modeling" />
<div class="example-body">
<p class="example-title">Linear Modeling</p>
<p>Statistical modeling with linear regression, diagnostic plots, and model summaries.</p>
<span class="example-link">Open in Playground →</span>
</div>
</a>
<a class="example-card" href="https://blockr.cloud/app/tidymodels" target="_blank">
<img src="/examples/tidymodels.png" alt="Tidymodels ML" />
<div class="example-body">
<p class="example-title">Tidymodels ML</p>
<p>Machine learning workflows powered by tidymodels: preprocessing, model fitting, and evaluation.</p>
<span class="example-link">Open in Playground →</span>
</div>
</a>
</div>

## Dashboards

<div class="examples-grid">
<a class="example-card" href="https://blockr.cloud/app/unibas" target="_blank">
<img src="/examples/unibas.png" alt="AI Papers Dashboard" />
<div class="example-body">
<p class="example-title">AI Papers Dashboard</p>
<p>A BI-style dashboard exploring AI research adoption trends across universities.</p>
<span class="example-link">Open in Playground →</span>
</div>
</a>
<a class="example-card" href="https://blockr.cloud/app/insurance" target="_blank">
<img src="/examples/insurance.png" alt="Insurance Portfolio" />
<div class="example-body">
<p class="example-title">Insurance Portfolio</p>
<p>Enterprise-grade star schema data with dm-based crossfilter for insurance portfolio analysis.</p>
<span class="example-link">Open in Playground →</span>
</div>
</a>
<a class="example-card" href="https://blockr.cloud/app/adam" target="_blank">
<img src="/examples/adam.png" alt="ADaM Crossfilter" />
<div class="example-body">
<p class="example-title">ADaM Crossfilter</p>
<p>Explore CDISC Pilot 01 ADaM clinical trial data with dynamic crossfiltering across endpoints.</p>
<span class="example-link">Open in Playground →</span>
</div>
</a>
</div>

## Visualization & AI

<div class="examples-grid">
<a class="example-card" href="https://blockr.cloud/app/echart-gallery" target="_blank">
<img src="/examples/echart-gallery.png" alt="ECharts Gallery" />
<div class="example-body">
<p class="example-title">ECharts Gallery</p>
<p>All ECharts visualization types: bar, line, scatter, heatmap, and more.</p>
<span class="example-link">Open in Playground →</span>
</div>
</a>
<a class="example-card" href="https://blockr.cloud/app/ai-ctrl" target="_blank">
<img src="/examples/ai-ctrl.png" alt="AI Control + Pipeline Discovery" />
<div class="example-body">
<p class="example-title">AI Control + Pipeline Discovery</p>
<p>AI-powered data filtering and automatic pipeline construction from natural language.</p>
<span class="example-link">Open in Playground →</span>
</div>
</a>
</div>

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
