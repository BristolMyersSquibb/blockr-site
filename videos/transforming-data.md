# Transforming Data

Four videos covering column creation, aggregation, renaming, and reshaping data between long and wide formats.

## Creating and modifying columns

<VideoEmbed id="TczRJUQXVlg" title="Creating (and modifying) columns in blockr" />

The [mutate expression block](/docs/blocks/01-wrangling#mutate-expression-block) adds new columns or modifies existing ones using R expressions. Type an expression like `bill_length_mm / 10` or `paste(species, island, sep = " - ")` and name the result column. You get the full power of R: any function available in your session can be used.

## Summarising data

<VideoEmbed id="-QgU_FOYw9c" title="Summarising data in blockr" />

The [summarize block](/docs/blocks/01-wrangling#summarize-block) aggregates data using functions like `mean`, `sum`, `n`, `min`, and `max`. Group by one or more columns to get summaries per group. For custom aggregation expressions, use the [summarize expression block](/docs/blocks/01-wrangling#summarize-expression-block) which accepts arbitrary R code.

## Renaming, combining and splitting columns

<VideoEmbed id="Hxm2gbCpseE" title="Renaming, combining and splitting columns in blockr" />

Three related operations covered in one video:
- **[Rename block](/docs/blocks/01-wrangling#rename-block)**: give columns clearer names without changing the data
- **[Unite block](/docs/blocks/01-wrangling#unite-block)**: paste multiple columns together into one (e.g., combine `first_name` and `last_name`)
- **[Separate block](/docs/blocks/01-wrangling#separate-block)**: split one column into multiple columns by a delimiter

## Pivoting data

<VideoEmbed id="1Xj_cP-jjsE" title="Pivoting data in blockr" />

Reshape between long and wide formats:
- **[Pivot longer](/docs/blocks/01-wrangling#pivot-longer-block)**: collapse multiple columns into key-value pairs (wide → long)
- **[Pivot wider](/docs/blocks/01-wrangling#pivot-wider-block)**: spread key-value pairs into separate columns (long → wide)

These are essential when your data is in the wrong shape for a visualization or summary.

## Next steps

- [Joining data](joining-data): combine multiple datasets
- [Block reference: Wrangling](/docs/blocks/01-wrangling): full reference for all wrangling blocks
