<script setup>
const blockSteps = [
  {
    label: 'Skeleton',
    code: 'new_my_block <- function(column = NULL, threshold = 0, ...) {\n  blockr.core::new_transform_block(\n    server = function(id, data) {\n      shiny::moduleServer(id, function(input, output, session) {\n        # ...\n      })\n    },\n    ui = function(id) {\n      # ...\n    },\n    class = "my_block",\n    expr_type = "bquoted",\n    external_ctrl = TRUE,\n    allow_empty_state = "column",\n    ...\n  )\n}'
  },
  {
    label: 'Add UI',
    code: 'new_my_block <- function(column = NULL, threshold = 0, ...) {\n  blockr.core::new_transform_block(\n    server = function(id, data) {\n      shiny::moduleServer(id, function(input, output, session) {\n        # ...\n      })\n    },\n    ui = function(id) {\n      shiny::tagList(\n        shiny::selectInput(shiny::NS(id, "column"), "Column", choices = NULL),\n        shiny::numericInput(shiny::NS(id, "threshold"), "Threshold", value = threshold)\n      )\n    },\n    class = "my_block",\n    expr_type = "bquoted",\n    external_ctrl = TRUE,\n    allow_empty_state = "column",\n    ...\n  )\n}'
  },
  {
    label: 'Add server',
    code: 'new_my_block <- function(column = NULL, threshold = 0, ...) {\n  blockr.core::new_transform_block(\n    server = function(id, data) {\n      shiny::moduleServer(id, function(input, output, session) {\n        r_column <- shiny::reactiveVal(column)\n        r_threshold <- shiny::reactiveVal(threshold)\n\n        shiny::observeEvent(input$column, r_column(input$column))\n        shiny::observeEvent(input$threshold, r_threshold(input$threshold))\n\n        shiny::observeEvent(names(data()), {\n          shiny::updateSelectInput(\n            session, "column",\n            choices = names(data()), selected = r_column()\n          )\n        })\n\n        list(\n          expr = shiny::reactive({\n            shiny::req(r_column())\n            blockr.core::bbquote(\n              dplyr::filter(.(data), .(col) > .(thr)),\n              list(col = as.name(r_column()), thr = r_threshold())\n            )\n          }),\n          state = list(column = r_column, threshold = r_threshold)\n        )\n      })\n    },\n    ui = function(id) {\n      shiny::tagList(\n        shiny::selectInput(shiny::NS(id, "column"), "Column", choices = NULL),\n        shiny::numericInput(shiny::NS(id, "threshold"), "Threshold", value = threshold)\n      )\n    },\n    class = "my_block",\n    expr_type = "bquoted",\n    external_ctrl = TRUE,\n    allow_empty_state = "column",\n    ...\n  )\n}'
  },
  {
    label: 'Register',
    code: '# R/zzz.R\n.onLoad <- function(libname, pkgname) {\n  blockr.core::register_block(\n    ctor = "new_my_block",\n    name = "Threshold filter",\n    description = "Filter rows where a numeric column exceeds a threshold",\n    category = "transform",\n    package = pkgname\n  )\n}'
  }
]
</script>

# Create a block

<VideoEmbed id="-PdixmAscQI" title="Creating blocks in blockr" />

