# blockr.viz

Interactive, dashboard-grade output: a chart block with built-in aggregation and drilldown, and a table block for rows, group summaries and Table 1 summaries. Clicking a chart filters what is downstream of it. The right choice when people explore your board rather than read it.

<!-- GENERATED PAGE: everything below the intro comes from the block
registry via scripts/gen-block-reference.R. Do not edit by hand. -->

## Chart

`new_chart_block()` &middot; plot

Configurable chart with click-to-filter drill-down

| Argument | Description |
|---|---|
| `type` | Chart type. Aggregated: bar, waterfall, pie, treemap, boxplot, pointrange. One mark per row: scatter, line, area, band. Also histogram and gantt (intervals on lanes). |
| `category` | Column whose values become the bars, slices, tiles, boxes or points: one mark per value. The same whichever way a bar lies. |
| `value` | Column `func` aggregates per category; unused by `func = "count"`. Boxplot and pointrange: the column whose spread each box or point range shows. |
| `func` | Aggregation of `value` per category. "identity" draws the value as is; "pct_distinct" is the share of the panel's distinct values (see `percent_of`). |
| `x` | Column on the horizontal axis of a scatter, line, area or band. Histogram: the column that is binned. Gantt: the interval start. |
| `xend` | Interval end. A row without an end is drawn as a dot at `x`. |
| `open` | Logical column. TRUE draws an arrowhead after the bar's end (still ongoing); a TRUE row without an end runs to the last x drawn. |
| `y` | Column on the vertical axis. Gantt: the lane. |
| `color` | Column mapped to color, at most 15 levels. |
| `facet` | Column to facet by, one small panel per level. |
| `facet_row` | Column whose levels make the rows of a panel grid, `facet` making its columns. Each row gets its own y scale when `facet_scales` is "free_y" or "free". |
| `series` | Column whose values split rows into separate series: one line or point group per value, the bar label on a gantt. |
| `label` | Column written on the marks. A bar, slice or tile shows it only when its rows agree on one value. |
| `orientation` | Which way a bar, boxplot or pointrange lies. It changes no mapping: `category` stays the category either way. |
| `position` | Layout of a color split: stacked, side by side, or to 100%. |
| `sort_by` | Category order: "value", "data", "alpha", or a column (its per-category minimum). Gantt: "onset", "alpha" or a column. NULL: "data" for date, numeric and factor categories, else "value". |
| `sort_dir` | Sort direction. |
| `value_labels` | TRUE writes each bar's value at its end: a stack its total, a filled bar each share. |
| `format` | How numbers print: "number" (separators and up to two decimals, trailing zeros dropped; a value that would round to 0 keeps two significant digits), "compact" (1.2K, 3.4M), "percent" (a fraction times 100, with "%"), ... |
| `unit` | Free text printed after the number ("CHF"); headers carry it once. |
| `y_transform` | "log10" draws a base-10 y axis. Values at or below zero are not drawn; a note under the chart counts them. |
| `x_transform` | As `y_transform`, for the x axis of a scatter. |
| `x_limits` | The x axis from and to, as `c(0, 100)`; `NA` at either end is auto. Dates as "2024-01-01". Marks outside are cut off, not dropped from the data. Drag zoom works inside the limits, and a reset returns to them. A subtit... |
| `y_limits` | As `x_limits`, for the value axis: y on a scatter, line, area or band, `value`'s axis on the aggregated types, whichever way they lie. |
| `x_ticks` | Where the x axis puts its ticks. One number is a step: `10` ticks every 10, at its multiples. On a date axis the step takes a unit, "7 days", "2 weeks", "month", "quarter" or "year"; days and weeks count from the axis... |
| `y_ticks` | As `x_ticks`, for the value axis: y on a scatter, line, area or band, `value`'s axis on the aggregated types, whichever way they lie. |
| `tooltip` | Extra columns shown in each mark's tooltip. |
| `drill` | Column a click filters downstream on, or "auto" for the type's natural target (the clicked group, bin or lane). |
| `line_width` | Line width relative to the default (1). |
| `point_size` | Marker size relative to the default (1). |
| `connect` | How a line connects its points. |
| `value_lines` | Positions of dashed reference lines across the value axis: `value`'s axis, y on a scatter, line, area or histogram. Names are labels. Text form: "Target: 4; 6". |
| `x_lines` | Positions of dashed reference lines across x, or across a bar's category axis: numbers, dates or category values. Names are labels. |
| `ymin` | Columns holding the lower end of an interval per row, the first the outermost. A line draws shaded bands, a scatter error bars. |
| `ymax` | Columns holding the upper end of an interval, as `ymin`. |
| `linetype` | Column whose values set a line's dash: the first value is solid, the others dashed. |
| `shape` | Column whose values set each point's marker: circle, triangle, diamond, square, rounded square, pin, arrow, then again. Levels in factor order, else sorted; a missing value is a circle. A line chart shows its points w... |
| `x_ranges` | Named stretches of x shaded behind the marks, as `list(Recession = c("2008-01-01", "2009-06-30"))`. Text form: "Recession: 2008-01-01 to 2009-06-30; ...". |
| `legend` | Where the color legend goes. "marks" writes the names on the marks where the type has room, and keeps the legend elsewhere. |
| `highlight` | One column and some of its values, as `list(country = "Switzerland")`. Matching marks keep their color; every other mark is gray. |
| `smoother` | Trend line, fit per color or series group and per panel. |
| `identity_line` | TRUE draws a dashed y = x line. |
| `box_points` | "outliers" draws the points beyond the whiskers. |
| `summary` | Statistic of a boxplot's body, a pointrange's interval or a band's inner range. |
| `whiskers` | Outer interval: Tukey fences or any `summary` statistic. |
| `connect_centers` | TRUE joins a pointrange's centers in category order. |
| `band_window` | "adaptive" grows the window at each point until it holds `band_size` individuals; "fixed" uses `band_size` as a half-width in x units. |
| `band_size` | Individuals per window, or the half-width; see `band_window`. |
| `band_min_n` | Points with fewer individuals than this are not drawn. |
| `id` | Column that identifies an individual, counted distinct by the band and by `show_n`. |
| `ref_min` | Column holding a lower reference limit per row, drawn as a dashed line at its median and labelled with its spread. |
| `ref_max` | Column holding an upper reference limit per row, as `ref_min`. |
| `ref_lines` | Columns holding reference limits (a normal range, grade thresholds). Per panel, each column with a value in the panel's rows draws a dashed horizontal line at the mean of those values, labelled with the column's label... |
| `ref_line_colors` | Colors of the `ref_lines`, by column, as `list(LLN = "#4DAF4A", ULN = "#4DAF4A")`. A column without one takes the reference line color. |
| `waterfall_totals` | Steps of a waterfall drawn as totals, from zero. |
| `bins` | About how many bins x is cut into, at readable breaks. |
| `show_n` | Observation counts in labels, e.g. "Female (12)". |
| `missing` | Rows whose category is missing: "level" gives them their own ("(Missing)"; a click on it gives the rows with no value), "drop" removes them from the categories. |
| `percent_of` | The role whose levels a `pct_distinct` denominator is taken within, or "total" for the whole chart. |
| `facet_scales` | "fixed" shares one scale across panels, "free" lets each panel size itself, "free_y" frees y only (scatter, line and band). In a grid (`facet_row`) "free_y" shares the value axis within a row (x on horizontal bars and... |
| `facet_cols` | Panels per row. NULL fits as many as the card is wide. |
| `download` | TRUE offers the block for download. |
| `title` | Text above the block. NULL uses the input's label, "" shows nothing, any other string is a template resolved against the data: `{col}`, `{label(col)}`, `{n}`, `{n_distinct(col)}`, `{filters}`, `{@arg}` (one of the blo... |
| `subtitle` | Text under the title, a template as `title`. |
| `caption` | Text below the block, a template as `title`. Defaults to the option `blockr.viz.default_caption`. |
| `drill_target` | Beta. The id of a filter block a click is sent to, or "auto" for the board's drill destination. With a target set a click is an event and the block holds no selection. |
| `drill_table` | Beta. The table in the target's dm the click applies to. |

## Table

`new_table_block()` &middot; table

Interactive table: the input rows (cell colouring, finished tables from R code) or one row per group with a column per summary (count/mean bars, box / point-range distributions, swimlanes, sparklines, text stats), or a Table 1 with one row per statistic of each variable and a column per group, with search, sort and click-to-filter drill-down. Drawn as a table, a compact matrix, or KPI cards (one card per summary: its number in large type and its glyph)

| Argument | Description |
|---|---|
| `layout` | What a row is: "records" (the input rows), "groups" (one row per level of `by`, one column per summary) or "variables" (a Table 1: one row per statistic or level, one column per level of `by`). |
| `by` | Grouping columns, outer first, at most two. Records: rows under one collapsible header per level. Groups: one row per level. Variables: one column per level. |
| `rowname` | The stub column: first column, row label. |
| `columns` | Columns shown beside the row names, in order. |
| `summaries` | Groups: the table's columns. Variables: its variables. An ordered list of typed summaries, each `list(type = , ...)`: simple, dist, field, sparkline, spans, pair, expr, custom. Keys per type: see the Summaries section... |
| `id` | Column whose distinct values are counted instead of rows, so a count reads as "subjects with at least one event". |
| `percent_of` | The base of a count's percentage: the rows of the column's own facet level, or the table. |
| `missing` | Rows whose category is missing: "level" gives them their own ("(Missing)"; a click on it gives the rows with no value), "drop" removes them from the categories. |
| `color` | Column whose colors tint the rows, from the board's scale map. "auto" uses the stub column when the scale map has it. |
| `shadings` | Cell color rules, each `list(mode, columns, domain)` with `mode` one of "diverging", "sequential", "bar". A column belongs to the first rule that names it. |
| `format` | How numbers print: "number" (separators and up to two decimals, trailing zeros dropped; a value that would round to 0 keeps two significant digits), "compact" (1.2K, 3.4M), "percent" (a fraction times 100, with "%"), ... |
| `unit` | Free text printed after the number ("CHF"); headers carry it once. |
| `look` | "compact" rotates the column titles and draws `tile` summaries as square cells (a heatmap). "cards" draws one card per summary (groups) or per column (records). |
| `facet_layout` | Column order of faceted summaries. "by_level" needs exactly one facet column in the table. |
| `group_rows` | What the outer rows of a nested table (two `by` columns) show. "name": the group's name and its number of rows, across the row, with the groups open. "summary": every summary over the group's rows, on the group's line... |
| `open` | With `group_rows = "summary"`, whether the outer rows start closed ("none") or open ("all"). The header's button opens and closes them all either way. |
| `row_sections` | Column naming the section each inner row of a nested table belongs to. An outer row whose inner rows fall in more than one section shows each section's name, in small bold type, above its first row. One section: no ti... |
| `row_groups` | Column whose value groups the outer rows: each value heads its rows, which a click on it folds, in the column's level order (a factor) or alphabetical. An outer row takes the first value its records have; rows without... |
| `sort_by` | Row order: "value", "data", "alpha", a summary's name, a facet level, or a numeric column (its per-row minimum). |
| `sort_dir` | Sort direction. |
| `top_n` | Rows past the cut fold into one "Other" row. |
| `value_labels` | TRUE writes each mark's number beside it. |
| `column_axis` | TRUE draws the domain strip under each glyph column. |
| `bar_width` | Mark length: fit the column, or 90, 150 or 240 px. |
| `drill` | Turns the row click on. Records: the column a click filters on, "auto", or "source" (the input's source rows). Groups and variables: "auto". |
| `search` | Show the search input. |
| `sortable` | Allow sorting by the column headers. |
| `collapsible` | Allow collapsing the group rows of a nested table. |
| `download` | TRUE offers the block for download. |
| `stats` | Rows shown for numeric variables, in the order given. |
| `sections` | Outer header rows above the variables. |
| `total` | TRUE adds a column over all levels of `by`. |
| `total_label` | Header of the overall column. |
| `nest` | TRUE nests adjacent categorical hierarchies. |
| `title` | Text above the block. NULL uses the input's label, "" shows nothing, any other string is a template resolved against the data: `{col}`, `{label(col)}`, `{n}`, `{n_distinct(col)}`, `{filters}`, `{@arg}` (one of the blo... |
| `subtitle` | Text under the title, a template as `title`. |
| `caption` | Text below the block, a template as `title`. Defaults to the option `blockr.viz.default_caption`. |
| `drill_target` | Beta. The id of a filter block a click is sent to, or "auto" for the board's drill destination. With a target set a click is an event and the block holds no selection. |
| `drill_table` | Beta. The table in the target's dm the click applies to. |

