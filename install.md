---
title: Install blockr
description: Install blockr locally and launch your first board.
---

# Install blockr

blockr is free and open source, released under [GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.html).

You need [R](https://www.r-project.org/) 4.5 or later. The tutorials use the
`penguins` dataset, which R ships from version 4.5 on.

To try blockr without installing anything, open the
[Playground](https://blockr.cloud/app/empty) on blockr.cloud. In an
organisation, blockr usually runs on its own server, such as Posit Connect or
ShinyProxy. [For organisations](/organisations) has the details.

## Install and launch

```r
# install.packages("pak")
pak::pak("BristolMyersSquibb/blockr")
blockr::run_app()
```

This installs [blockr](https://github.com/BristolMyersSquibb/blockr) and the
packages the tutorials use, from GitHub:
[blockr.core](https://bristolmyerssquibb.github.io/blockr.core/),
[blockr.dock](https://bristolmyerssquibb.github.io/blockr.dock/),
[blockr.dag](https://bristolmyerssquibb.github.io/blockr.dag/),
[blockr.dplyr](https://bristolmyerssquibb.github.io/blockr.dplyr/),
[blockr.ggplot](https://bristolmyerssquibb.github.io/blockr.ggplot/),
[blockr.io](https://bristolmyerssquibb.github.io/blockr.io/),
[blockr.ui](https://bristolmyerssquibb.github.io/blockr.ui/),
[blockr.viz](https://github.com/BristolMyersSquibb/blockr.viz),
[blockr.dm](https://github.com/BristolMyersSquibb/blockr.dm),
[blockr.script](https://github.com/BristolMyersSquibb/blockr.script),
[blockr.session](https://bristolmyerssquibb.github.io/blockr.session/) and
[blockr.assistant](https://github.com/BristolMyersSquibb/blockr.assistant).
No GitHub token is needed.

`run_app()` opens an empty board in your browser. The Workflow canvas sits on
the left: right-click it and choose "Add block" to start.

Next: [Build your first app](/learn/01-build-your-first-app).

## Turn on the assistant

The assistant is a chat panel that builds and changes blocks for you
([The AI assistant](/docs/concepts/03-ai-assistant)). It talks to a language
model through [ellmer](https://ellmer.tidyverse.org/). By default it uses
`ellmer::chat_openai()`, which reads the `OPENAI_API_KEY` environment
variable. Add the assistant next to the Workflow canvas:

```r
library(blockr)
run_app(
  extensions = list(
    new_dag_extension(),
    blockr.assistant::new_assistant_extension()
  )
)
```

For another provider, set the `blockr.chat_function` option before
`run_app()`. ellmer's [setup guide](https://ellmer.tidyverse.org/articles/ellmer.html)
lists the providers and their keys. For Claude:

```r
options(
  blockr.chat_function = function(system_prompt = NULL, params = NULL) {
    ellmer::chat_anthropic(system_prompt = system_prompt, params = params)
  }
)
```

## More packages

Domain packages such as blockr.pharma or blockr.stats are separate installs,
for example `pak::pak("BristolMyersSquibb/blockr.pharma")`. The
[package overview](/packages/) lists them.