Write custom blocks in pure R to extend blockr with your own logic. A block is a [Shiny module](https://mastering-shiny.org/scaling-modules.html) that returns an `expr` (the R code it generates) and a `state` (its current input values). A workflow is a Shiny app composed of connected blocks.

Blocks should live in an R package so they can be registered, shared, and tested.

::: tip Just getting started?
The fastest way to your first block is to let a coding agent scaffold it. See the [cat facts walkthrough](/learn/03-create-a-block). It ships a working block (package, tests, registration) in one prompt. Come back here when you want the technical reference.
:::

::: info Source of truth
Block patterns are documented canonically in [blockr.docs](https://github.com/cynkra/blockr.docs/tree/main/patterns). `r-driven-blocks.md` covers everything below in more depth, plus the JS-driven path for polished UIs.
:::

## Block anatomy

Every block is built from a constructor that wires together a server function and a UI function, then forwards them to a typed parent constructor (`new_data_block`, `new_transform_block`, `new_join_block`, `new_plot_block`, or `new_variadic_block`).

Step through the animation to see how the pieces come together:

<CodeStepper :steps="blockSteps" />

### Constructor

The constructor exposes every UI-controllable parameter as an argument and forwards `...` to the parent so framework options (`class`, `allow_empty_state`, `expr_type`, `external_ctrl`, …) can pass through:

```r
new_my_block <- function(column = NULL, threshold = 0, ...) {
  blockr.core::new_transform_block(
    server = ...,
    ui = ...,
    class = "my_block",
    expr_type = "bquoted",
    external_ctrl = TRUE,
    allow_empty_state = "column",
    ...
  )
}
```

Pick the parent based on the block's role:

| Block does... | Parent | Server signature |
|---|---|---|
| Loads from API / file / database | `new_data_block()` | `function(id)` |
| Reshapes one upstream input | `new_transform_block()` | `function(id, data)` |
| Joins two inputs | `new_join_block()` | `function(id, x, y)` |
| Takes N inputs | `new_variadic_block()` | `function(id, ...args)` |
| Renders a plot | `new_plot_block()` | `function(id, data)` |

### Server function

Wraps a `shiny::moduleServer()` and returns `list(expr = ..., state = ...)`:

```r
function(id, data) {
  shiny::moduleServer(id, function(input, output, session) {
    r_column <- shiny::reactiveVal(column)
    r_threshold <- shiny::reactiveVal(threshold)

    shiny::observeEvent(input$column, r_column(input$column))
    shiny::observeEvent(input$threshold, r_threshold(input$threshold))

    shiny::observeEvent(names(data()), {
      shiny::updateSelectInput(
        session, "column",
        choices = names(data()), selected = r_column()
      )
    })

    list(
      expr = shiny::reactive({
        shiny::req(r_column())
        blockr.core::bbquote(
          dplyr::filter(.(data), .(col) > .(thr)),
          list(col = as.name(r_column()), thr = r_threshold())
        )
      }),
      state = list(column = r_column, threshold = r_threshold)
    )
  })
}
```

Rules that bite:

- **`expr` is a quoted call**, not a string. Use `blockr.core::bbquote()` with `.(x)` splices and pair it with `expr_type = "bquoted"` on the parent constructor. Splice the upstream data via `.(data)`.
- **`state` is a list of reactives**, one per constructor parameter. Names must match constructor argument names exactly. Serialization breaks silently otherwise.
- **The expression must evaluate outside a reactive context.** If `expr` only works because a reactive happens to be in scope, the export pipeline will fail.
- **Don't expose data inputs as constructor arguments.** `data` / `x` / `y` / `...args` are wired by the framework via the server signature.

### UI function

A standard Shiny module UI taking `id` and returning `shiny.tag` objects. Initialise inputs with the constructor's defaults (not empty), so unsaved blocks render their starting state:

```r
function(id) {
  shiny::tagList(
    shiny::selectInput(shiny::NS(id, "column"), "Column", choices = NULL),
    shiny::numericInput(shiny::NS(id, "threshold"), "Threshold", value = threshold)
  )
}
```

## Registering your block

Register on package load so the block has metadata (without it, every constructor call emits a "No block metadata available" warning, and the block doesn't show up in board / AI / MCP discovery):

```r
# R/zzz.R
.onLoad <- function(libname, pkgname) {
  blockr.core::register_block(
    ctor = "new_my_block",
    name = "Threshold filter",
    description = "Filter rows where a numeric column exceeds a threshold",
    category = "transform",
    package = pkgname
  )
}
```

`category` must be one of `blockr.core::suggested_categories()`: `input`, `transform`, `structured`, `plot`, `table`, `model`, `output`, `utility`, `uncategorized`. Data-fetching blocks are `input`, not `data`. To register multiple blocks at once, use `register_blocks()` (vectorised).

## AI-controllable blocks

Blockr's AI assistant configures blocks for end users by writing to their state from outside the block's server. To opt in, set `external_ctrl` on the parent constructor:

| `external_ctrl` value | Meaning |
|---|---|
| `FALSE` (default) | Block state is read-only from outside. AI can't change it. |
| `TRUE` | All constructor arguments are externally writable. |
| `"column"` (a string) | Only the named state slot is externally writable. |
| `c("column", "threshold")` | Multiple named slots are writable. |

State names handed to `external_ctrl` must match the names in the server's `state` list (and therefore the constructor argument names). The framework validates writes by re-evaluating the block expression: if evaluation fails, the previous state is restored and downstream evaluation is gated until the next successful submit. See `?blockr.core::ctrl_block` for the plugin that drives this.

::: tip
Per-package convention: opt blocks in by default (`external_ctrl = TRUE`) unless you have a reason not to. Blocks that aren't externally controllable disappear from AI/MCP suggestions.
:::

## Further reading

- [blockr.docs patterns](https://github.com/cynkra/blockr.docs/tree/main/patterns): canonical R-driven and JS-driven references
- [Full create-block vignette](https://bristolmyerssquibb.github.io/blockr.core/articles/create-block.html): detailed walkthrough with advanced examples
- [Block registry vignette](https://bristolmyerssquibb.github.io/blockr.core/articles/blocks-registry.html): registry system details
- [Extend blockr vignette](https://bristolmyerssquibb.github.io/blockr.core/articles/extend-blockr.html): plugins and custom UI
