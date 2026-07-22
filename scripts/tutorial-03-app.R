library(blockr)
library(blockr.viz)
library(blockr.dm)
app <- blockr::run_app(
  blocks = c(
    model = blockr.dm::new_dm_example_block(
      dataset = "bi_star_schema", block_name = "Sales data model"
    ),
    flat = blockr.dm::new_dm_flatten_block(
      start_table = "orders",
      block_name = "Orders, flattened"
    ),
    chart = blockr.viz::new_chart_block(
      group = "category_name", value = "amount", func = "sum",
      chart_type = "bar", drill = "category_name",
      block_name = "Revenue by category"
    ),
    table = blockr.viz::new_table_block(block_name = "Selected orders")
  ),
  links = c(
    blockr.core::new_link("model", "flat", input = "data"),
    blockr.core::new_link("flat", "chart", input = "data"),
    blockr.core::new_link("chart", "table", input = "data")
  )
)
shiny::runApp(app, port = 4848)
