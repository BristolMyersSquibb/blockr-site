# Empty board for the landing page's "By asking" clip (story-ask.cjs): the
# hero's app (hero-loop-app.R) with the assistant, as the Install page shows,
# on Claude. Needs ANTHROPIC_API_KEY, and blockr.assistant with #211 (typed
# tools hand blocks records, not data frames); without it the assistant's
# filter drops the species it should keep.
#   Rscript ask-app.R 4430          # light
#   Rscript ask-app.R 4431 dark     # dark
library(blockr)

args <- commandArgs(TRUE)
port <- as.integer(args[1])
if (is.na(port)) port <- 4430L
dark <- identical(args[2], "dark")

if (dark) {
  # as blockr-site/scripts/demo-video/hero-loop-app.R: blockr.ggplot appends
  # ggplot2::theme_minimal(), whose paper is white in ggplot2 4.x. Recording
  # only: give theme_minimal() dark defaults.
  options(blockr.dark_mode = "dark")
  local({
    orig <- ggplot2::theme_minimal
    dark_theme <- function(..., ink = "#D7DCE2", paper = "#161B23",
                           accent = "#089E76") {
      orig(..., ink = ink, paper = paper, accent = accent)
    }
    utils::assignInNamespace("theme_minimal", dark_theme, "ggplot2")
  })
}


# run_app() sets this and restores it on exit, before the graph is drawn, so
# a new block lands on top of the last one. Set it for the session instead.
options(g6R.layout_on_data_change = TRUE)

options(
  shiny.port = port,
  shiny.launch.browser = FALSE,
  blockr.chat_function = function(system_prompt = NULL, params = NULL) {
    ellmer::chat_anthropic(
      system_prompt = system_prompt, params = params,
      model = Sys.getenv("DEMO_MODEL", "claude-opus-5-5")
    )
  }
)

# The workflow graph on the left, the assistant on the right; the blocks the
# assistant adds open between them.
run_app(
  extensions = list(
    dag = new_dag_extension(),
    assistant = blockr.assistant::new_assistant_extension()
  ),
  grids = list(Main = dock_grid(
    ext("dag"),
    rail(ext("assistant"), position = "right",
         size = as.integer(Sys.getenv("DEMO_RAIL", "400")))
  ))
)
