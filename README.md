# Blockr docs

## User vs. Developer
This repository contains the **user**-facing docs for blockr.
The **developer**-facing docs can be found in the respective R package pkgdown sites such as [blockr.core](https://bristolmyerssquibb.github.io/blockr.core/).

The decision to split the documentation this way ensures:

1. Non-developers are shielded from technical details ensuring everything they read is relevant to them.
2. No fancy quarto build steps are required to re-import documentation created elsewhere.
This keeps the code base simple and maintainable and creates a clear spearation of needs.

## Project structure

The [diataxis](https://diataxis.fr/) approach to documentation is used to structure these documents into four buckets:

- **Tutorials**: Learn by doing with step-by-step tutorials that walk you through practical examples.
- **How-To’s**: Reach a specific goal with focused guides for common tasks.
- **Fundamentals**: Broaden your understanding with in-depth explanations of key concepts.
- **Blocks**: Lookup a block with detailed specifications and parameters.

The relevant sections can be found by the same name in the folder structure:

```
./
├── _quarto.yml
├── docs/
├── fundamentals/    <----
├── howto/           <----
├── index.qmd
├── logos/
├── README.md
├── blocks/       <----
├── styles.css
└── tutorials/       <----
```

## How to update these docs

A GitHub pages site is build from the `docs/` folder in the `main` branch.
To see your local changes appear on the live site, you need to run `quarto render` first.
This command updates the docs/ folder with your changes.
