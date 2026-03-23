# Getting Started

Three short videos covering the basics: what blockr is, how to load data, and how to arrange your workspace into a dashboard.

## What is blockr?

<VideoEmbed id="_j0dOkGrkew" title="What is blockr?" />

A 90-second overview of the blockr framework. blockr lets you build data pipelines visually by connecting blocks on a canvas. Each block performs one operation (load data, filter rows, create a chart) and blocks connect into a directed acyclic graph (DAG) that runs automatically. The result is a reactive pipeline that updates in real time as you change inputs.

## Importing data

<VideoEmbed id="LsIjUv3dy38" title="Importing data in blockr" />

How to get data into blockr. The dataset block gives you access to built-in example datasets (like `palmerpenguins`). For your own files, the [read block](/docs/blocks/03-io) supports CSV, Excel, Parquet, and many other formats. You can upload, browse the filesystem, or load from a URL.

::: tip Try it yourself
[Open an empty workflow](https://blockr.cloud/app/empty) and add a dataset block to get started.
:::

## Creating dashboards

<VideoEmbed id="n7mM_s4-oyQ" title="Creating dashboards in blockr" />

Once you have a working pipeline, you can turn it into a polished dashboard. Drag windows to rearrange the layout, group them into tabs, resize panels, and toggle input/output visibility to control what your audience sees. The [Build a dashboard](/learn/02-build-a-dashboard) tutorial walks through this in detail.

## Saving and restoring workflows

Blockr automatically manages workflow versioning. You can save snapshots, restore previous versions, and switch between different workflows.

1. **Rename** your workflow by editing the top-left corner text box
2. **Save** the current state with the save button
3. **Restore** a previous version via the workflow manager. Press the workflow button in the top-left, then open the History tab
4. **Switch workflows** using the Workflows tab to jump between entirely different pipelines

Each save point is timestamped. The "View all versions" button provides finer-grained controls for restoration and deletion.

## Next steps

- [Build your first app](/learn/01-build-your-first-app): hands-on written tutorial
- [Filtering and selecting data](filtering-and-selecting): next video topic
