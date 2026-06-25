# Hero stepper — Motivation

## What the header has to communicate

The blockr.site landing header is the first thing a visitor sees. blockr is a
*visual, no-code framework for R*: its whole value is the **process** of
building a dashboard by dragging blocks, wiring them, configuring them, and
arranging the result. A static hero screenshot shows an outcome but not the
idea; a screen-recording (the previous "90-second tour") is heavy, ages badly,
needs hosting, and cannot be themed.

We want the header to *show what blockr is* in a few seconds, on first paint,
without the visitor doing anything: a board coming together step by step.

## Why not the obvious options

* **Raster screenshots / GIF.** Fixed resolution, blurry on retina, no dark-mode
  variant, large payload, impossible to restyle when the product UI changes.
* **Embedded video / iframe (`blockr.cloud`).** Network-dependent, slow first
  paint, autoplay restrictions, no control over framing, off-brand chrome.
* **A live mounted blockr app.** Far too heavy for a landing page, brings the
  whole Shiny/htmlwidgets stack, non-deterministic, not SSR-friendly.

## What we want instead

A **self-contained, hand-built vector mock** that auto-plays through the core
blockr workflow as a compact *stepper*:

1. **Add data** — open the block browser, pick a data block, it lands on the canvas.
2. **Connect** — drag a wire from one block's output port to the next block's input.
3. **Configure** — tweak a filter (add a value, watch the result table react).
4. **Arrange & visualise** — connect a plot, nest it as a tab, drag panels into a layout.
5. **Save & share** — save the board.

It must be **light** (pure HTML/CSS/SVG, no images, no video, no runtime deps),
**themeable** (uses the site's design tokens, works in light/dark), **SSR-safe**
(renders under VitePress static generation), **accessible** (honours
`prefers-reduced-motion`, keyboard-reachable step controls), and **interactive
but unobtrusive** (auto-advances, pauses on hover, lets the visitor jump to any
step). It should only animate when actually on screen, and cost nothing when off
screen or when the tab is backgrounded.

## Why a reusable spec

The widget is intricate (five frames, each a small choreographed CSS animation,
plus a shared auto-play stepper and a faked cursor). It was built iteratively and
the timing/positioning details are easy to get subtly wrong. This spec captures
the architecture and conventions precisely enough that another contributor — or
another Claude session — can reproduce the widget exactly and integrate it into
the landing header with **minimal, additive changes** to the existing VitePress
theme.
