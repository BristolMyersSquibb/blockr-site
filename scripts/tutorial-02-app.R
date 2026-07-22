library(blockr)
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
    plot = blockr.ggplot::new_ggplot_block(
      type = "point", x = "bill_len", y = "bill_dep", color = "species"
    )
  ),
  links = c(
    blockr.core::new_link("data", "filter", input = "data"),
    blockr.core::new_link("filter", "plot", input = "data")
  )
)
shiny::runApp(app, port = 4848)
