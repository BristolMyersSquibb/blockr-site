# blockr.dplyr

Data wrangling, one block per verb: filter, select, mutate, summarize, join, pivot and friends. If you would reach for dplyr in R, you reach for these blocks in blockr.

<!-- GENERATED PAGE: everything below the intro comes from the block
registry via scripts/gen-block-reference.R. Do not edit by hand. -->

## Arrange Rows

`new_arrange_block()` &middot; transform

Sort rows by one or more columns, ascending or descending. (dplyr: arrange)

| Argument | Description |
|---|---|
| `columns` | Array of {column, direction} objects where direction is "asc" or "desc". Rows are sorted by the columns in order. |

## Bind Columns

`new_bind_cols_block()` &middot; transform

Place tables side-by-side horizontally. Both must have the same number of rows. (dplyr: bind_cols)

## Bind Rows

`new_bind_rows_block()` &middot; transform

Stack tables vertically by matching column names. (dplyr: bind_rows)

| Argument | Description |
|---|---|
| `id_name` | Optional string -- name of an .id column identifying which input each row came from |

## Filter Rows

`new_filter_block()` &middot; transform

Keep or remove rows by values, comparisons, or expressions. (dplyr: filter)

| Argument | Description |
|---|---|
| `conditions` | Array of condition objects. Types: "values" (column, values array of strings, mode "include"/"exclude"), "numeric" (column, op like ">"/">="/"<"/"<=", value as number), "expr" (expr as R expression string) |
| `operator` | How to combine conditions: "&" for AND (all match), "\|" for OR (any match) |
| `preserve_order` | Boolean -- when true, keep the original row order rather than reordering |

## Join

`new_join_block()` &middot; transform

Combine two tables by matching values in shared columns. Left, inner, right, full, anti, semi joins. (dplyr: *_join)

| Argument | Description |
|---|---|
| `type` | Join type string: left_join, inner_join, right_join, full_join, anti_join, or semi_join |
| `keys` | Array of {xCol, op, yCol} objects defining the column pairs to match |
| `exprs` | Array of R expression strings (optional, advanced join predicates) |
| `suffix_x` | Suffix added to overlapping column names from the left table (default '.x') |
| `suffix_y` | Suffix added to overlapping column names from the right table (default '.y') |

## Mutate Columns

`new_mutate_block()` &middot; transform

Add new columns or transform existing ones using R expressions. (dplyr: mutate)

| Argument | Description |
|---|---|
| `mutations` | Array of objects, each with 'name' (new column name) and 'expr' (R expression string) |
| `by` | Optional array of grouping column names (group the operation, e.g. mean per group) |

## Pivot Longer

`new_pivot_longer_block()` &middot; transform

Reshape wide data to long — gather columns into rows. (tidyr: pivot_longer)

| Argument | Description |
|---|---|
| `cols` | Array of column names to pivot to long form |
| `names_to` | String -- name of the new column holding the pivoted names |
| `values_to` | String -- name of the new column holding the pivoted values |
| `values_drop_na` | Boolean -- drop rows with NA values after pivoting |
| `names_prefix` | String -- regex prefix stripped from the pivoted names |

## Pivot Wider

`new_pivot_wider_block()` &middot; transform

Reshape long data to wide — spread rows into columns. (tidyr: pivot_wider)

| Argument | Description |
|---|---|
| `names_from` | Array of column(s) whose values become the new column names |
| `values_from` | Array of column(s) whose values fill the new columns |
| `id_cols` | Array (optional) of columns that uniquely identify each output row |
| `values_fill` | Value (or null) used to fill missing cells |
| `names_sep` | String separator joining multiple names_from / prefix parts |
| `names_prefix` | String prepended to every new column name |
| `values_fn` | String (or null) aggregation function (e.g. 'mean', 'sum', 'first') for duplicate id+name combinations |

## Rename

`new_rename_block()` &middot; transform

Change column names without modifying data. (dplyr: rename)

| Argument | Description |
|---|---|
| `renames` | Object mapping new names to old names: {new_name: 'old_name', ...}. Keys are the desired new column names, values are the existing column names. |

## Select Columns

`new_select_block()` &middot; transform

Choose, reorder, or exclude columns. Optionally remove duplicate rows. (dplyr: select, distinct)

| Argument | Description |
|---|---|
| `columns` | Array of column name strings to keep (or to remove, when exclude=true) |
| `exclude` | Boolean -- when true, drop the listed columns instead of keeping them |
| `distinct` | Boolean -- when true, deduplicate rows after selecting |

## Separate Column

`new_separate_block()` &middot; transform

Split one column into multiple columns using a delimiter. (tidyr: separate)

| Argument | Description |
|---|---|
| `col` | Source column to split |
| `into` | Array of new column names to split into |
| `sep` | Separator string (or regex) to split on |
| `remove` | Boolean -- remove the source column after splitting |
| `convert` | Boolean -- auto-convert the new columns to numeric/logical types |

## Slice Rows

`new_slice_block()` &middot; transform

Pick rows by position, random sample, or min/max of a column. (dplyr: slice)

| Argument | Description |
|---|---|
| `type` | One of 'head' (first n rows), 'tail' (last n), 'min'/'max' (rows with smallest/largest order_by values), 'sample' (random sample) |
| `n` | Integer row count |
| `prop` | Number 0-1, proportion of rows (alternative to n -- not both) |
| `order_by` | Column to rank by, for min/max |
| `with_ties` | Boolean -- whether tied rows at the cutoff are all kept (min/max) |
| `weight_by` | Column of weights, for sampling |
| `replace` | Boolean -- sample with replacement |
| `by` | Array of grouping columns (slice within each group) |

## Summarize

`new_summarize_block()` &middot; transform

Calculate totals, averages, counts, and other statistics, optionally by group. (dplyr: summarize)

| Argument | Description |
|---|---|
| `summaries` | Array of summary objects. Types: 'simple' (name, func like 'mean'/'sd'/'sum'/'n'/'n_distinct', col) or 'expr' (name, expr as R expression string) |
| `by` | Array of grouping column names -- this is how you group (do NOT write group_by() in exprs) |

## Unite Columns

`new_unite_block()` &middot; transform

Merge multiple columns into one by pasting values together. (tidyr: unite)

| Argument | Description |
|---|---|
| `col` | New column name for the united result |
| `cols` | Array of columns to unite |
| `sep` | Separator string placed between values |
| `remove` | Boolean -- remove the input columns after uniting |
| `na_rm` | Boolean -- drop NA values before uniting |

