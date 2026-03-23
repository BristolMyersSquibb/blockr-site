# Testing Blocks

<VideoEmbed id="F00HINMGglE" title="Testing blocks in blockr" />

## Overview

Custom blocks should be tested like any other R code. This 15-minute video walks through writing unit tests for blockr blocks using testthat.

## What the video covers

1. **Test setup**: configure a testthat test file for your block package
2. **Testing the expression**: verify that your block's core function produces correct output for known inputs
3. **Testing inputs**: confirm that input constructors create valid UI elements and that default values are sensible
4. **Testing edge cases**: handle empty data, missing columns, unexpected types, and other boundary conditions
5. **Integration testing**: connect blocks in a pipeline and verify the end-to-end result

## Why test blocks

- **Confidence during refactoring**: change internals without breaking the interface
- **Documentation by example**: tests show exactly how a block is expected to behave
- **CI/CD readiness**: automated tests catch regressions before they reach users

## Next steps

- [Creating custom blocks](creating-blocks): if you haven't built a block yet
- [Developer documentation](https://bristolmyerssquibb.github.io/blockr.core/): full blockr.core API reference
