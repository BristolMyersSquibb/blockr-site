# blockr.ggplot

Static plots the way R users know them: a chart type, aesthetic mappings, facets. The right choice for a figure; for charts your dashboard users click, see blockr.viz.

::: info Generated page
Everything below the intro comes from the block registry
(`scripts/gen-block-reference.R`). Do not edit by hand.
:::

## Facet

`new_facet_block()` &middot; plot

Split plots into multiple panels based on categorical variables

| Argument | Description |
|---|---|
| `facet_type` | "wrap" (one variable, flexible layout) or "grid" (row/column matrix) |
| `facets` | Array of column names for facet_wrap (used when facet_type is wrap) |
| `rows` | Array of column names for grid rows (used when facet_type is grid) |
| `cols` | Array of column names for grid columns (used when facet_type is grid) |
| `ncol` | Number of columns for wrap: "1"-"5", or "" for auto |
| `nrow` | Number of rows for wrap: "1"-"5", or "" for auto |
| `scales` | "fixed", "free", "free_x", or "free_y" |
| `labeller` | "label_value", "label_both", or "label_parsed" |
| `dir` | "h" (horizontal) or "v" (vertical) -- fill direction for wrap |
| `space` | "fixed", "free_x", or "free_y" -- panel sizing for grid |

## ggplot

`new_ggplot_block()` &middot; plot

Create visualizations including scatter plots, bar charts, line graphs, histograms, and more

| Argument | Description |
|---|---|
| `type` | Plot type. Valid values: "point", "bar", "col", "line", "histogram", "density", "boxplot", "violin", "pie". NOTE: "scatter" is NOT valid -- use "point" for scatter plots. |
| `x` | Column name from the data (required for all plot types) |
| `y` | Column name from the data, or "(none)". For bar and histogram, set y = "(none)" to auto-count. For pie, y = "(none)" means equal slices. All other types require a real column name for y. |
| `color` | Column name for color aesthetic, or "(none)" to omit |
| `fill` | Column name for fill aesthetic, or "(none)" to omit |
| `size` | Column name for size aesthetic, or "(none)" to omit |
| `shape` | Column name for shape aesthetic, or "(none)" to omit |
| `linetype` | Column name for linetype aesthetic, or "(none)" to omit |
| `group` | Column name for group aesthetic, or "(none)" to omit |
| `alpha` | Column name for alpha aesthetic, or "(none)" to omit |
| `density_alpha` | Number between 0 and 1, opacity for density plots (default 0.8) |
| `position` | "stack", "dodge", or "fill" -- position adjustment for bar/col/histogram |
| `bins` | Integer, number of bins for histogram (default 30) |
| `donut` | Boolean, if true render pie chart as donut (only applies to pie type) |

## Grid

`new_grid_block()` &middot; plot

Combine multiple ggplot objects into a grid layout with annotations

| Argument | Description |
|---|---|
| `ncol` | Number of columns: "1", "2", "3", "4", "5", or "" for auto |
| `nrow` | Number of rows: "1", "2", "3", "4", "5", or "" for auto |
| `title` | Overall grid title string, or "" for none |
| `subtitle` | Grid subtitle string, or "" for none |
| `caption` | Grid caption string, or "" for none |
| `tag_levels` | Panel tag labels: "A" (uppercase), "a" (lowercase), "1" (numeric), "I" (roman), "i" (roman lower), or "" for none |
| `guides` | "auto", "collect", or "keep". Use "collect" to share legends across plots |

## Theme

`new_theme_block()` &middot; plot

Customize plot appearance including colors, fonts, backgrounds, and grid lines

| Argument | Description |
|---|---|
| `base_theme` | Base ggplot2 theme: "auto", "minimal", "classic", "gray", "bw", "light", "dark", "void". Additional themes available if packages installed: "economist", "fivethirtyeight", "tufte", "wsj", "gdocs", "calc", "solarized",... |
| `legend_position` | "auto", "right", "left", "top", "bottom", "none" |
| `palette_fill` | Fill color palette: "auto", "viridis_d", "viridis_c", "magma_d", "magma_c", "plasma_d", "plasma_c", "ggplot2" |
| `palette_colour` | Colour palette: "auto", "viridis_d", "viridis_c", "magma_d", "magma_c", "plasma_d", "plasma_c", "ggplot2" |
| `base_size` | "auto" or a numeric string (e.g. "14") for base font size |
| `base_family` | "auto", "sans", "serif", or "mono" |
| `panel_bg` | Hex color string for panel background (e.g. "#FFFFFF"), or "" for theme default |
| `plot_bg` | Hex color string for plot background, or "" for theme default |
| `grid_color` | Hex color string for grid lines, or "" for theme default |
| `show_major_grid` | "auto", "show", or "hide" |
| `show_minor_grid` | "auto", "show", or "hide" |
| `show_panel_border` | "auto", "show", or "hide" |

