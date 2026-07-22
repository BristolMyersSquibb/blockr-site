<script setup>
const blockSteps = [
  {
    label: 'Skeleton',
    code: 'new_myplot_block <- function(x = character(), y = character(), ...) {\n  blockr.core::new_plot_block(\n    server = function(id, data) {\n      shiny::moduleServer(id, function(input, output, session) {\n        # ...\n      })\n    },\n    ui = function(id) {\n      # ...\n    },\n    class = "myplot_block",\n    expr_type = "bquoted",\n    allow_empty_state = TRUE,\n    ...\n  )\n}'
  },
  {
    label: 'Add UI',
    code: 'new_myplot_block <- function(x = character(), y = character(), ...) {\n  blockr.core::new_plot_block(\n    server = function(id, data) {\n      shiny::moduleServer(id, function(input, output, session) {\n        # ...\n      })\n    },\n    ui = function(id) {\n      shiny::tagList(\n        shiny::selectInput(shiny::NS(id, "xcol"), "X axis (groups)",\n                           choices = x, selected = x),\n        shiny::selectInput(shiny::NS(id, "ycol"), "Y axis (values)",\n                           choices = y, selected = y)\n      )\n    },\n    class = "myplot_block",\n    expr_type = "bquoted",\n    allow_empty_state = TRUE,\n    ...\n  )\n}'
  },
  {
    label: 'Add server',
    code: 'new_myplot_block <- function(x = character(), y = character(), ...) {\n  blockr.core::new_plot_block(\n    server = function(id, data) {\n      shiny::moduleServer(id, function(input, output, session) {\n        x_col <- shiny::reactiveVal(x)\n        y_col <- shiny::reactiveVal(y)\n\n        shiny::observeEvent(input$xcol, x_col(input$xcol))\n        shiny::observeEvent(input$ycol, y_col(input$ycol))\n\n        shiny::observeEvent(colnames(data()), {\n          cols <- colnames(data())\n          shiny::updateSelectInput(\n            session, "xcol", choices = c("Pick a column" = "", cols),\n            selected = if (isTRUE(x_col() %in% cols)) x_col() else ""\n          )\n          shiny::updateSelectInput(\n            session, "ycol", choices = c("Pick a column" = "", cols),\n            selected = if (isTRUE(y_col() %in% cols)) y_col() else ""\n          )\n        })\n\n        list(\n          expr = shiny::reactive(make_myplot_expr(x_col(), y_col())),\n          state = list(x = x_col, y = y_col)\n        )\n      })\n    },\n    ui = function(id) {\n      shiny::tagList(\n        shiny::selectInput(shiny::NS(id, "xcol"), "X axis (groups)",\n                           choices = x, selected = x),\n        shiny::selectInput(shiny::NS(id, "ycol"), "Y axis (values)",\n                           choices = y, selected = y)\n      )\n    },\n    class = "myplot_block",\n    expr_type = "bquoted",\n    allow_empty_state = TRUE,\n    ...\n  )\n}'
  },
  {
    label: 'Register',
    code: '# R/zzz.R\n.onLoad <- function(libname, pkgname) {\n  blockr.core::register_blocks(\n    ctor = "new_myplot_block",\n    name = "My plot",\n    description = "Boxplot with jittered points by group",\n    category = "plot",\n    package = pkgname\n  )\n}'
  }
]
</script>

# Create a block

