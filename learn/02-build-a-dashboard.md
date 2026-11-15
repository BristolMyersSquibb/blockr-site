# Build a dashboard

In this tutorial you turn the workflow from the previous tutorial into an interactive dashboard: a chart your users can click, and a table that follows the click.

![The dashboard: clicking the Adelie bar filters the table to Adelie penguins](02-img-result.png)

::: info
This builds on the workflow from [Build your first app](01-build-your-first-app). Complete that tutorial first.
:::

Watch the flow, then follow the steps below:

<video controls muted style="width: 100%; border: 1px solid var(--vp-c-divider); border-radius: 8px;" src="/videos/tutorial-02.webm" poster="/videos/tutorial-02-poster.png"></video>

## Do it yourself

1. Swap the plot for interactive blocks: remove the ggplot block ("Remove block" in its "…" menu), then add a "Chart" block after the filter and a "Table" block after the chart (add and connect as in the first tutorial). In the chart's settings (the gear in its corner), set Category to "species". Under "Interaction", tick "Filter on" in the Drill-down section; it filters on the clicked group.
2. Drag the table tab onto the right part of its panel. An outline shows where the panel will land; release to give the table its own panel:

   ![Dragging the table tab, drop target outlined on the right](02-img-drag.png)

   The same drag can group panels: drop a tab next to another tab and they share a tab group.

3. Close what your users don't need: the "x" on the Workflow tab at the left edge and on the Dataset and Filter tabs. The "+" next to any tab bar brings panels back.
4. Hide the preview tables of the chart and the table with the eye in their headers. The eye in a block's header toggles its preview; the controls are hidden and shown with "Controls" in the "…" menu.
5. Click a bar. The chart filters everything downstream, so the table now shows exactly those penguins; the label under the chart says which filter is active. Click another bar, or "Clear", and the table follows.

The layout and the toggles are part of the board and are saved and restored with it.

