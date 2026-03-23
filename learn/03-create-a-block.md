# Create a custom block

You can create custom blockr blocks with any coding agent (Claude Code, Copilot, Cursor, etc.).
No deep Shiny knowledge needed. Describe what you want and the agent will write it.

Prefer to write blocks by hand? See the [Developer docs](/docs/dev/create-block) for the full technical reference.

## Setup

Clone blockr.core as a reference. Your coding agent will learn the right patterns from it:

```bash
git clone https://github.com/BristolMyersSquibb/blockr.core
```

## Create your first block

Navigate to your workspace and ask your coding agent to create a block package.
Point it at blockr.core so it picks up the right patterns:

> Create a new blockr package called blockr.catfacts with a data block
> that fetches cat facts from `https://catfact.ninja/facts`.
> Include a parameter for the number of facts to retrieve.
> Use blockr.core as reference for block patterns.

The agent will:

- Read the blockr.core source code
- Create a proper R package (DESCRIPTION, NAMESPACE, R/, tests/)
- Write a working block with UI, server logic, and tests
- Follow the block conventions automatically

## Test it

```r
devtools::load_all("blockr.catfacts")
blockr.core::serve(new_cat_facts_block())
```

You should see a data table with cat facts and a control to change how many facts to fetch.

## How blocks work

Every block has three parts: a **constructor** (sets defaults), a **server** (reactive logic), and a **UI** (inputs).

```r
new_my_block <- function(n = 6L, ...) {
  new_transform_block(
    function(id, data) {
      moduleServer(id, function(input, output, session) {
        r_n <- reactiveVal(n)
        observeEvent(input$n, r_n(input$n))

        list(
          expr = reactive(
            bbquote(utils::head(.(data), n = .(n)), list(n = r_n()))
          ),
          state = list(n = r_n)
        )
      })
    },
    function(id) {
      numericInput(NS(id, "n"), "Number of rows", value = n, min = 1L)
    },
    class = "my_block",
    ...
  )
}
```

When reviewing what the agent generates, check these rules:

| Rule | What to look for |
|------|-----------------|
| **Reactive values** | Every parameter has a `reactiveVal`, synced via `observeEvent` |
| **Expressions** | Built with `bbquote()`, using `.(data)` for input data |
| **State list** | Every constructor parameter appears in the `state` list |
| **UI init** | Inputs initialize with constructor values, not empty |

## Block types

| If you want to... | Use |
|---|---|
| Load external data (files, APIs, databases) | `new_data_block(...)` |
| Transform incoming data (filter, mutate, join) | `new_transform_block(...)` |
| Create a visualization | `new_plot_block(...)` |

## Try more

Once your first block works, try asking your agent to:

- Create a transform block that summarizes your data
- Create a plot block that visualizes results
- Add error handling for API failures
- Write tests with `testServer()`

Each time, point the agent at blockr.core for reference. It will pick up the patterns.

## Next steps

- [Block anatomy](/docs/dev/create-block): detailed technical reference
- [Extend blockr](/docs/dev/extend-blockr): plugins and the block registry
- [Testing blocks](/docs/dev/testing-blocks): testing patterns with `testServer()`
