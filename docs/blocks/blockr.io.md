# blockr.io

Getting data in and out: read CSV, Excel, Parquet and more, from files or URLs, and write results back out.

::: info Generated page
Everything below the intro comes from the block registry
(`scripts/gen-block-reference.R`). Do not edit by hand.
:::

## Import Data

`new_read_block()` &middot; input

Read and load data from files on your computer, server, or web. Supports CSV, Excel, SPSS, SAS, Stata, Parquet, and more.

| Argument | Description |
|---|---|
| `path` | Character vector of file paths to read. Multiple paths are combined according to `combine`. |
| `source` | Where the file comes from. One of "upload" (user uploads at runtime) or "path" (server-side path). Default "upload". |
| `combine` | How to combine multi-file input. One of "auto", "rbind" (row-bind matching schemas), "cbind" (column-bind), or "first" (use only the first file). Default "auto". |
| `args` | Named list of extra arguments forwarded to the underlying reader (e.g. `list(sheet = 2, col_types = "c")` for Excel). Format is auto-detected from file extension. |

## Download Data

`new_download_block()` &middot; output

Download your data to the browser as CSV, Excel, Parquet, or Feather. A lighter alternative to Export Data when no server-side save is needed.

| Argument | Description |
|---|---|
| `filename` | Character. Base filename (no extension). Extension is derived from `format`. |
| `format` | Output format. One of "csv", "excel", "parquet", "feather". Default "csv". |
| `args` | Named list of extra arguments forwarded to the underlying writer. |

## Export Data

`new_write_block()` &middot; output

Write and save your data to CSV, Excel, Parquet, or Feather files. Download directly or save to server.

| Argument | Description |
|---|---|
| `directory` | Character. Output directory path. |
| `filename` | Character. Base filename (no extension). Extension is derived from `format`. |
| `format` | Output format. One of "csv", "excel", "parquet", "feather". Default "csv". |
| `auto_write` | Logical. TRUE writes on every upstream update; FALSE (default) writes only on explicit user action. |
| `args` | Named list of extra arguments forwarded to the underlying writer. |

