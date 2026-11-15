---
title: Docs
description: "Reference for blockr: concepts, the blocks each package provides, and how to write your own blocks and extensions."
---

# Docs

Reference material for blockr. For step-by-step tutorials, see [Learn](/learn/).

## Concepts

How blockr works and how a board is used.

- [User, Builder, Developer](concepts/02-roles): the three roles around a blockr
  app.
- [Reactivity](concepts/01-reactivity): how data flows from block to block.
- [The AI assistant](concepts/03-ai-assistant): a chat panel that builds and
  changes the board for you.
- [Saving and sharing](concepts/04-saving-sharing): where boards are stored and
  how to share them.

## Block reference

Every block in the core packages, with its arguments. These pages are generated
from the packages' block registries.

- [blockr.dplyr](blocks/blockr.dplyr): data wrangling, one block per dplyr verb.
- [blockr.ggplot](blocks/blockr.ggplot): static ggplot2 charts.
- [blockr.viz](blocks/blockr.viz): interactive charts and tables with
  click-to-filter.
- [blockr.dm](blocks/blockr.dm): relational data, many linked tables as one
  source.
- [blockr.io](blocks/blockr.io): read and write files.
- [blockr.extra](blocks/blockr.extra): the function block and other utilities.
- [blockr.core](blocks/blockr.core): the small set of blocks built into the
  framework.

### Other block packages

The domain packages (blockr.pharma, blockr.admiral, blockr.stats,
blockr.insurance, blockr.ts and others) are still changing. Their
documentation lives in each package's README on GitHub, linked from the
[packages page](/packages/).

## Developer guides

- [Create a block](dev/create-block): write a block in R.
- [Extend blockr](dev/extend-blockr): replace a board plugin or add a panel to
  the board.
- [Testing blocks](dev/testing-blocks): test blocks with `shiny::testServer()`.
