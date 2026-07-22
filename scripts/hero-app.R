library(blockr)
library(blockr.viz)
app <- blockr::run_app(
  blocks = c(
    data = blockr.core::new_dataset_block("penguins", package = "datasets"),
    filter = blockr.dplyr::new_filter_block(
      conditions = list(list(
        type = "values", column = "species",
        values = list("Adelie", "Chinstrap"), mode = "include",
        colType = "factor"
      )),
      operator = "&"
    ),
    chart = blockr.viz::new_chart_block(
      group = "species", func = "count", chart_type = "bar",
      block_name = "Penguins per species"
    ),
    table = blockr.viz::new_table_block(block_name = "Filtered penguins"),
    summary = blockr.viz::new_summary_table_block(
      vars = list("bill_len", "body_mass"), by = list("species"),
      block_name = "Summary"
    )
  ),
  links = c(
    blockr.core::new_link("data", "filter", input = "data"),
    blockr.core::new_link("filter", "chart", input = "data"),
    blockr.core::new_link("filter", "table", input = "data"),
    blockr.core::new_link("filter", "summary", input = "data")
  )
)
shiny::runApp(app, port = 4848)
