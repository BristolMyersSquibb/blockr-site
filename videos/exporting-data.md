# Exporting Data

<VideoEmbed id="a_LyMO8_93Y" title="Exporting data in blockr" />

## Overview

The [write block](/docs/blocks/03-io) saves your pipeline results to a file. Connect it to any block that outputs data, choose a format, and download.

## Supported formats

The write block supports the same formats as the read block:

- **CSV**: universal compatibility, plain text
- **Excel (.xlsx)**: preserves multiple sheets, good for sharing with non-R users
- **Parquet**: columnar format, fast and compact for large datasets
- **Feather**: fast read/write for R and Python interchange
- **JSON**: web-friendly structured data
- **SPSS / Stata / SAS**: statistical software interchange

## Export modes

- **Download**: triggers a browser download of the file
- **Browse**: writes to a location on the server filesystem

Files are automatically timestamped to prevent overwriting previous exports.

## Exporting R code

Every blockr pipeline produces idiomatic R code you can copy and use anywhere.

1. Press the settings button:

![](/docs/guides/01-img-01.png)

2. Press the "</> Show Code" button:

![](/docs/guides/01-img-02.png)

3. That's it! Idiomatic R code will appear in a pop-up modal. Copy and paste it where you like.

![](/docs/guides/01-img-03.png)

## Next steps

- [Creating custom blocks](creating-blocks): extend blockr with your own logic
- [Block reference: I/O](/docs/blocks/03-io): full read/write block reference
