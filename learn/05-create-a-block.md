# Create a custom block

When the same [function block](04-custom-code) keeps reappearing across your boards, it has earned promotion to a real block: registered, configurable, in the picker for everyone. This tutorial shows how to write your own block, either with a coding agent (Claude Code, Cursor, Positron with Copilot) or by hand in R. blockr handles state, reactivity and saving. Your code turns the input data into a plot or a new dataset. Both paths start from a starter package: a small working block, tests included, that you change into the block you want.

## With a coding agent

Clone the docs repo so your agent has the starter packages and guides:

```bash
git clone --depth 1 https://github.com/cynkra/blockr.docs
```

Give your agent this prompt, with your own visualization in place of the timeline:

> Read blockr.docs/agents/skills/blockr-block/SKILL.md and follow it to
> create a new package blockr.timeline with an event timeline block:
> one horizontal lane per subject, a point per event positioned by a time
> column, colored by event type. Use the JS-driven pattern.

The skill tells the agent how to proceed: copy the starter package, rename it, rewrite the plot and the controls, keep the tests passing, and check the block in a running board. Data loading, filtering, and state handling are not part of the job; blockr and the upstream blocks cover that.

### Try it

```r
pkgload::load_all("blockr.timeline")
blockr::run_app()
```

Loading the package registers the block. `run_app()` starts the app you know from [Build your first app](/learn/01-build-your-first-app); right-click the canvas and you will find your block in the picker under Plots. Connect a data block and configure it. There is also a ready-made board in the package, left over from the agent's verification step: `shiny::runApp("blockr.timeline")`.

::: tip R-driven or JS-driven?
The prompt above asks for the JS-driven pattern: the controls are written in JavaScript, like those of blockr's built-in blocks. That is more code, but the agent writes it and the tests cover it, including a browser test. Write "Use the R-driven pattern" instead if you want plain Shiny inputs and less machinery.
:::

## By hand, in R

Copy the R-driven starter package, which builds the same block with plain Shiny inputs and no JavaScript:

```bash
git clone --depth 1 https://github.com/cynkra/blockr.docs
cp -r blockr.docs/scaffolds/rblock blockr.timeline
```

Rename the package as described in `blockr.docs/scaffolds/README.md`. Two files do the actual work:

- `R/expr-builders.R` turns the user's choices into the R code the block generates. For a new visualization, this is where you start:

```r
make_myplot_expr <- function(x, y) {
  bbquote(
    ggplot2::ggplot(.(data), ggplot2::aes(factor(.(x)), .(y))) +
      ggplot2::geom_boxplot(),
    list(x = as.name(x), y = as.name(y))
  )
}
```

- `R/myplot_block.R` wraps that in a Shiny module: the inputs, the `state` used for saving and restoring, and the constructor that registers the block.

Run the tests as you edit, and the app to see the result:

```r
pkgload::load_all("blockr.timeline")
testthat::test_dir("blockr.timeline/tests/testthat")
blockr::run_app()
```

For the full picture read [Create a block](/docs/dev/create-block); [Testing blocks](/docs/dev/testing-blocks) explains the `testServer()` setup used by the starter's tests.

## Going further

Some ideas for a second step, with or without an agent:

- Handle empty data, missing values, and columns that disappear upstream
- Add an option to the block, and a test for it
- Rewrite the controls of an R-driven block as JS-driven

::: tip Building blocks regularly?
Install the skill locally so it triggers on prompts like "add a timeline block":

```bash
cp -r blockr.docs/agents/skills/blockr-block ~/.claude/skills/
```
:::

## Share it

The result is an ordinary R package. Push it to GitHub and others can install it:

```r
pak::pak("you/blockr.timeline")
```

After installing and loading, the block appears in their block picker as well.

## Next steps

- [Block anatomy](/docs/dev/create-block): detailed technical reference
- [Extend blockr](/docs/dev/extend-blockr): plugins and the block registry
- [Testing blocks](/docs/dev/testing-blocks): testing patterns with `testServer()`
