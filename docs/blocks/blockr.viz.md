# blockr.viz

Interactive, dashboard-grade output: charts with built-in aggregation and drilldown, tables, tiles and summary tables. Clicking a chart filters what is downstream of it. The right choice when people explore your board rather than read it.

::: info Generated page
Everything below the intro comes from the block registry
(`scripts/gen-block-reference.R`). Do not edit by hand.
:::

## Summary Table

`new_summary_table_block()` &middot; transform

Wide, display-shaped multi-variable summary (list of variables by Y pattern). Successor to tidy_summary_block.

| Argument | Description |
|---|---|
| `vars` | Character, variables to summarise — each becomes a row-section. Handles numeric, categorical, and logical columns; logicals are rendered as a one-row TRUE count for pharma flag variables. |
| `sections` | Character, OUTER grouping columns that CONTAIN the `vars`, 0..N — use ONLY for a true nesting hierarchy such as SOC containing PT; leave empty for a flat list of variables. |
| `by` | Character, column-split dimensions, 0..2. |
| `stats` | Statistics emitted for each NUMERIC variable, any combination of: "n", "n_pct" (non-missing n and % of group rows), "mean", "sd", "mean_sd", "median", "median_q1_q3", "q1_q3", "min_max". ONE key = a single row per var... |
| `add_overall` | Logical, append an overall column across all `by` levels. |
| `overall_label` | Label for the overall column, default "Total". |
| `indent_details` | Logical, default TRUE — indent detail rows under their variable header; rarely changed. |
| `nest_hierarchies` | Logical, default FALSE — advanced row-side drill-down for adjacent functionally-dependent categorical vars; leave FALSE unless asked. |
| `id_var` | OPTIONAL subject-identifier column name, e.g. "USUBJID": when set, counts and percentages are over DISTINCT values of this column instead of row counts — set it whenever the data is event-level/long, i.e. multiple row... |

## Chart

`new_chart_block()` &middot; plot

Configurable chart with click-to-filter drill-down

