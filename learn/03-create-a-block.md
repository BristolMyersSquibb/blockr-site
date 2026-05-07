# Create a custom block

You can create custom blockr blocks with any coding agent (Claude Code, Copilot, Cursor, etc.).
No deep Shiny knowledge needed. Describe what you want and the agent will write it.

Prefer to write blocks by hand? See the [Developer docs](/docs/dev/create-block) for the full technical reference.

## Create your first block

Point your coding agent at the `blockr-block` skill in [blockr.docs](https://github.com/cynkra/blockr.docs) and describe the block:

> Read https://github.com/cynkra/blockr.docs/blob/main/agents/skills/blockr-block/SKILL.md
> and any docs it references, then follow it to create a new package
> `blockr.catfacts` with a block that fetches cat facts from
> `https://catfact.ninja/facts`. The user should be able to choose how
> many facts to retrieve.

The skill picks the pattern (R-driven by default for a first block), names the constructor, writes tests, and registers the block. To install it properly so it auto-triggers in future sessions, see the [blockr.docs skills README](https://github.com/cynkra/blockr.docs/blob/main/agents/skills/README.md).

The skill will:

- Scaffold a proper R package (DESCRIPTION, NAMESPACE, R/, tests/)
- Write a working block with UI, server logic, and tests
- Verify the block in a real Shiny session

::: tip Why R-driven first?
JS-driven blocks give nicer UX (multi-row builders, autocomplete, drag handles) but require custom JavaScript. Save them for later — once your block works in R, you can polish the UI with JS.
:::

## Test it

The skill prints the verification command when it's done. It looks like:

```r
pkgload::load_all("blockr.catfacts")
shiny::runApp(blockr.core::serve(new_cat_facts_block()))
```

You should see a data table with cat facts and a control to change how many to fetch.

## Try more

Once your first block works, try asking your agent to:

- Create a transform block that summarizes your data
- Create a plot block that visualizes results
- Add error handling for API failures
- Write tests with `testServer()`

Each time, point the agent at the [`blockr-block` skill](https://github.com/cynkra/blockr.docs/blob/main/agents/skills/blockr-block/SKILL.md). It picks up the right patterns automatically.

::: tip Doing this often?
If you'll be writing blocks regularly, install the skill locally so it auto-triggers on prompts like "add a filter block":

```bash
git clone --depth 1 https://github.com/cynkra/blockr.docs
cp -r blockr.docs/agents/skills/blockr-block ~/.claude/skills/
```
:::

## Next steps

- [Block anatomy](/docs/dev/create-block): detailed technical reference
- [Extend blockr](/docs/dev/extend-blockr): plugins and the block registry
- [Testing blocks](/docs/dev/testing-blocks): testing patterns with `testServer()`
