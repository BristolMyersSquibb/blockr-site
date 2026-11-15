# blockr.dm

Relational data: bring in a whole data model (many linked tables) as one source, pull tables out of it, filter across the relationships. For data that lives in a database rather than a single frame.

<!-- GENERATED PAGE: everything below the intro comes from the block
registry via scripts/gen-block-reference.R. Do not edit by hand. -->

## Example data model

`new_dm_example_block()` &middot; input

Load a pre-built dm from example datasets

| Argument | Description |
|---|---|
| `dataset` | Character. ID of the dm example dataset to load. One of: "bi_star_schema" (retail star schema), "nycflights13", "insurancedata". Availability depends on installed data packages; call dm_example_choices() for the live ... |

## Add keys

`new_dm_add_keys_block()` &middot; structured

Add primary and foreign key relationships to dm

| Argument | Description |
|---|---|
| `pk_table` | Character. Name of the table to receive the primary key. |
| `pk_column` | Character. Column name on `pk_table` to mark as the primary key. |
| `fk_tables` | Character vector of table names that should get a foreign key pointing to `pk_table`. |
| `fk_column` | Character. Column name on each `fk_tables` entry to mark as the foreign key. Must match `pk_column` in meaning, and usually in name. |

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

## Value filter

`new_value_filter_block()` &middot; structured

Minimal value filter for a data frame or dm. Columns hidden behind the gear; per-column single vs multi select. dm input cascades via FKs.

