# User, Builder, Developer

Around any blockr app there are three roles: the user who works inside it, the builder who shapes it, and the developer who extends what blocks can do.

## The user

The user opens a finished app and works inside it.
This might be a clinician exploring trial data, an actuary investigating a claims spike, or an analyst reviewing a portfolio.

What the user can do:

- Filter and cross-filter across linked tables.
- Drill down through visualizations.
- Switch between the views the builder set up.
- Ask the [AI assistant](03-ai-assistant) to explain the data and output of a block.
- Save the board and, on Posit Connect, share it with colleagues.

What the user sees depends on how the app is deployed.
An app can be deployed locked, by setting the `blockr.locked` option.

::: info
On a locked app nobody can add, remove or rewire blocks, change their settings, or edit the views.
The data still flows through the blocks, and saving and restoring the board still works.
:::

## The builder

The builder shapes the app.
No R code is required.
The workflow is a graph of blocks dragged onto a board and connected together.

What the builder does:

- Adds and connects data, transformation, and visualization blocks, by hand or by describing them to the [AI assistant](03-ai-assistant).
- Configures each block: which column to filter on, how to facet a chart.
- Creates views and arranges the blocks in them as tabbed and split panels.
- Leaves intermediate blocks out of a view, so users see only the result.

When a user asks for a new view, the builder can add it in minutes.

See [Build a dashboard](../../learn/02-build-a-dashboard) for a walkthrough.

## The developer

When no existing block does what you need, you write one.
There are two paths.

**[Script block](../../learn/04-custom-code).**
Write an R script as a workflow step, from the UI.
If you have already written the analysis in R, this brings it into the app with no wrapper code. Plain values the script assigns become controls on the block.

**Custom block.**
Write a `new_block()` definition (around 50 lines) with its own UI and server logic.
A custom block accepts data from upstream blocks, feeds blocks downstream, and is saved with the workflow.

See [Create a custom block](../../learn/05-create-a-block) and [Create a block](../dev/create-block) for the developer-side details.

::: info
Every blockr workflow compiles to reproducible R code.
A developer can inspect the exact pipeline a builder configured, and can take a workflow apart in plain R.
:::

## How the roles connect

A blockr workflow is data, not code.
A builder can hand a saved workflow to another builder without involving a developer.
Locking it for users is a deployment setting.
A developer can ship a block once and have every builder in the organization pick it up.
