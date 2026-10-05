# blockr.dm

Relational data: bring in a whole data model (many linked tables) as one source, pull tables out of it, filter across the relationships. For data that lives in a database rather than a single frame.

<!-- GENERATED PAGE: everything below the intro comes from the block
registry via scripts/gen-block-reference.R. Do not edit by hand. -->

## Example data model

`new_dm_example_block()` &middot; input

Load a pre-built dm from example datasets

| Argument | Description |
|---|---|
| `dataset` | Character. ID of the dm example dataset to load. One of: "bi_star_schema" (retail star schema), "safetydata_adam" / "pharmaverseadam" / "bms_adam" (CDISC ADaM clinical dm with adsl, adae, ...), "pharmaversesdtm" (raw ... |

## Import multiple tables

`new_dm_read_block()` &middot; input

Read a whole directory, ZIP archive or Excel workbook at once: one table per file or sheet, linked as a dm

| Argument | Description |
|---|---|
| `path` | Character. Path to a file or directory to read. Supported: .xlsx / .xls (one sheet per table), .zip of per-table files, or a directory containing per-table CSV / Parquet / Feather files. |
| `selected_tables` | Optional character vector restricting which tables to load. null or unset loads every table found at `path`. |
| `args` | Named list of reader options applied uniformly to every member of the container; each member's format picks the parameters it understands (e.g. `list(sep = ";")` reads every CSV in the folder as semicolon-separated an... |

## Add keys

`new_dm_add_keys_block()` &middot; structured

Add primary and foreign key relationships to dm

| Argument | Description |
|---|---|
| `pk_table` | Character. Name of the table to receive the primary key. |
| `pk_column` | Character. Column name on `pk_table` to mark as the primary key. |
| `fk_tables` | Character vector of table names that should get a foreign key pointing to `pk_table`. |
| `fk_column` | Character. Column name on each `fk_tables` entry to mark as the foreign key. Must match `pk_column` in meaning, and usually in name. |

## CDISC dm

`new_cdisc_dm_block()` &middot; structured

Set CDISC keys (USUBJID PK/FK) and optionally deduplicate subject columns

| Argument | Description |
|---|---|
| `set_keys` | Logical. TRUE (default) sets USUBJID as primary key on ADSL and foreign key on all other tables. Required for any cascading dm filter to work. |
| `dedup_cols` | Logical. TRUE removes duplicated subject-level columns (AGE, SEX, ARM, etc.) from non-ADSL tables so they live only on ADSL, which avoids column-name collisions in downstream joins. FALSE (the default) leaves every ta... |

## Create dm

`new_dm_block()` &middot; structured

Combine data frames into a dm (data model) object

| Argument | Description |
|---|---|
| `infer_keys` | Logical. TRUE (default) auto-infers primary and foreign key relationships from matching column names. FALSE leaves the dm key-less (use dm_add_keys_block to set keys explicitly). |

## Crossfilter

`new_crossfilter_block()` &middot; structured

Client-side crossfilter for data frames and dm objects using crossfilter2.js

| Argument | Description |
|---|---|
| `active_dims` | Per-table active filter columns. Object: table name -> array of column names that are eligible for filtering. For a single data frame input (not a dm), use ".tbl" as the table name. |
| `filters` | Per-table categorical filters. Object: table name -> {column -> array of kept values}. Values not listed are excluded. |
| `subgroup` | A second column the board is split by, under `pinned`: tables nest it under the group, charts facet by it. Same eligible columns as `pinned`, minus the pinned one. Null for none. |
| `groups` | Group definitions for the pinned column and the subgroup. Object: column name -> {columns: array of {name, members: array of levels, custom: boolean}, in table order}. A column with an empty name is one level on its o... |
| `range_filters` | Per-table numeric/date range filters. Object: table name -> {column -> [min, max]}. |
| `measure` | Aggregation measure as a "table.column" string, or null for row counts. Used in linked summary views. |
| `agg_func` | Aggregation function applied to `measure`. One of "sum" or "mean". Only used when measure is set. |
| `featured` | Columns worth showing up front: they appear as one-click chips above the filter cards and supply the choices for `pinned`. Array of column names, resolved to whichever table carries them. |
| `pinned` | Column kept in an always-open card at the top of the block, picked through a select in that card's header. Must be one of `featured` and live on the parent table. Null for no pinned card. |

## dm Temporal join

`new_dm_temporal_join_block()` &middot; structured

Temporal join between two dm tables, filtering by time window

| Argument | Description |
|---|---|
| `left_table` | Character. Name of the "anchor" table in the dm. |
| `left_date` | Character. Date/datetime column on `left_table` that defines the anchor time (e.g. treatment start). |
| `right_table` | Character. Name of the "event" table in the dm being joined in. |
| `right_date` | Character. Date/datetime column on `right_table` whose offset from `left_date` is checked against the window. |
| `window_days` | Integer. Size of the time window in days (default 7). |
| `direction` | Window direction relative to `left_date`. One of "after" (default, keep events within window_days AFTER anchor), "before", or "around" (two-sided window). |

## Drill filter

`new_drill_filter_block()` &middot; structured

The value filter a drill-down click writes into. One per board, beside blockr.viz's control bridge extension; senders find it by class and it resolves a claimed column to a dm table itself.

## Filter dm

`new_dm_filter_block()` &middot; structured

Filter dm by condition in any table, cascading to related tables via FKs

| Argument | Description |
|---|---|
| `table` | Character. Name of the table within the dm where conditions are applied. Rows removed from this table cascade to related tables via the dm's FK relationships. |
| `state` | List with `conditions` and `operator`. Matches the state format of blockr.dplyr::new_filter_block - condition types `values`, `numeric`, and `expr`, combined with `&` or `\|`. |

## Flatten dm

`new_dm_flatten_block()` &middot; structured

Flatten dm into a single data frame by joining

| Argument | Description |
|---|---|
| `start_table` | Character. Table to flatten from — becomes the left side of every join. Output row count equals this table's row count (for left joins). |
| `include_tables` | Character vector. Tables to join into `start_table`. Empty vector flattens the full dm by following all related tables. |
| `join_type` | Join type to use throughout. One of "left" (default), "inner", "full", "right". |
| `recursive` | Logical. TRUE (default) follows multi-hop relationships through the FK graph. FALSE joins only direct neighbors of `start_table`. |

## Pull table

`new_dm_pull_block()` &middot; structured

Extract a single table from dm as a data frame

| Argument | Description |
|---|---|
| `table` | Character. Name of the table to extract as a data frame. |

## Select tables

`new_dm_select_block()` &middot; structured

Select a subset of tables to keep in a dm

| Argument | Description |
|---|---|
| `tables` | Character vector of table names to keep in the dm. Tables not listed are dropped. Relationships to dropped tables are removed. |

## Temporal join

`new_temporal_join_block()` &middot; structured

Join two tables and filter by time window between date columns

| Argument | Description |
|---|---|
| `by` | Character vector of column names to match on as the join key (e.g. subject ID). Rows with matching key AND date-within-window are joined. |
| `left_date` | Character. Date column on the LEFT (x) table that defines the anchor time. |
| `right_date` | Character. Date column on the RIGHT (y) table whose offset from `left_date` is checked against the window. |
| `window_days` | Integer. Window size in days. Default 7. |
| `direction` | Window direction relative to `left_date`. One of "after" (default), "before", "around". |

## Value filter

`new_value_filter_block()` &middot; structured

Minimal value filter for a data frame or dm. Columns hidden behind the gear; per-column single vs multi select. dm input cascades via FKs.

## Write dm

`new_dm_write_block()` &middot; output

Write dm object to Excel, ZIP, or directory

| Argument | Description |
|---|---|
| `directory` | Character. Output directory path. |
| `filename` | Character. Base filename (no extension). Extension is derived from `format`. For Excel, one file; for CSV / Parquet, one file per table. |
| `format` | Output format. One of "excel", "csv", or "parquet". Default "excel". |
| `auto_write` | Logical. TRUE writes on every upstream update; FALSE (default) writes only on explicit action. |

