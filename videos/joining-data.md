# Joining Data

<VideoEmbed id="RhDOzCKmQ7g" title="Joining data in blockr" />

## Overview

The [join block](/docs/blocks/01-wrangling#join-block) combines two datasets by matching rows on shared columns, the blockr equivalent of SQL joins or `dplyr::left_join()`.

## How it works

A join block has two input ports (unlike most blocks which have one). Connect one dataset to each port, then configure:

1. **Join columns**: which columns to match on. If the column names differ between datasets, you can map them explicitly.
2. **Join type**: how to handle non-matching rows:
   - **Left join**: keep all rows from the left dataset, fill `NA` for non-matches from the right
   - **Right join**: keep all rows from the right dataset
   - **Inner join**: keep only rows that match in both datasets
   - **Full join**: keep all rows from both datasets

## When to use joins

Joins are essential when your data lives in multiple tables. Common scenarios:
- Enriching a transaction table with customer details from a lookup table
- Combining measurements from different instruments on a shared sample ID
- Merging survey responses with demographic data

The [bind rows](/docs/blocks/01-wrangling#bind-rows-block) and [bind columns](/docs/blocks/01-wrangling#bind-columns-block) blocks handle simpler cases where you just need to stack datasets vertically or horizontally.

## Next steps

- [Visualising data](visualising-data): chart your joined results
- [Block reference: Wrangling](/docs/blocks/01-wrangling): full reference for all wrangling blocks
