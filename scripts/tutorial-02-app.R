library(blockr)
library(blockr.viz)
app <- blockr::run_app(
  blocks = c(
    data = blockr.core::new_dataset_block("penguins", package = "datasets"),
    filter = blockr.dplyr::new_filter_block(
      conditions = list(list(
        type = "values", column = "sex",
        values = list("female", "male"), mode = "include",
        colType = "factor"
      )),
      operator = "&"
    ),
    chart = blockr.viz::new_chart_block(
      group = "species", func = "count", chart_type = "bar",
      drill = "species", block_name = "Penguins per species"
    ),
    table = blockr.viz::new_table_block(block_name = "Selected penguins")
  ),
  links = c(
    blockr.core::new_link("data", "filter", input = "data"),
    blockr.core::new_link("filter", "chart", input = "data"),
    blockr.core::new_link("chart", "table", input = "data")
  )
)
shiny::runApp(app, port = 4848)