| Argument | Description |
|---|---|
| `chart_type` | Chart type. One of "bar", "waterfall", "pie", "treemap", "boxplot", "radar" (aggregated — use group + value + func), "scatter", "line" (individual — use x + y), or "gantt" (timeline — use x + xend + y). Default "bar".... |
| `group` | Column for the categorical axis (aggregated charts). Names a data column, never a literal. |
| `color` | Column mapped to colour. All families. Names a data column, never a literal colour. null for no colour mapping. |
| `facet` | Column to facet by — one small panel per level. Optional. |
| `value` | Column to aggregate (aggregated charts only). Must match `func`: ".count" with func "count" (row counts; the value is ignored otherwise), any column with "count_distinct" (e.g. a subject id such as USUBJID to count pa... |
| `func` | Aggregation function for `value` (aggregated charts only). One of "count", "count_distinct", "mean", "median", "sum", "min", "max". Default "count" (row count; ignores `value`). "count_distinct" counts distinct `value... |
| `x` | X-axis column (individual: scatter/line; timeline: interval start). Names a data column. |
| `y` | Y-axis column (individual: scatter/line; timeline: the lane, e.g. USUBJID). Names a data column. |
| `series` | Column whose distinct values split rows into separate series (individual: one line/scatter group per value; timeline: per-bar label). Splits only — not a colour, not a drill target. Independent of color. High cardinal... |
| `xend` | Interval end column (timeline only). Rows with no end render as a dot at x. |
| `label` | Column written as on-mark text. Optional; default null = no on-mark text. For pie/treemap, null falls back to `group` (a label-less pie is unusable). Label only — does not affect colour, series, or drill. |
| `tt_fields` | Extra column names appended to each mark's hover tooltip, beyond the mapped roles (timeline/gantt). Display-only — never affects the plot; a listed column dropped upstream is silently omitted. Empty = no extra tooltip... |
| `drill` | Drill-down: what a SELECTION (click or brush) filters downstream on. Tri-state: null/"" = OFF (the chart is a static display — no filter, no hover effect; the default); "auto" = ON with the family's natural target (ag... |
| `ctrl_target` | BETA. Block id of a value filter block on the SAME board: a categorical drill click's claim (e.g. SEX = F) is also pushed into that block over the board's control channel, so the drill filters a pipeline the chart has... |
| `ctrl_table` | BETA. Only with `ctrl_target`: the table in the target's dm the pushed conditions apply to (e.g. "adsl"). Leave empty when the target filters a plain data frame. |
| `smoother` | Trend overlay for scatter charts. One of "none" (default), "lm" (linear fit) or "loess" (local regression). |
| `identity_line` | Identity-line overlay for scatter charts: true draws a dashed 45-degree y = x guide line, false (default) omits it. Use for shift or agreement plots (e.g. baseline vs post-baseline). |
| `box_points` | Observation overlay for boxplots (chart_type="boxplot"): "none" (default, box only), "outliers" (plot only the points beyond the 1.5x IQR whiskers) or "all" (a jittered strip of every observation drawn over the box). ... |
| `lo` | Lower error-band column (individual line only). Set together with hi to draw a band; numeric only. |
| `hi` | Upper error-band column (individual line only). Set together with lo to draw a band; numeric only. |
| `step` | Step-line mode for line charts. null (default) draws straight segments; "start", "middle" or "end" draw a stepped line (where along the interval the vertical jump happens). Use for values that hold between observation... |
| `vlines` | Helper lines: each number draws one dashed VERTICAL guide line at that x position (e.g. a threshold like 5). Plain numbers, never column names. Empty = no vertical lines. Scatter/line charts. |
| `hlines` | Helper lines: each number draws one dashed HORIZONTAL guide line at that y position (e.g. a normal-range limit). Plain numbers, never column names. Empty = no horizontal lines. Scatter/line charts. |
| `line_width_mult` | Line width multiplier for line charts (individual only). 1.0× is the default look; range 0.5×–3.0×. |
| `dot_size_mult` | Marker size multiplier for scatter points and line markers (individual only). 1.0× is the default; range 0.5×–3.0×. |
| `filter_type` | Runtime filter-transport state. Normally left at default "categorical"; set by interaction, not at creation. |
| `filter_column` | Runtime filter-transport state. The column the last click filtered on. Usually null at creation. |
| `filter_values` | Runtime filter-transport state. Values kept after the last click. Usually null at creation. |
| `filter_range` | Runtime filter-transport state for brush/drag on scatter/line (x_col, y_col, x_range, y_range). Usually null at creation. |
| `filter_point` | Runtime filter-transport state for a single-point click on a scatter with no drill column (x_col, y_col, x_val, y_val). Usually null at creation. |
| `sort_by` | Category-axis ordering for aggregated charts. "value" (default), "alpha", or a column name. For timeline: "onset" (default), "alpha", or a column name. Ignored for individual (scatter/line) charts. |
| `sort_dir` | Direction for `sort_by`. One of "asc" or "desc". Ignored for individual (scatter/line) charts. |
| `orientation` | Bar orientation: "horizontal" (default; category on the y-axis, best for long labels) or "vertical". Presentation only — the group/value mapping is unchanged. Bar charts only. |
| `bar_mode` | Layout for a color-split bar: "stacked" (default — color segments stack into one bar per group), "grouped" (segments sit side-by-side / dodged, for comparing absolute values), or "percent" (stacked but each group norm... |
| `baseline` | Bar baseline mode: "zero" (default — every bar starts at 0) or "cumulative" (a waterfall/bridge — each bar floats from the running cumulative of the bars before it; each value is a DELTA and the step axis honors data ... |
| `waterfall_totals` | Group (step) values rendered as total/subtotal bars in a cumulative-baseline bar: their baseline resets to 0 and they show the absolute running cumulative (e.g. ["Profit"] in a Revenue -> Costs -> Profit bridge). Empt... |

## Tile

`new_tile_block()` &middot; plot

Scorecard of bold KPI numbers — cards or an aligned matrix, with deltas / fills / status pills and click-to-filter drill. A pure renderer (shape upstream).

| Argument | Description |
|---|---|
| `value` | Numeric column(s) shown as the big number. One column for a long tile frame; MULTIPLE columns for wide input (each column becomes a measure / card, measure name = column name). Required. |
| `group` | Grouping column: clusters cards / drives the matrix rows, and is the dplyr::group_by column when `summaries` aggregate the input in place. One column (a KPI clusters by a single dimension). Optional; "" = a single ung... |
| `name` | The column NAMING each KPI, for LONG input (one row per group x measure); the name shows above the value and drives per-KPI number formatting and the matrix columns. Leave "" for wide input — then the `value` column n... |
| `color` | Categorical identity color ("Color by") -- the SAME argument as the chart's `color`, applied to cards: the tile's `group` column or its `name` column; each card / matrix row gets a scale-map accent in that value's col... |
| `summaries` | In-block aggregations shown as cards: a list, each entry `{func, cols}`. `func` is one of "count", "count_distinct", "mean", "median", "sum", "min", "max"; `cols` the numeric column(s) it reduces. Empty `cols` on a NU... |
| `layout` | Layout: "cards" (grid of cards) or "table" (aligned matrix). |
| `secondary` | A PRECOMPUTED reference column drawn beside the value (a delta, a fraction, a status). The renderer does no arithmetic — compute the comparison upstream. Optional; "" = no secondary. |
| `style` | How to draw the secondary: "plain" (show the reference), "delta" (arrow + %, colored by sign), "fill" (progress bar to a fraction), "pill" (status chip). |
| `format` | How the NUMBER is formatted (never a currency guess): "number" (separators + smart decimals, default), "compact" (1.2M / 38.4K), or "percent" (a fraction x100 + %). |
| `unit` | Free-text unit label shown next to the value / in the matrix header (e.g. "USD", "CHF", "apples", "kg"). This is how you label a currency — the renderer never infers "$". |
| `caption` | Subtext below the value: a column name (per-cell) or a literal. |
| `drill` | When TRUE, clicking a card / matrix row emits a categorical filter downstream (the same contract as the chart / table). The filter column is determined by the tile's structure, never picked: the `group` column when gr... |
| `ctrl_target` | BETA. Block id of a value filter block on the SAME board: the drill's claim (e.g. SEX = F) is also pushed into that block over the board's control channel, so the drill filters a pipeline the tile has no data link to.... |
| `ctrl_table` | BETA. Only with `ctrl_target`: the table in the target's dm the pushed conditions apply to (e.g. "adsl"). Leave empty when the target filters a plain data frame. |

## gt Table

`new_gt_table_block()` &middot; table

Render wide-format tables (from summary_table) as styled gt tables — static / print / CSR output.

| Argument | Description |
|---|---|
| `title` | Table title rendered above the table. Empty string for no title. |
| `subtitle` | Subtitle rendered under the title. Empty string for no subtitle. |
| `full_width` | Logical. TRUE (default) makes the table span the container width. |
| `borders` | Logical. TRUE (default) draws 2px top/bottom/heading borders in the pharma SAP style. |
| `na_rep` | String used to render missing (NA) cells. Default is an em dash. |

## Table

`new_table_block()` &middot; table

Interactive table (sticky header, sort, search) with optional cell coloring and click-to-filter drill-down

| Argument | Description |
|---|---|
| `group` | Grouping column(s) to aggregate over. One or more categorical columns (nested from outer to inner). Empty = no grouping (a raw row-level table). |
| `summaries` | The aggregations shown: a list, each entry `{func, cols}`. `func` is one of "count", "count_distinct", "mean", "median", "sum", "min", "max"; `cols` is the numeric column(s) it reduces. One entry per aggregation, so m... |
| `rowname` | The single column shown as the row labels (the left-hand stub). Names a data column; defaults to the first column. |
| `value` | The columns rendered as the table body (the data cells). When the user names specific value/measure columns, set this to EXACTLY those columns -- do not leave it null. Leave null only to mean 'all columns except `rown... |
| `color` | Categorical identity color ("Color by") -- the SAME argument as the chart's `color`, applied to rows: names one categorical column whose values tint the rows through the board scale map, so a SEX-colored table matches... |
| `shadings` | Cell value-encoding rules: a list, each entry `{mode, cols}` (same shape family as `summaries`). `mode` is "diverging" (correlation matrices, centred on 0), "sequential" (heatmaps), or "bar" (an in-cell data bar propo... |
| `drill` | Row-click drill-down. Optional; default null = a click is inert (drill is opt-in everywhere). RAW table: a column name — clicking a row emits a categorical filter on that column's value (the same filter contract as th... |
| `digits` | Decimal places for numeric display. Default 2. |
| `ctrl_target` | BETA. Block id of a value filter block on the SAME board: the drill's claim (e.g. SEX = F) is also pushed into that block over the board's control channel, so the drill filters a pipeline the table has no data link to... |
| `ctrl_table` | BETA. Only with `ctrl_target`: the table in the target's dm the pushed conditions apply to (e.g. "adsl"). Leave empty when the target filters a plain data frame. |

