# Testing blocks

<VideoEmbed id="F00HINMGglE" title="Testing blocks in blockr" />

Custom blocks should be tested like any other R code. Because blocks are Shiny modules with reactive state, testing requires `shiny::testServer()` to simulate a running app without spinning up a full browser session.

## Common test cases

### Constructor class

Verify the block constructor creates the right S3 class:

```r
test_that("block constructor", {
  expect_s3_class(new_my_block(), "my_block")
})
```

### Input widgets

Test that UI inputs update the block's reactive values:

```r
test_that("inputs update reactive values", {
  testServer(
    app = new_my_block()$expr_server,
    expr = {
      session$setInputs(column = "mpg")
      expect_equal(column(), "mpg")

      session$setInputs(threshold = 20)
      expect_equal(threshold(), 20)
    }
  )
})
```

### State

Confirm the block returns the correct state after user interaction:

```r
test_that("state is returned correctly", {
  testServer(
    app = new_my_block()$expr_server,
    expr = {
      session$setInputs(column = "mpg", threshold = 20)
      s <- session$returned$state()
      expect_equal(s$column, "mpg")
      expect_equal(s$threshold, 20)
    }
  )
})
```

### Expression output

Verify the generated R expression is correct:

```r
test_that("expression is valid", {
  testServer(
    app = new_my_block()$expr_server,
    expr = {
      session$setInputs(column = "mpg", threshold = 20)
      e <- session$returned$expr()
      expect_s3_class(e, "call")
    }
  )
})
```

### Error handling

Test that the block handles edge cases (empty data, missing columns, unexpected types):

```r
test_that("handles missing column gracefully", {
  testServer(
    app = new_my_block()$expr_server,
    args = list(data = reactive(data.frame())),
    expr = {
      session$setInputs(column = "nonexistent")
      expect_error(session$returned$expr())
    }
  )
})
```

## Further reading

- [Full testing vignette](https://bristolmyerssquibb.github.io/blockr.core/articles/testing-blocks.html): more patterns and edge cases
- [Shiny testServer docs](https://shiny.posit.co/r/articles/improve/server-function-testing/): underlying testing framework
