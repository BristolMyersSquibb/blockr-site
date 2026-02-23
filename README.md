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
├── blocks/          <----
├── styles.css
└── tutorials/       <----
```

## Updating the docs

### Issue

Originally, the [blockr](github.com/BristolMyersSquibb/blockr) package repository contained quarto documentation in a `site/` subfolder which was then published to gh pages to serve the user-facing documentation.
Since then, the user-facing documentation has been rewritten into this repo as a new quarto project, starting from scratch.
This strategy was decided in order to keep the user-facing documentation separate from the blockr R package developer-facing documentation.
This allows for both ease of maintenance and clearer spearation of concerns.
Consequently, there is still a need for the documentation in this repository to build and point to the original gh pages url slug `/blockr` and not `/blockr-site`, to maintain continuity.

### Solution

Any pushes to main in this repo trigger the `.github/workflows/trigger-deploy.yml` workflow.
This workflow then sends a dispatch event to the blockr repo which tiggers its own [deploy-site](https://github.com/BristolMyersSquibb/blockr/blob/main/.github/workflows/deploy-site.yaml) workflow.
The deploy-site workflow then checks out this `blockr-site` repo, renders the docs, uploads them as a GitHub Pages artifact, and then finally deploys the site.

### How-to

Simply run `quarto render` to update and build the `docs/` folder (containing the assets for the live site) and then push your changes to `main`.
Your changes should be reflected in the blockr repo gh pages accessible via [https://bristolmyerssquibb.github.io/blockr/]()

If you want to manually trigger the `deploy-site` workflow in blockr, you can run:

```bash
gh api repos/BristolMyersSquibb/blockr/dispatches \
  --method POST \
  -f event_type=deploy-site
```