Write custom blocks in pure R to extend blockr with your own logic. A block is a [Shiny module](https://mastering-shiny.org/scaling-modules.html) that returns an `expr` (the R code it generates) and a `state` (its current input values). A workflow is a Shiny app composed of connected blocks.

Blocks should live in an R package so they can be registered, shared, and tested.

::: tip Just getting started?
The fastest way to your first block is to start from a starter package and change it, by hand or with a coding agent. See [Create a custom block](/learn/05-create-a-block). Come back here when you want the technical reference.
:::

::: info Source of truth
The example on this page is the `myplot` block from the [rblock starter package](https://github.com/cynkra/blockr.docs/tree/main/scaffolds/rblock), which ships with passing tests and a demo board. Block patterns are documented canonically in [blockr.docs](https://github.com/cynkra/blockr.docs/tree/main/patterns); `r-driven-blocks.md` covers everything below in more depth, plus the JS-driven path for polished control UIs.
:::

## Block anatomy

Every block is built from a constructor that wires together a server function and a UI function, then forwards them to a typed parent constructor (`new_data_block`, `new_transform_block`, `new_join_block`, `new_plot_block`, or `new_variadic_block`).

Step through the animation to see how the pieces come together:

<CodeStepper :steps="blockSteps" />

### Constructor

The constructor exposes every UI-controllable parameter as an argument and forwards `...` to the parent so framework options (`class`, `allow_empty_state`, `expr_type`, `dat_valid`, ...) can pass through.

Pick the parent based on the block's role:

| Block does... | Parent | Server signature |
|---|---|---|
| Loads from API / file / database | `new_data_block()` | `function(id)` |
| Reshapes one upstream input | `new_transform_block()` | `function(id, data)` |
| Joins two inputs | `new_join_block()` | `function(id, x, y)` |
| Takes N inputs | `new_variadic_block()` | `function(id, ...args)` |
| Renders a plot | `new_plot_block()` | `function(id, data)` |

### Expression builder

The code a block generates is best factored into a pure function, kept in its own file (`R/expr-builders.R` in the starter). It takes the user's choices and returns a quoted expression, so it can be unit-tested without Shiny:

```r
is_set <- function(v) {
  is.character(v) && length(v) == 1L && nzchar(v)
}

make_myplot_expr <- function(x = character(), y = character()) {
  if (!is_set(x) || !is_set(y)) {
    # Unconfigured: render a friendly placeholder instead of erroring.
    return(
      bbquote(
        ggplot2::ggplot() +
          ggplot2::annotate(
            "text",
            x = 0, y = 0, label = "Pick x and y columns to draw the plot",
            color = "grey45", size = 5
          ) +
          ggplot2::theme_void()
      )
    )
  }

  bbquote(
    ggplot2::ggplot(
      .(data),
      ggplot2::aes(x = factor(.(x)), y = .(y), fill = factor(.(x)))
    ) +
      ggplot2::geom_boxplot(alpha = 0.6, outlier.shape = NA) +
      ggplot2::geom_jitter(width = 0.15, alpha = 0.5, size = 1.5) +
      ggplot2::labs(x = .(x_lab), y = .(y_lab)) +
      ggplot2::guides(fill = "none") +
      ggplot2::theme_minimal(base_size = 13),
    list(
      x = as.name(x),
      y = as.name(y),
      x_lab = x,
      y_lab = y
    )
  )
}
```

Rules that bite:

- **Build language objects, never strings.** `as.name()` handles any column name, including ones with spaces. `paste()` plus parsing breaks on the first odd name.
- **Qualify every function** (`ggplot2::`): the expression is evaluated outside your package's namespace.
- **An unconfigured block must not error.** Return a placeholder (plot blocks) or a `.(data)` pass-through (transform blocks) until required inputs are set.

### Server function

Wraps a `shiny::moduleServer()` and returns `list(expr = ..., state = ...)`. See the "Add server" step above for the full code. The pattern: one `reactiveVal` per constructor argument, observers that copy inputs into them, and an observer that refreshes column choices when upstream data changes.

Rules that bite:

- **`expr` is a quoted call**, not a string. Use `blockr.core::bbquote()` with `.(x)` splices and pair it with `expr_type = "bquoted"` on the parent constructor. Splice the upstream data via `.(data)`.
- **`state` is a list of reactives**, one per constructor parameter. Names must match constructor argument names exactly. Serialization breaks silently otherwise.
- **The expression must evaluate outside a reactive context.** If `expr` only works because a reactive happens to be in scope, the export pipeline will fail.
- **Don't expose data inputs as constructor arguments.** `data` / `x` / `y` / `...args` are wired by the framework via the server signature.

### UI function

A standard Shiny module UI taking `id` and returning `shiny.tag` objects. Initialise inputs with the constructor's defaults (not empty), so restored blocks render their saved state.

## Registering your block

Register on package load so the block has metadata (without it, every constructor call emits a "No block metadata available" warning, and the block doesn't show up in board / AI / MCP discovery):

```r
# R/zzz.R
.onLoad <- function(libname, pkgname) {
  blockr.core::register_blocks(
    ctor = "new_myplot_block",
    name = "My plot",
    description = "Boxplot with jittered points by group",
    category = "plot",
    package = pkgname
  )
}
```

`category` must be one of `blockr.core::suggested_categories()`: `input`, `transform`, `structured`, `plot`, `table`, `model`, `output`, `utility`, `uncategorized`. Data-fetching blocks are `input`, not `data`. `register_blocks()` is vectorised; one call can register several blocks.

## External control (experimental)

The AI assistant and other controllers can write a block's state from outside its server. This is opt-in via `external_ctrl` on the parent constructor, and marked experimental in blockr.core:

| `external_ctrl` value | Meaning |
|---|---|
| `FALSE` (default) | Block state is read-only from outside. |
| `TRUE` | All constructor arguments are externally writable. |
| `"x"` (a string) | Only the named state slot is externally writable. |
| `c("x", "y")` | Multiple named slots are writable. |

State names handed to `external_ctrl` must match the names in the server's `state` list. The framework validates writes by re-evaluating the block expression: if evaluation fails, the previous state is restored. See `?blockr.core::ctrl_block` for the plugin that drives this.

JS-driven blocks built on the blockr.dplyr factory have this enabled already, including the sync back into the controls. For an R-driven block, enabling it is not enough on its own: stock inputs only change on user events, so add observers that push state changes back into the inputs (`updateSelectInput()` and friends), or external writes update the result while the controls keep showing the old values.

## Further reading

- [rblock starter package](https://github.com/cynkra/blockr.docs/tree/main/scaffolds/rblock): this page's example as a complete package with tests and demo board
- [blockr.docs patterns](https://github.com/cynkra/blockr.docs/tree/main/patterns): canonical R-driven and JS-driven references
- [Full create-block vignette](https://bristolmyerssquibb.github.io/blockr.core/articles/create-block.html): detailed walkthrough with advanced examples
- [Block registry vignette](https://bristolmyerssquibb.github.io/blockr.core/articles/blocks-registry.html): registry system details
- [Extend blockr vignette](https://bristolmyerssquibb.github.io/blockr.core/articles/extend-blockr.html): plugins and custom UI
