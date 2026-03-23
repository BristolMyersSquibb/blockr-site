# Creating Custom Blocks

<VideoEmbed id="-PdixmAscQI" title="Creating blocks in blockr" />

## Overview

blockr ships with blocks for common operations, but you can write your own in pure R. A custom block wraps any R function (a data transformation, an API call, a model fit) into a reusable component that anyone can drag onto the canvas.

## What the video covers

This 18-minute walkthrough demonstrates the full process:

1. **Block anatomy**: every block has inputs (UI controls), an expression (the R code that runs), and an output (the result passed downstream)
2. **Defining inputs**: use blockr's input constructors to create dropdowns, numeric sliders, text fields, and other controls
3. **Writing the expression**: reference input values in a standard R function that transforms the incoming data
4. **Registering the block**: make your block discoverable in the block menu so users can find and add it
5. **Connecting to the DAG**: how blockr's reactive engine automatically re-runs your block when upstream data changes

## Key concepts

- Blocks are **pure R**. No JavaScript, no HTML, no Shiny modules. Just an R function with typed inputs.
- The **input/output contract** is enforced: your block declares what data types it accepts and produces, so blockr can validate connections at the DAG level.
- Blocks are **packaged** as regular R functions. Distribute them in an R package, share them as scripts, or register them dynamically at app startup.

## Next steps

- [Testing blocks](testing-blocks): write tests for your custom blocks
- [Developer documentation](https://bristolmyerssquibb.github.io/blockr.core/): full blockr.core API reference
