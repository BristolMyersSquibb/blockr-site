---
title: Install blockr
description: Install blockr locally and launch your first board.
---

# Install blockr

blockr is free and open source, released under [GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.html).

You need [R](https://www.r-project.org/) 4.1 or later. Most users access blockr through a hosted server (e.g. [blockr.cloud](https://blockr.cloud)) and don't need to install anything locally.

## Quick start <Badge type="tip" text="recommended" />

To run blockr locally with the full set of blocks, install the development bundle and launch a board:

```r
# install.packages("pak")
pak::pak("BristolMyersSquibb/blockr@dev")
blockr::run_app()
```

[blockr](https://bristolmyerssquibb.github.io/blockr/) is a meta-package. This install pulls in the whole ecosystem: the core engine ([blockr.core](https://bristolmyerssquibb.github.io/blockr.core/), [blockr.dock](https://bristolmyerssquibb.github.io/blockr.dock/), [blockr.dag](https://bristolmyerssquibb.github.io/blockr.dag/), [blockr.dplyr](https://bristolmyerssquibb.github.io/blockr.dplyr/), [blockr.ggplot](https://bristolmyerssquibb.github.io/blockr.ggplot/), [blockr.io](https://bristolmyerssquibb.github.io/blockr.io/)), plus the packages most often used with it ([blockr.ui](https://github.com/BristolMyersSquibb/blockr.ui), [blockr.viz](https://github.com/BristolMyersSquibb/blockr.viz), [blockr.dm](https://github.com/BristolMyersSquibb/blockr.dm), [blockr.ai](https://github.com/BristolMyersSquibb/blockr.ai), [blockr.assistant](https://github.com/BristolMyersSquibb/blockr.assistant), [blockr.session](https://bristolmyerssquibb.github.io/blockr.session/), and [blockr.extra](https://github.com/cynkra/blockr.extra)).

These are the latest development versions, with the newest features and fixes but less stability than CRAN.

::: tip AI features
The bundle includes the AI packages ([blockr.ai](https://github.com/BristolMyersSquibb/blockr.ai), [blockr.assistant](https://github.com/BristolMyersSquibb/blockr.assistant)), but they need a model provider and API key before they respond. See [Activate AI features](#activate-ai-features) below.
:::

## Smaller installs

For a smaller, more stable set, install just the core bundle from the default branch:

```r
# install.packages("pak")
pak::pak("BristolMyersSquibb/blockr")
```

This gives you blockr.core, blockr.dock, blockr.dag, blockr.dplyr, blockr.ggplot, and blockr.io.

Or the released version from CRAN:

```r
install.packages("blockr")
```

## Activate AI features

The bundle ships the AI packages, but the AI chat panel and assistant need a configured model before they work. blockr.ai talks to LLMs through [ellmer](https://ellmer.tidyverse.org/). Follow ellmer's [setup guide](https://ellmer.tidyverse.org/articles/ellmer.html) to choose a provider and supply its API key.

See the [blockr.ai documentation](https://github.com/BristolMyersSquibb/blockr.ai) for more.

## More

Other packages (code export, stats, vertical demos) live in the [package overview](/packages/). The list there is the source of truth and may shift as packages stabilise or get folded into the meta-package.
