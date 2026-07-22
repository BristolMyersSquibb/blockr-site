# Generates docs/blocks/<package>.md from the block registry.
# The registry is the source of truth: name, description, category and
# argument specs all come from what the packages register at load time.
# Rerun after block API changes:  Rscript scripts/gen-block-reference.R
suppressMessages({
  library(blockr)
  library(blockr.viz)
  library(blockr.dm)
})

out_dir <- file.path("docs", "blocks")
dir.create(out_dir, showWarnings = FALSE, recursive = TRUE)

# One positioning paragraph per package; everything below it is generated.
intros <- list(
  blockr.core = "The framework itself ships a small set of essential blocks: datasets, file upload, simple transforms. Real analyses mostly use the packages below; these are the fallbacks that are always there.",
  blockr.dplyr = "Data wrangling, one block per verb: filter, select, mutate, summarize, join, pivot and friends. If you would reach for dplyr in R, you reach for these blocks in blockr.",
  blockr.ggplot = "Static plots the way R users know them: a chart type, aesthetic mappings, facets. The right choice for a figure; for charts your dashboard users click, see blockr.viz.",
  blockr.viz = "Interactive, dashboard-grade output: charts with built-in aggregation and drilldown, tables, tiles and summary tables. Clicking a chart filters what is downstream of it. The right choice when people explore your board rather than read it.",
  blockr.dm = "Relational data: bring in a whole data model (many linked tables) as one source, pull tables out of it, filter across the relationships. For data that lives in a database rather than a single frame.",
  blockr.io = "Getting data in and out: read CSV, Excel, Parquet and more, from files or URLs, and write results back out.",
  blockr.extra = "Utilities that don't fit a theme: the function block for custom R code inside a workflow, search, compare, labeling and more."
)

pkg_order <- c(
  "blockr.core", "blockr.dplyr", "blockr.ggplot", "blockr.viz",
  "blockr.dm", "blockr.io", "blockr.extra"
)

esc <- function(x) {
  x <- gsub("\\s+", " ", trimws(x %||% ""))
  gsub("\\|", "\\\\|", x)
}
`%||%` <- function(x, y) if (is.null(x) || length(x) == 0) y else x

blocks <- blockr.core::available_blocks()
info <- lapply(blocks, function(e) {
  list(
    name = attr(e, "name"),
    description = attr(e, "description"),
    category = attr(e, "category"),
    ctor = attr(e, "ctor_name"),
    package = attr(e, "package"),
    arguments = attr(e, "arguments")
  )
})

pkgs <- unique(vapply(info, `[[`, "", "package"))
pkgs <- c(intersect(pkg_order, pkgs), sort(setdiff(pkgs, pkg_order)))

cat_order <- c(
  "input", "transform", "structured", "plot", "table",
  "model", "output", "utility", "uncategorized"
)

for (pkg in pkgs) {
  entries <- Filter(function(e) identical(e$package, pkg), info)
  ord <- order(
    match(vapply(entries, `[[`, "", "category"), cat_order),
    vapply(entries, `[[`, "", "name")
  )
  entries <- entries[ord]

  lines <- c(
    sprintf("# %s", pkg),
    "",
    intros[[pkg]] %||% "",
    "",
    "<!-- GENERATED PAGE: everything below the intro comes from the block",
    "registry via scripts/gen-block-reference.R. Do not edit by hand. -->",
    ""
  )

  for (e in entries) {
    lines <- c(
      lines,
      sprintf("## %s", esc(e$name %||% e$ctor)),
      "",
      sprintf("`%s()` &middot; %s", e$ctor, e$category %||% "uncategorized"),
      "",
      esc(e$description),
      ""
    )
    args <- e$arguments
    if (!is.null(args) && length(args) > 0 && !is.null(names(args))) {
      lines <- c(lines, "| Argument | Description |", "|---|---|")
      for (an in names(args)) {
        d <- args[[an]]$description %||% ""
        if (nchar(d) > 220) d <- paste0(substr(d, 1, 217), "...")
        lines <- c(lines, sprintf("| `%s` | %s |", an, esc(d)))
      }
      lines <- c(lines, "")
    }
  }

  path <- file.path(out_dir, paste0(pkg, ".md"))
  writeLines(lines, path)
  cat("wrote", path, "(", length(entries), "blocks )\n")
}
