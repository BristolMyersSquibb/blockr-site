# blockr.viz

Interactive, dashboard-grade output: charts with built-in aggregation and drilldown, tables, tiles and summary tables. Clicking a chart filters what is downstream of it. The right choice when people explore your board rather than read it.

<!-- GENERATED PAGE: everything below the intro comes from the block
registry via scripts/gen-block-reference.R. Do not edit by hand. -->

## Picker

`new_picker_block()` &middot; transform

Curated column pickers for locked dashboards: each picker offers a fixed set of columns and lands the pick in a stable, named output column, so downstream mappings never change. A multiple picker pivots its picks long (into + into_measure) for facetting.

| Argument | Description |
|---|---|
| `state` | Object with `pickers`: array of picker entries |

## Variable summary (Table 1)

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
| `chart_type` | Chart type. One of "bar", "waterfall", "pie", "treemap", "boxplot", "pointrange", "radar" (aggregated — use group + value + func), "scatter", "line" (individual — use x + y), or "gantt" (timeline — use x + xend + y). ... |
| `group` | Column for the categorical axis (aggregated charts). Names a data column, never a literal. |
| `color` | Column mapped to colour. All families. Names a data column, never a literal colour. null for no colour mapping. |
| `facet` | Column to facet by — one small panel per level. Optional. |
| `value` | Column to aggregate (aggregated charts only). Must match `func`: ".count" with func "count" (row counts; the value is ignored otherwise), any column with "count_distinct" (e.g. a subject id such as USUBJID to count pa... |
| `func` | Aggregation function for `value` (aggregated charts only). One of "count", "count_distinct", "mean", "median", "sum", "min", "max", "identity". Default "count" (row count; ignores `value`). "count_distinct" counts dis... |
| `na_group` | What to do with rows whose `group` value is missing. "level" (default) gives them their own category, which is how this has always behaved -- a nameless bar and a blank legend entry. "drop" removes them from the categ... |
| `pct_of` | Which mapped role a `func = "pct_distinct"` denominator is taken WITHIN: "facet" (default), "group" or "color". A cell only knows the values of the roles it is mapped on, so those three are the whole option space. It ... |
| `x` | X-axis column (individual: scatter/line; timeline: interval start). Names a data column. |
| `y` | Y-axis column (individual: scatter/line; timeline: the lane, e.g. USUBJID). Names a data column. |
| `series` | Column whose distinct values split rows into separate series (individual: one line/scatter group per value; timeline: per-bar label). Splits only — not a colour, not a drill target. Independent of color. High cardinal... |
| `xend` | Interval end column (timeline only). Rows with no end render as a dot at x. |
| `label` | Column written as on-mark text. Optional; default null = no on-mark text. For pie/treemap, null falls back to `group` (a label-less pie is unusable). Label only — does not affect colour, series, or drill. |
| `tt_fields` | Extra column names appended to each mark's hover tooltip, beyond the mapped roles (timeline/gantt, scatter, line, bar). On a bar the value shown is the group's representative (its first row) -- exact for a "None (as i... |
| `drill` | Drill-down: what a SELECTION (click or brush) filters downstream on. Tri-state: null/"" = OFF (the chart is a static display — no filter, no hover effect; the default); "auto" = ON with the family's natural target (ag... |
| `ctrl_target` | BETA. Block id of a value filter block on the SAME board: a categorical drill click's claim (e.g. SEX = F) is also pushed into that block over the board's control channel, so the drill filters a pipeline the chart has... |
| `ctrl_table` | BETA. Only with `ctrl_target`: the table in the target's dm the pushed conditions apply to (e.g. "adsl"). Leave empty when the target filters a plain data frame. |
| `smoother` | Trend overlay for scatter charts. One of "none" (default), "lm" (linear fit) or "loess" (local regression). |
| `identity_line` | Identity-line overlay for scatter charts: true draws a dashed 45-degree y = x guide line, false (default) omits it. Use for shift or agreement plots (e.g. baseline vs post-baseline). |
| `box_points` | Observation overlay for boxplots (chart_type="boxplot"): "none" (default, box only) or "outliers" (plot only the points beyond the whisker extent). Use "outliers" to flag extreme values. No-op for non-boxplot charts. |
| `summary` | Distribution statistic for the distribution marks: the point range's interval, or the boxplot's BODY. One of "median_q1_q3", "mean_sd", "mean_2sd", "mean_se", "p5_p95", "min_max". Computed in the browser from the raw ... |
| `whiskers` | Boxplot whisker rule — the box's OUTER interval: "tukey" (default, 1.5x IQR fences clipped to the data; the textbook boxplot) or any `summary` value, e.g. "min_max" for range whiskers or "p5_p95" for the clinical perc... |
| `band_window` | Distribution band (chart_type="band") windowing: "adaptive" (default) grows the window at each grid point until it holds `band_size` distinct subjects, keeping the band's reliability constant as a cohort thins; "fixed... |
| `band_size` | Distribution band window size: distinct subjects per window when `band_window="adaptive"` (default 45), or the half-width in x units when "fixed". No-op for other chart types. |
| `band_min_n` | Distribution band cut-off: grid points holding fewer than this many distinct subjects draw nothing, so the band stops rather than running through a stretch with almost no data. Default 12. No-op for other chart types. |
| `band_id` | Subject id column for the distribution band (e.g. "USUBJID"), counted DISTINCT for the window and the reported n, and carried on an outlier point's drill. Leave empty to count rows — which over-counts whenever one sub... |
| `ref_hi` | Column holding an UPPER reference limit, drawn as a dashed line (e.g. "ANRHI"). Unlike `value_lines`, which takes values, this names a column: a reference range is per-record and varies, so the block reduces it to its... |
| `ref_lo` | Column holding a LOWER reference limit, drawn as a dashed line (e.g. "ANRLO"). See `ref_hi`. Empty (default) draws nothing. |
| `connect_centers` | Pointrange only: true draws a line through the interval centers in group order — the over-visits trajectory reading (e.g. mean AVAL by AVISIT per treatment arm). Default false. |
| `count_on` | Append observation counts to labels, e.g. "Female (12)": "off" (default), "axis" (on the category-axis ticks of bar/boxplot charts), "facet" (on the facet strip labels) or "both". Pair with count_col to count distinct... |
| `count_col` | Column driving the count labels (see count_on). For an aggregating func (count/mean/...) it is an id counted DISTINCT, e.g. "USUBJID" to label groups by unique subject count. For func="identity" ("None (as is)", pre-s... |
| `facet_scales` | How the facet panels scale, like ggplot2's facet_wrap(scales=). "fixed" (default) shares ONE numeric domain and one category set / order across the panels, so equal bar lengths mean equal values. "free" lets each pane... |
| `facet_cols` | How many facet panels sit in a row, like ggplot2's facet_wrap(ncol=). null (default) is auto: as many panels per row as the card is wide. A number pins the row and the deck render follows it, so the picture keeps its ... |
| `lo` | Lower error-band column (individual line only). Set together with hi to draw a band; numeric only. |
| `hi` | Upper error-band column (individual line only). Set together with lo to draw a band; numeric only. |
| `connect` | How a line chart connects its points. "monotone" (default) draws monotone-smoothed lines (no overshoot; local extrema stay at the measured points) at every density; "straight" draws plain segments; "step-start", "step... |
| `value_lines` | Helper lines: each number draws one dashed guide line across the VALUE axis at that value (a target, a threshold, a normal-range limit). That is y on scatter/line charts and the value axis of bar, waterfall, boxplot a... |
| `x_lines` | Helper lines: each number draws one dashed VERTICAL guide line at that x position (e.g. a threshold like 5). Plain numbers, never column names. Empty = no lines. Scatter/line charts only. |
| `line_width_mult` | Line width multiplier for line charts (individual only). 1.0× is the default look; range 0.5×–3.0×. |
| `dot_size_mult` | Marker size multiplier for scatter points and line markers (individual only). 1.0× is the default; range 0.5×–3.0×. |
| `filter_type` | Runtime filter-transport state. Normally left at default "categorical"; set by interaction, not at creation. |
| `filters` | Runtime filter-transport state. The click filter: a named list, column -> values kept after the last click (NA = missing value). Usually null at creation. |
| `filter_range` | Runtime filter-transport state for brush/drag on scatter/line (x_col, y_col, x_range, y_range). Usually null at creation. |
| `filter_point` | Runtime filter-transport state for a single-point click on a scatter with no drill column (x_col, y_col, x_val, y_val). Usually null at creation. |
| `sort_by` | Category-axis ordering for aggregated charts. "value" (default for bar/pie/treemap/radar), "data" (default for boxplot/pointrange: the data's own order — factor levels when present, else first appearance in the rows, ... |
| `sort_dir` | Direction for `sort_by`. One of "asc" or "desc". Ignored for individual (scatter/line) charts. |
| `orientation` | Category-axis orientation: "horizontal" (category on the y-axis, best for long labels) or "vertical" (category on the x-axis). Presentation only — the group/value mapping is unchanged. Bar and the distribution marks (... |
| `bar_mode` | Layout for a color-split bar: "stacked" (default — color segments stack into one bar per group), "grouped" (segments sit side-by-side / dodged, for comparing absolute values), or "percent" (stacked but each group norm... |
| `value_labels` | Write each bar's value at its end: true or false (default). A stacked bar labels the stack total, a grouped bar every bar, a percent bar each segment's share. Overlapping labels are left out, the tooltip keeps every v... |
| `baseline` | Bar baseline mode: "zero" (default — every bar starts at 0) or "cumulative" (a waterfall/bridge — each bar floats from the running cumulative of the bars before it; each value is a DELTA and the step axis honors data ... |
| `waterfall_totals` | Group (step) values rendered as total/subtotal bars in a cumulative-baseline bar: their baseline resets to 0 and they show the absolute running cumulative (e.g. ["Profit"] in a Revenue -> Costs -> Profit bridge). Empt... |
| `title` | Chart title shown above the chart. Unset = auto (inherits the input data frame's label attribute when present); "" = explicitly no title. Supports {...} tokens resolved against the CURRENT data on every render, so the... |
| `subtitle` | Subtitle under the title, same {...} tokens as `title`, and the block's control surface. An {@arg} token prints one of this block's own settings and makes that word a control: the reader clicks it and picks, without o... |
| `caption` | Caption under the chart (source / footnote line), same {...} tokens as `title`. Unset = auto (inherits the input data's caption attribute when present); "" = explicitly none. |

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

## Summarize table

`new_summarize_table_block()` &middot; table

Grouped summary table with graphical cells — an ordered list of summary columns (count/mean bars, box / point-range distributions, interval swimlanes, sparklines, text stats, group facts) over one grouping, with facet, search, sort and click-to-filter drill-down

| Argument | Description |
|---|---|
| `group` | Column giving the rows: one row per level. The one required argument (e.g. AEDECOD for most-frequent adverse events, USUBJID for a per-subject swimlane). |
| `summaries` | The summarize-table mode: an ordered list of summary columns, one object per column; non-empty it REPLACES the flat bar mappings. Each object: type = simple (func + col, shown as bar, number or dot), dist (col + stat,... |
| `by` | Grouping columns for the summaries mode, outer to inner (at most two; the outer becomes the expandable parent). One table row per key combination. |
| `facet_layout` | Facet column order in the summaries mode: by_summary = each summary's level copies adjacent on one shared scale (comparison reading, default); by_level = pooled columns and fields lead, then one spanning column group ... |
| `func` | How the measure is computed: count (rows), count_distinct (distinct values of `id_var` -- use this for "subjects with at least one event", the clinical default), sum / mean / median / min / max of `value`, or identity... |
| `value` | Numeric column reduced by sum / mean / median / min / max, or shown as-is by identity. Unused by count. |
| `id_var` | Subject identifier counted by count_distinct, so one subject with three events counts once. |
| `parent` | Optional outer grouping column (e.g. AEBODSYS over AEDECOD): parents become expandable rows with their children indented under them. Each level is aggregated in its own pass, so a parent is never the sum of its children. |
| `color` | Optional column splitting each bar into segments (e.g. AESEV). Composes with `facet`: each facet column's bars are then split by this column. |
| `bar_mode` | Layout of a colour split: stacked (segments to scale), grouped (one thin bar per level, side by side) or percent (each row normalized to 100%). No-op without `color`. Stacking needs an additive measure (count, count d... |
| `facet` | Optional column giving one bar column per level, all on one shared scale (e.g. TRTA -- one column per treatment arm). Composes with `color`. |
| `cols` | Opt-in separate numeric columns beside the bar: n, pct, or both. Leave unset for the default -- the bar cell carries its own value label. |
| `fields` | Extra columns from the underlying row, shown as real columns beside the bar (the chart's tooltip fields). Only meaningful with func = "identity", where each group IS one row. |
| `sort_by` | Ordering: value (the measure), data (the data's own order -- factor levels, else first appearance in the rows: use it for visits and dose groups, which read wrong alphabetically), label (alphabetical), a summary colum... |
| `sort_dir` | Sort direction. |
| `top_n` | Optional cap on the number of ranked rows, with a visible fold row for what falls below the cut. Leave unset for the default behaviour: every row rendered, scrolling with the panel. Set it only for report exhibits, wh... |
| `max_height` | Leave unset: the table scrolls with its panel. A CSS length puts it in a box of that height instead. |
| `sortable` | Allow click-to-sort on the column headers. FALSE freezes the configured order -- for exhibits whose row order carries meaning (visits, dose groups), where a stray click would scramble it. |
| `search` | Show the search input above the table. |
| `axis` | Print each glyph column's domain as a tick strip under its header (default TRUE) -- the scale named once at the top of the column instead of a track repeated on every row. Applies to every mark: value domain for bars,... |
| `bar_width` | Length of the marks that carry a value label (bars, boxes, dot ranges, sparklines): fit (default) fills the panel up to 320px; narrow, medium and wide fix them at 90, 150 and 240px. |
| `drill` | Turns the row click on (any of the grouping columns). A click filters downstream to that row's rows: a parent row of a nested table on its outer column, a child row on both columns. Same filter contract as the chart a... |
| `ctrl_target` | BETA. Block id of a value filter block on the SAME board: the drill's claim (e.g. AEDECOD = PRURITUS) is also pushed into that block over the board's control channel, so a row click filters a pipeline this block has n... |
| `ctrl_table` | BETA. Only with `ctrl_target`: the table in the target's dm the pushed conditions apply to (e.g. "adae"). Leave empty when the target filters a plain data frame. |
| `title` | Title above the table. Unset = auto (inherits the input data frame's label attribute when present); "" = explicitly none. Supports {...} tokens resolved against the CURRENT data on every render: {col} = the distinct v... |
| `subtitle` | Subtitle under the title, same {...} tokens as `title`. |
| `caption` | Caption under the table (source / footnote line), same {...} tokens. |

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
| `title` | Table title shown above the table. Unset = auto (inherits the input data frame's label attribute when present); "" = explicitly no title. Supports {...} tokens resolved against the CURRENT data on every render, so the... |
| `subtitle` | Subtitle under the title, same {...} tokens as `title`. Unset = auto (inherits the input data's subtitle attribute when present, e.g. from a composer table); "" = explicitly none. |
| `caption` | Caption under the table (source / footnote line), same {...} tokens as `title`. Unset = auto (inherits the input data's caption attribute when present); "" = explicitly none. |

