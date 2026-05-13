---
title: Install blockr
description: Install the blockr meta-package and optional extras.
---

# Install blockr

You need [R](https://www.r-project.org/) 4.1 or later. Most users access blockr through a hosted server (e.g. [blockr.cloud](https://blockr.cloud)) and don't need to install anything locally.

## blockr <Badge type="tip" text="recommended" />

blockr is on CRAN, but it's under heavy active development. Install from GitHub to get current bug fixes and features:

```r
# install.packages("pak")
pak::pak("BristolMyersSquibb/blockr")
```

[blockr](https://bristolmyerssquibb.github.io/blockr/) is a meta-package. It pulls in the core engine and the main block libraries: [blockr.core](https://bristolmyerssquibb.github.io/blockr.core/), [blockr.dock](https://bristolmyerssquibb.github.io/blockr.dock/), [blockr.dag](https://bristolmyerssquibb.github.io/blockr.dag/), [blockr.dplyr](https://bristolmyerssquibb.github.io/blockr.dplyr/), [blockr.ggplot](https://bristolmyerssquibb.github.io/blockr.ggplot/), [blockr.io](https://bristolmyerssquibb.github.io/blockr.io/).

Launch a board:

```r
blockr::run_app()
```

If you'd rather use the released version:

```r
install.packages("blockr")
```

## Optional extras

These packages aren't bundled into the meta-package. Install whichever you need.

### Session management: [blockr.session](https://bristolmyerssquibb.github.io/blockr.session/)

Save, restore, and share board state across users.

```r
pak::pak("BristolMyersSquibb/blockr.session")
```

### Dashboard blocks: [blockr.bi](https://github.com/cynkra/blockr.bi)

Drilldown, crossfilter, tiles, and KPI cards. New, but you'll want these for complex dashboards.

```r
pak::pak("cynkra/blockr.bi")
```

## More

Other packages (AI assistant, code export, stats, vertical demos) live in the [package overview](/packages/). The list there is the source of truth and may shift as packages stabilise or get folded into the meta-package.
