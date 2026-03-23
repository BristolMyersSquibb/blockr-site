# Filtering and Selecting

Three videos covering how to subset your data: filter rows by condition, pick specific columns, and sort the result.

## Filtering data

<VideoEmbed id="HMewxznTWFg" title="Filtering data in blockr" />

The [filter block](/docs/blocks/01-wrangling#filter-block) provides a point-and-click interface for subsetting rows. Select a column, pick the values you want to keep (or exclude), and chain multiple conditions with AND/OR logic. For more complex conditions like numeric comparisons (`price > 100`), use the filter expression block instead.

## Selecting columns and rows

<VideoEmbed id="BS64ELoqhmM" title="Selecting columns and rows in blockr" />

The [select block](/docs/blocks/01-wrangling#select-block) lets you choose which columns to keep and reorder them by dragging. Enable the "distinct" option to remove duplicate rows. The [slice block](/docs/blocks/01-wrangling#slice-block) picks specific rows by position, useful for grabbing the top N results after sorting.

## Sorting and ordering rows

<VideoEmbed id="80Xi_bxUZxg" title="Sorting and ordering rows in blockr" />

The [arrange block](/docs/blocks/01-wrangling#arrange-block) sorts your data by one or more columns in ascending or descending order. Combine it with a slice block to get "top 10" or "bottom 5" views of your data.

## Next steps

- [Transforming data](transforming-data): create new columns, summarise, and pivot
- [Block reference: Wrangling](/docs/blocks/01-wrangling): full reference for all wrangling blocks
