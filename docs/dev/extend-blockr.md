# Extend blockr

There are two ways to change how a board behaves: replace one of the built-in plugins, or add a panel to a dock board with a dock extension. Custom blocks are covered in [Create a block](/docs/dev/create-block).

## Replacing a plugin

A board calls its plugins by fixed names: `preserve_board`, `manage_blocks`, `manage_links`, `manage_stacks`, `notify_user`, `generate_code`, `edit_block`, `edit_stack` and `ctrl_block`. A plugin with any other class is rejected, so you cannot add a new plugin slot. You can replace an existing one: build it with that slot's constructor (`generate_code()`, `notify_user()`, ...) and pass it to `serve()` through `custom_plugins()`, which replaces the default plugin of the same name, or adds it if the board's defaults lack that slot.

The server signature depends on the slot. `manage_blocks`, `manage_links`, `manage_stacks` and `generate_code` are called as `function(id, board, update, ...)`: `board` is the read-only board state, `update` a reactive value you write board updates to. `preserve_board` and `notify_user` get `function(id, board, ...)`. The UI function of all six takes `function(id, board)`. `edit_block`, `edit_stack` and `ctrl_block` run once per block or stack and take other arguments; see their help pages.

This example replaces the "Show code" button with a board summary:

```r
library(blockr.core)

board_summary <- generate_code(
  server = function(id, board, update, ...) {
    shiny::moduleServer(id, function(input, output, session) {
      shiny::observeEvent(input$code_mod, {
        shiny::showModal(shiny::modalDialog(
          title = "Board summary",
          paste(
            length(board_block_ids(board$board)), "blocks,",
            length(board_links(board$board)), "links"
          )
        ))
      })
      NULL
    })
  },
  ui = function(id, board) {
    shiny::actionButton(shiny::NS(id, "code_mod"), "Board summary")
  }
)

serve(
  new_board(
    blocks = c(a = new_dataset_block("iris"), b = new_head_block(n = 3L)),
    links = c(ab = new_link("a", "b"))
  ),
  plugins = custom_plugins(board_summary)
)
```

The server's return value is checked by the plugin's validator. For `generate_code` it has to be `NULL`. The same `custom_plugins()` call works for a `new_dock_board()`, which shows the `generate_code` UI in its board options menu.

## Dock extensions

On a dock board, new UI goes into a panel. A dock extension is created with `blockr.dock::new_dock_extension(server, ui, name, class, ...)`, wrapped in a constructor function. The class must end in `_extension`. The UI function is called as `ui(id, board)` with the board object. The server is called with `id`, `board`, `update`, `view_data`, `actions` and `extensions` (the other extensions' results, keyed by id), and returns a list with a `state` component.

```r
library(blockr.core)
library(blockr.dock)

new_count_extension <- function(...) {
  new_dock_extension(
    server = function(id, board, update, ...) {
      shiny::moduleServer(id, function(input, output, session) {
        output$n <- shiny::renderText(
          paste(length(board_block_ids(board$board)), "blocks")
        )
        list(state = list())
      })
    },
    ui = function(id, board) {
      shiny::textOutput(shiny::NS(id, "n"))
    },
    name = "Block count",
    class = "count_extension",
    ...
  )
}

serve(
  new_dock_board(
    blocks = c(a = new_dataset_block("iris"), b = new_head_block(n = 3L)),
    links = c(ab = new_link("a", "b")),
    extensions = new_count_extension(),
    grids = list(View = dock_grid(blk("a"), blk("b"), ext("count")))
  )
)
```

The board owns the extension ids. An unnamed extension gets its class without the `_extension` suffix as id, so `count_extension` becomes `count`. Refer to it in layouts and board updates with `ext("count")`, and to blocks with `blk("<id>")`. The DAG view in blockr.dag (`new_dag_extension()`) is built the same way.

## Custom block output

How a block displays its result is an S3 method pair on the block class: `block_ui(id, x, ...)` supplies the output area, `block_output(x, result, session)` renders into it. Override both to change how a block class shows its result. The block's input controls are not affected; those come from the `ui` function passed to the constructor.

```r
#' @export
block_ui.my_block <- function(id, x, ...) {
  shiny::tagList(
    shiny::plotOutput(shiny::NS(id, "result"))
  )
}

#' @export
block_output.my_block <- function(x, result, session) {
  shiny::renderPlot(print(result))
}
```

This is the same mechanism blockr.core uses itself: `plot_block` pairs `plotOutput()` with `renderPlot()`, `transform_block` renders a table (see `blockr.core/R/plot-block.R`).

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
  category = "transform",
  package = "mypkg"
)

# Register many at once (vectorised)
register_blocks(
  ctor = c("new_filter_block", "new_select_block"),
  name = c("Filter rows", "Select columns"),
  description = c("Filter by predicate", "Pick a subset of columns"),
  category = c("transform", "transform"),
  package = "mypkg"
)

# Unregister
unregister_blocks("my_block")
```

A constructor given by name needs `package`, the package that exports it; in `.onLoad` that is `pkgname`. You can also pass the function itself (`ctor = new_my_block`) and leave `package` out; it is then taken from the function's environment.

`category` must come from `blockr.core::suggested_categories()` (`input`, `transform`, `structured`, `plot`, `table`, `model`, `output`, `utility`, `uncategorized`). Anything else warns. Data-fetching blocks register as `input`, not `data`.

Register argument specs with `arguments = new_arg_specs(...)` as well. They fill the argument table in the block reference and tell the AI assistant what each argument means. See [Registering your block](/docs/dev/create-block#registering-your-block), which also covers registering through roxygen tags.

This makes collaboration easy: one team builds a package of domain-specific blocks, registers them, and they appear in every user's block menu. They also become available to the AI assistant for configuration.

## Further reading

- [blockr.docs](https://github.com/cynkra/blockr.docs): canonical block patterns and skills
- [Full extend-blockr vignette](https://bristolmyerssquibb.github.io/blockr.core/articles/extend-blockr.html): complete plugin examples
- [Block registry vignette](https://bristolmyerssquibb.github.io/blockr.core/articles/blocks-registry.html): registry internals
- [blockr.core API reference](https://bristolmyerssquibb.github.io/blockr.core/): full function documentation
