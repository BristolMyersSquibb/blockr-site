# Visualising Data

<VideoEmbed id="G5YrGtfZvhw" title="Visualising data in blockr" />

## Overview

The ggplot block creates charts using R's ggplot2 library. It provides a visual interface for the grammar of graphics: map data columns to aesthetics (x, y, color, size), choose a chart type, and blockr renders the plot in real time.

## Chart types

blockr supports a wide range of ggplot2 geometries:

| Type | Best for |
|------|----------|
| Scatter plot | Relationships between two continuous variables |
| Bar chart | Comparing categories or showing distributions |
| Line chart | Trends over time or ordered data |
| Box plot | Distribution spread and outliers by group |
| Violin plot | Detailed distribution shape by group |
| Histogram | Frequency distribution of a single variable |
| Density plot | Smoothed distribution curves |
| Area chart | Cumulative trends, stacked compositions |
| Pie / Donut | Part-of-whole comparisons |

## Customization

Beyond the basic chart, the video covers:
- **Color and fill**: map categorical or continuous columns to color
- **Faceting**: split a chart into panels by one or two variables using [facet wrap](/docs/blocks/02-visualisation#facet-wrap) or [facet grid](/docs/blocks/02-visualisation#facet-grid)
- **Themes**: change the overall look (minimal, classic, dark, etc.)
- **Grid composition**: arrange multiple plots side by side

## Next steps

- [Exporting data](exporting-data): save your results
- [Block reference: Visualisation](/docs/blocks/02-visualisation): full reference for all chart types
