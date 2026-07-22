# Testing blocks

Custom blocks should be tested like any other R code. Because blocks are Shiny modules with reactive state, testing uses `shiny::testServer()` to drive the block without spinning up a browser session. It runs in around 0.2s per test and needs no `shinytest2`.

::: info Source of truth
Test patterns are documented canonically in [blockr.docs/patterns/r-driven-blocks.md](https://github.com/cynkra/blockr.docs/blob/main/patterns/r-driven-blocks.md#testing). The two patterns below mirror it.
:::

## Two patterns

| Pattern | What it tests | When to use |
|---|---|---|
| **A: `expr_server`** | The expression and reactive state | Default; verifies inputs produce the right code |
| **B: `block_server`** | The materialized result | When you need to assert on actual output (catches `block_output` S3 dispatch issues) |

Pick A by default; reach for B when you specifically need the rendered result.

## Pattern A: testing expression and state

Drive the block via `session$setInputs()`. Read back `session$returned$expr()` and individual state reactives. For `expr_type = "bquoted"` blocks, the framework normally resolves `.(data)` at evaluation time. In tests, do it yourself with this helper:

```r
eval_bquoted <- function(expr, df) {
  resolved <- do.call(bquote, list(expr, list(data = as.name("data"))))
  eval(resolved, envir = list(data = df))
}

test_that("threshold block builds correct expression", {
  blk <- new_my_block(column = "mpg", threshold = 20)

  testServer(
    blk$expr_server,
    args = list(data = reactive(mtcars)),
    {
      session$setInputs(threshold = 30)
      session$flushReact()

      e <- session$returned$expr()
      expect_equal(eval_bquoted(e, mtcars), dplyr::filter(mtcars, mpg > 30))
      expect_equal(session$returned$state$threshold(), 30)
    }
  )
})
```

Key points:

- `state` is a list of reactives. Call them: `session$returned$state$threshold()`, not `state()`.
- `bbquote()` leaves `.(data)` as a literal call in the returned expression. `eval_bquoted()` substitutes it via base `bquote()` before evaluation, mirroring what `wrap_expr()` does inside the framework.
- `session$flushReact()` forces reactives to settle before reading.

## Pattern B: testing the materialized result

Use this when you want to assert on the data the framework would render. It runs the same path as production:

```r
test_that("threshold block returns filtered rows", {
  blk <- new_my_block(column = "mpg", threshold = 20)

  testServer(
    blockr.core:::get_s3_method("block_server", blk),
    args = list(x = blk, data = list(data = function() mtcars)),
    {
      session$flushReact()
      expect_equal(nrow(session$returned$result()), sum(mtcars$mpg > 20))
    }
  )
})
```

## Constructor smoke test

A one-liner to confirm the constructor returns the right S3 class:

```r
test_that("constructor", {
  expect_s3_class(new_my_block(), "my_block")
})
```

## Pure helpers

If your block factors expression-building or input parsing into pure helpers, test them as plain R functions, no Shiny in scope:

```r
test_that("threshold_expr handles missing column", {
  expect_error(threshold_expr(column = NULL, threshold = 10))
})
```

This is the cheapest test tier; lean on it whenever logic can be lifted out of the server.

## Why not `shinytest2`?

Don't reach for `shinytest2` for R-driven blocks. Everything `shinytest2` would do (set inputs, click buttons, read outputs) `testServer()` already does in milliseconds. The exception is JS-driven blocks (custom input bindings can't be driven by `session$setInputs()`); see [blockr.docs js-driven-blocks.md](https://github.com/cynkra/blockr.docs/blob/main/patterns/js-driven-blocks.md#testing-js-driven).

## Further reading

- [blockr.docs r-driven-blocks.md, Testing section](https://github.com/cynkra/blockr.docs/blob/main/patterns/r-driven-blocks.md#testing): canonical R-driven test patterns
- [Full testing vignette](https://bristolmyerssquibb.github.io/blockr.core/articles/testing-blocks.html): more patterns and edge cases
- [Shiny testServer docs](https://shiny.posit.co/r/articles/improve/server-function-testing/): underlying testing framework
