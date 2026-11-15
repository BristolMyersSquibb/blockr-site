# Starting board for the tutorial 2 take (story-tutorial-02.cjs): the
# tutorial-1 workflow with the ggplot swapped for a Chart and a Table, as
# after step 1 of learn/02-build-a-dashboard.md. Runs on the one-line
# install, pak::pak("BristolMyersSquibb/blockr").
#   Rscript tutorial-02-app.R 4320
library(blockr)

port <- as.integer(commandArgs(TRUE)[1])
if (is.na(port)) port <- 4320L
options(
  shiny.port = port,
  shiny.launch.browser = FALSE,
  blockr.tabular_display = blockr.ui::html_table_display
)

run_app(
  blocks = c(
    data = new_dataset_block("penguins", package = "datasets"),
    filter = new_filter_block(
      conditions = list(list(
        type = "values", column = "species",
        values = list("Adelie", "Chinstrap"), mode = "include",
        colType = "factor"
      ))
    ),
    chart = blockr.viz::new_chart_block(category = "species", drill = "auto"),
    table = blockr.viz::new_table_block()
  ),
  links = c(
    new_link("data", "filter", input = "data"),
    new_link("filter", "chart", input = "data"),
    new_link("chart", "table", input = "data")
  )
)
