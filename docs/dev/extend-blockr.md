# Extend blockr

blockr's plugin system lets you customize how the application behaves: add new UI panels, modify block interactions, or change how the board works.

## Plugin architecture

A plugin is an R object with hooks that fire at specific points in the blockr lifecycle. Plugins can:

- Add custom UI to the board (sidebars, toolbars, modals)
- Intercept block creation and deletion
- Modify how blocks connect
- Add new controls to individual blocks

```r
new_my_plugin <- function() {
  new_plugin(
    # UI added to the board
    ui = function(id) {
      ns <- shiny::NS(id)
      shiny::actionButton(ns("my_btn"), "Custom action")
    },
    # Server logic
    server = function(id, board) {
      shiny::moduleServer(id, function(input, output, session) {
        shiny::observeEvent(input$my_btn, {
          # React to custom UI
        })
      })
    },
    class = "my_plugin"
  )
}
```

## Custom block UI

Override how any block renders its UI using S3 methods. This lets package authors customize the appearance of their blocks without modifying blockr.core:

```r
# Custom UI for your block class
block_ui.my_block <- function(block, id) {
  ns <- shiny::NS(id)
  bslib::card(
    bslib::card_header("My Custom Block"),
    bslib::card_body(
      shiny::selectInput(ns("column"), "Column", choices = NULL)
    )
  )
}
```

## Block registry

The registry is the "supermarket" for blocks. It tracks all available blocks with metadata (name, description, category, package). When you load a blockr extension package, its blocks are registered via `.onLoad()` and appear in the block menu, and in the AI/MCP discovery surface, which reads the same registry.

```r
# Query available blocks
list_blocks()

# Register a new block (in R/zzz.R or at runtime)
register_block(
  ctor = "new_my_block",
  name = "My block",
  description = "Does something useful",
  category = "transform"
)

# Register many at once (vectorised)
register_blocks(
  ctor = c("new_filter_block", "new_select_block"),
  name = c("Filter rows", "Select columns"),
  description = c("Filter by predicate", "Pick a subset of columns"),
  category = c("transform", "transform")
)

# Unregister
unregister_blocks("my_block")
```

`category` must come from `blockr.core::suggested_categories()` (`input`, `transform`, `structured`, `plot`, `table`, `model`, `output`, `utility`, `uncategorized`). Anything else warns. Data-fetching blocks register as `input`, not `data`.

This makes collaboration easy: one team builds a package of domain-specific blocks, registers them, and they appear in every user's block menu. They also become available to the AI assistant for configuration.

## Further reading

- [blockr.docs](https://github.com/cynkra/blockr.docs): canonical block patterns and skills
- [Full extend-blockr vignette](https://bristolmyerssquibb.github.io/blockr.core/articles/extend-blockr.html): complete plugin examples
- [Block registry vignette](https://bristolmyerssquibb.github.io/blockr.core/articles/blocks-registry.html): registry internals
- [blockr.core API reference](https://bristolmyerssquibb.github.io/blockr.core/): full function documentation
