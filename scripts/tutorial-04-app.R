library(blockr)
library(blockr.viz)
app <- blockr::run_app(
  blocks = c(
    data = blockr.core::new_dataset_block("penguins", package = "datasets"),
    fn = blockr.extra::new_function_block(
      fn = paste(
        "function(data) {",
        "  data",
        "}",
        sep = "\n"
      ),
      block_name = "Custom step"
    ),
    chart = blockr.viz::new_chart_block(
      group = "species", value = "bill_ratio", func = "mean",
      chart_type = "bar", block_name = "Mean bill ratio"
    )
  ),
  links = c(
    blockr.core::new_link("data", "fn", input = "data"),
    blockr.core::new_link("fn", "chart", input = "data")
  )
)
shiny::runApp(app, port = 4848)
