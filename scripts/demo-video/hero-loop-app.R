# Empty board for the landing page loop (story-hero.cjs), on the one-line
# install, pak::pak("BristolMyersSquibb/blockr@dev").
#   Rscript hero-loop-app.R 4190          # light
#   Rscript hero-loop-app.R 4191 dark     # dark
library(blockr)

args <- commandArgs(TRUE)
port <- as.integer(args[1])
if (is.na(port)) port <- 4190L
dark <- identical(args[2], "dark")

options(shiny.port = port, shiny.launch.browser = FALSE)

if (dark) {
  options(blockr.dark_mode = "dark")
  # blockr.ggplot appends ggplot2::theme_minimal(), whose paper is white in
  # ggplot2 4.x, so the chart would stay white on the dark board. Recording
  # only: give theme_minimal() dark defaults.
  local({
    orig <- ggplot2::theme_minimal
    dark_theme <- function(..., ink = "#D7DCE2", paper = "#161B23",
                           accent = "#089E76") {
      orig(..., ink = ink, paper = paper, accent = accent)
    }
    utils::assignInNamespace("theme_minimal", dark_theme, "ggplot2")
  })
}

run_app()
