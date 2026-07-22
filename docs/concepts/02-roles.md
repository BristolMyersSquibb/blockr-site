# User, Builder, Developer

Around any blockr app there are three roles: the user who works inside it, the builder who shapes it, and the developer who extends what blocks can do.

## The user

The user opens a finished app and works inside it.
This might be a clinician exploring trial data, an actuary investigating a claims spike, or an analyst reviewing a portfolio.

What the user can do:

- Filter and cross-filter across linked tables.
- Drill down through visualizations.
- Ask the [AI assistant](03-ai-assistant) to configure the exposed controls, or to explain the data and output of any block.
- Save and share the resulting view as a URL.

What the user does not see: the workflow editor, the block library, or the configuration panels.
The app is locked at the level the builder chose.

::: info
Locking is per-app.
It freezes the workflow so users cannot edit blocks or rewire the graph.
Any controls the builder left exposed (filters, sliders, dropdowns) stay fully interactive, and users can still save and share the resulting state.
:::

## The builder

The builder shapes the app.
No R code is required.
The workflow is a graph of blocks dragged onto a board and connected together.

What the builder does:

- Adds and connects data, transformation, and visualization blocks, by hand or by describing them to the [AI assistant](03-ai-assistant).
- Configures each block: which column to filter on, how to facet a chart, which page a block lives on.
- Creates pages and arranges layouts.
- Hides intermediate blocks so users see only the final view.

When a user asks for a new view, the builder can add it in minutes.

See [Build a dashboard](../../learn/02-build-a-dashboard) for a walkthrough.

## The developer

When no existing block does what you need, you write one.
There are two paths.

**[Function block](../../learn/04-custom-code).**
Wrap any R function as a block from the UI.
If you have already written the analysis in R, this brings it into the app with no wrapper code.

**Custom block.**
Write a `new_block()` definition (around 50 lines) with its own UI and server logic.
A custom block accepts data from upstream blocks, feeds visualization blocks downstream, supports the AI assistant, and serializes with the workflow.

See [Create a custom block](../../learn/05-create-a-block) and [Create a block](../dev/create-block) for the developer-side details.

::: info
Every blockr workflow compiles to reproducible R code.
A developer can inspect the exact pipeline a builder configured, and can take a workflow apart in plain R.
:::

## How the roles connect

A blockr workflow is data, not code.
A builder can hand an unlocked workflow to another builder, or lock it for users, without involving a developer.
A developer can ship a block once and have every builder in the organization pick it up.
