# Create a block

<VideoEmbed id="-PdixmAscQI" title="Creating blocks in blockr" />

Write custom blocks in pure R to extend blockr with your own logic. A block is a specialized Shiny module that returns an **expression** (the R code it generates) and a **state** (its current input values). A workflow is a Shiny app composed of connected blocks.

Blocks should live in an R package so they can be registered, shared, and tested. The examples below show the package-based approach.

## Block anatomy

Every block has three parts:

```
Block
├── UI function        → defines the user interface (Shiny UI)
├── Server function    → handles reactive logic, returns expr + state
└── Constructor        → wraps UI + server, initializes defaults
```

### UI function

A standard Shiny module UI. Takes a single `id` argument and returns `shiny.tag` objects:

```r
my_block_ui <- function(id) {
  ns <- shiny::NS(id)
  shiny::tagList(
    shiny::selectInput(ns("column"), "Column", choices = NULL),
    shiny::numericInput(ns("threshold"), "Threshold", value = 0)
  )
}
```

### Server function

Returns a list with two reactive elements: `expr` (a quoted R expression) and `state` (a named list of current input values):

```r
my_block_server <- function(id, data) {
  shiny::moduleServer(id, function(input, output, session) {
    # Update choices based on incoming data
    shiny::observe({
      shiny::updateSelectInput(session, "column",
        choices = names(data()))
    })

    list(
      expr = shiny::reactive({
        rlang::expr(
          dplyr::filter(data, !!rlang::sym(input$column) > !!input$threshold)
        )
      }),
      state = shiny::reactive(list(
        column = input$column,
        threshold = input$threshold
      ))
    )
  })
}
```

### Constructor

Wraps UI and server together with default state values:

```r
new_my_block <- function(column = character(), threshold = 0) {
  new_block(
    ui = my_block_ui,
    expr_server = my_block_server,
    state = list(column = column, threshold = threshold),
    class = c("my_block", "transform_block")
  )
}
```

## Registering your block

Blocks must be registered so they appear in the block menu. Use `.onLoad()` in your package:

```r
.onLoad <- function(libname, pkgname) {
  blockr.core::register_block(
    constructor = new_my_block,
    name = "My custom filter",
    description = "Filter rows by a numeric threshold",
    category = "transform",
    package = pkgname
  )
}
```

You can also register blocks dynamically at runtime:

```r
register_block(
  constructor = new_my_block,
  name = "My custom filter",
  description = "Filter rows by a numeric threshold",
  category = "transform"
)
```

Query what's available with `available_blocks()`.

## Further reading

- [Full create-block vignette](https://bristolmyerssquibb.github.io/blockr.core/articles/create-block.html): detailed walkthrough with advanced examples
- [Block registry vignette](https://bristolmyerssquibb.github.io/blockr.core/articles/blocks-registry.html): registry system details
- [Extend blockr vignette](https://bristolmyerssquibb.github.io/blockr.core/articles/extend-blockr.html): plugins and custom UI
