# blockr.core

The framework itself ships a small set of essential blocks: datasets, file upload, simple transforms. Real analyses mostly use the packages below; these are the fallbacks that are always there.

<!-- GENERATED PAGE: everything below the intro comes from the block
registry via scripts/gen-block-reference.R. Do not edit by hand. -->

## data upload block

`new_upload_block()` &middot; input

Upload data

## dataset block

`new_dataset_block()` &middot; input

Choose a dataset from a package

| Argument | Description |
|---|---|
| `dataset` | Selects the dataset to use. |
| `package` | R package to source the dataset from. |

## file browser block

`new_filebrowser_block()` &middot; input

Browse local files

| Argument | Description |
|---|---|
| `file_path` | Path of the selected file. |

## head/tail block

`new_head_block()` &middot; transform

Data head/tail

| Argument | Description |
|---|---|
| `n` | Number of rows to keep. |
| `direction` | Row end to keep, either head (first) or tail (last). |

## merge block

`new_merge_block()` &middot; transform

Joining or datasets

| Argument | Description |
|---|---|
| `by` | Shared key column(s) to join on. |
| `all_x` | Keep unmatched rows from the first input. |
| `all_y` | Keep unmatched rows from the second input. |

## rbind block

`new_rbind_block()` &middot; transform

Row-binding of datasets

## subset block

`new_subset_block()` &middot; transform

Row and column subsetting

| Argument | Description |
|---|---|
| `subset` | Logical row-filter expression, as a string. |
| `select` | Column-selection expression, as a string. |

## scatter plot block

`new_scatter_block()` &middot; plot

Scatter plotting

| Argument | Description |
|---|---|
| `x` | Column for the horizontal axis. |
| `y` | Column for the vertical axis. |

## csv parser block

`new_csv_block()` &middot; utility

Read CSV file

| Argument | Description |
|---|---|
| `sep` | Field separator character. |
| `quote` | Quoting character. |

## glue string block

`new_glue_block()` &middot; utility

String interpolation using glue

| Argument | Description |
|---|---|
| `text` | Template string evaluated with glue::glue(). |

