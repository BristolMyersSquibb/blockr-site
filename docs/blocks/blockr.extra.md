# blockr.extra

Utilities that don't fit a theme: the function block for custom R code inside a workflow, search, compare, labeling and more.

::: info Generated page
Everything below the intro comes from the block registry
(`scripts/gen-block-reference.R`). Do not edit by hand.
:::

## Async Function block

`new_async_function_block()` &middot; transform

Transform data with a custom R function asynchronously. Requires mirai daemons. Click Run to execute.

## Broom Summary

`new_broom_summary_block()` &middot; transform

Model summary using broom (tidy/glance/augment). Works with any broom-compatible model.

## Cohort filter sender

`new_ctrl_filter_block()` &middot; transform

Push the drilled-to condition of an upstream table, chart or tile into a value filter block elsewhere on the board (no data link). Click a level to narrow the cohort, re-click to clear. Passes its input through unchanged.

| Argument | Description |
|---|---|
| `target` | Block id of the value filter block to send the drilled cohort to. Empty means not configured: the block passes data through and sends nothing. |
| `table` | Name of the table in the target filter's `dm` that the conditions apply to. |
| `columns` | Source columns a click may claim. Leave empty when the upstream is a table or summary block; set it to the chart's drill column(s) when the upstream is a chart or tile. |
| `label` | Name of the target as shown on the receipt. Defaults to the target block id. |

## Compare

`new_compare_block()` &middot; transform

Compare two data frames on key columns and compute diff metrics on measurement columns.

## Function block

`new_function_block()` &middot; transform

Transform data with a custom R function in a CodeMirror editor (syntax highlighting, autocomplete, inline AI diff). UI auto-generated from function arguments.

| Argument | Description |
|---|---|
| `fn` | A string of R code that evaluates to a function. The function must have 'data' as its first argument (the input data frame). Additional arguments with defaults become UI widgets. |

## Function Var block

`new_function_var_block()` &middot; transform

Transform multiple data frames (...) with a custom R function. UI auto-generated from function arguments.

| Argument | Description |
|---|---|
| `fn` | A string of R code that evaluates to a function. The function must have '...' as its first argument (variadic data frame inputs). Additional arguments with defaults become UI widgets. |

## Labeler

`new_labeler_block()` &middot; transform

Add or edit column labels (the `attr(col, "label")` attribute shown in column pickers and table headers). Empty label removes it.

| Argument | Description |
|---|---|
| `labels` | Named list mapping column names to label strings. An empty string removes the column's label. |

## Latest

`new_latest_block()` &middot; transform

Forward the value of whichever variadic input most recently changed (latest-wins merge / switch). Bridges multiple drill-down charts into one downstream block.

## Search

`new_search_block()` &middot; transform

Filter rows by case-insensitive substring match across all columns.

