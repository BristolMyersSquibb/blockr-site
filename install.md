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

[blockr](https://bristolmyerssquibb.github.io/blockr/) is a meta-package. This one install pulls in the whole ecosystem in a single line: the core engine — [blockr.core](https://bristolmyerssquibb.github.io/blockr.core/), [blockr.dock](https://bristolmyerssquibb.github.io/blockr.dock/), [blockr.dag](https://bristolmyerssquibb.github.io/blockr.dag/), [blockr.dplyr](https://bristolmyerssquibb.github.io/blockr.dplyr/), [blockr.ggplot](https://bristolmyerssquibb.github.io/blockr.ggplot/), [blockr.io](https://bristolmyerssquibb.github.io/blockr.io/) — plus the packages most often used alongside it: [blockr.ui](https://github.com/BristolMyersSquibb/blockr.ui), [blockr.viz](https://github.com/BristolMyersSquibb/blockr.viz), [blockr.dm](https://github.com/BristolMyersSquibb/blockr.dm), [blockr.ai](https://github.com/BristolMyersSquibb/blockr.ai), [blockr.assistant](https://github.com/BristolMyersSquibb/blockr.assistant), [blockr.session](https://bristolmyerssquibb.github.io/blockr.session/), and [blockr.extra](https://github.com/cynkra/blockr.extra).

It tracks the latest development versions, so you get the newest features and fixes (and the occasional rough edge).

::: tip AI features
The bundle includes the AI packages ([blockr.ai](https://github.com/BristolMyersSquibb/blockr.ai), [blockr.assistant](https://github.com/BristolMyersSquibb/blockr.assistant)), but AI features have to be activated separately before they work. Setup is documented separately.
:::

## Smaller installs

For a leaner, more stable footprint, install just the core bundle from the default branch:

```r
# install.packages("pak")
pak::pak("BristolMyersSquibb/blockr")
```

This gives you blockr.core, blockr.dock, blockr.dag, blockr.dplyr, blockr.ggplot, and blockr.io.

Or the released version from CRAN:

```r
install.packages("blockr")
```

## More

Other packages (code export, stats, vertical demos) live in the [package overview](/packages/). The list there is the source of truth and may shift as packages stabilise or get folded into the meta-package.
