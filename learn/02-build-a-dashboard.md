# Build a dashboard

In this tutorial you turn the workflow from the previous tutorial into a dashboard: end users see the filter controls and the plot, nothing else.

![The finished dashboard: filter controls on the left, plot on the right](02-img-result.png)

::: info
This builds on the workflow from [Build your first app](01-build-your-first-app). Complete that tutorial first.
:::

Watch the flow, then follow the steps below:

<video controls muted style="width: 100%; border: 1px solid var(--vp-c-divider); border-radius: 8px;" src="/videos/tutorial-02.webm" poster="/videos/tutorial-02-poster.png"></video>

## Do it yourself

1. Drag the Ggplot tab to the right edge of the window. A colored outline shows where the panel will land; release to give the plot its own panel:

   ![Dragging the Ggplot tab, drop target outlined on the right](02-img-drag.png)

   The same drag can group panels: drop a tab next to another tab and they share a tab group.

2. Close what your users don't need: click the "x" on the Workflow tab and on the Dataset tab. The "+" next to any tab bar brings panels back.
3. Resize the panels by dragging the divider between them.
4. Trim each block to its dashboard role, with the two toggles in the block header: the sliders icon shows or hides the controls, the eye icon shows or hides the preview. Hide the filter's preview and the plot's controls.
5. The dashboard stays live: remove a species from the filter and the plot updates.

The layout and the toggles are part of the board, so they are saved and restored with it: what you arrange is what people using your board get.

## Next

Need a block that doesn't exist yet? [Create a custom block](03-create-a-block).
