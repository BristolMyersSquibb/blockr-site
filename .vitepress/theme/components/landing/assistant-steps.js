// Steps for the *assistant-driven* hero variant. The board reuses the original
// BoardSteps frames (same five states / animations), so each prompt maps to one
// frame. The original merged "connect a plot" + "arrange" into one step, so that
// prompt covers both; a final Save prompt matches the board's last frame.
//   msg   — the user's typed message
//   tool  — the assistant's tool-call chip label
//   reply — the assistant's short confirmation (**bold** supported)
export const assistantSteps = [
  { n: '01', title: 'Add data',            body: 'Ask for a data block.',
    msg: 'Pick a dataset block.',
    tool: 'add_block("dataset")',
    reply: 'Added a **Data** block.' },
  { n: '02', title: 'Connect',             body: 'Ask to add and link a filter.',
    msg: 'Add a filter block and connect it to the dataset.',
    tool: 'add_block("filter") · add_link()',
    reply: 'Added **Filter** and linked it to **Data**.' },
  { n: '03', title: 'Configure',           body: 'Ask to set the filter.',
    msg: 'Configure the filter block.',
    tool: 'update_block("filter")',
    reply: 'Filter set to keep **A**, **B**.' },
  { n: '04', title: 'Arrange & visualise', body: 'Ask for a plot, then arrange.',
    msg: 'Add a plot and move the filter beside it.',
    tool: 'add_block("plot") · arrange_layout()',
    reply: 'Added **Plot** and arranged the panels.' }
]
