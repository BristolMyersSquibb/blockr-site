# Custom code, without a custom block

Sometimes no block does the one step you need. Before building anything, drop a function block into the workflow: a few lines of plain R, living inside the board.

![Mean bill ratio per species, computed by a function block](04-img-result.png)

Watch the flow, then follow the steps below:

<video controls muted style="width: 100%; border: 1px solid var(--vp-c-divider); border-radius: 8px;" src="/videos/tutorial-04.webm" poster="/videos/tutorial-04-poster.png"></video>

## Do it yourself

1. Add a "Function block" after a dataset block with "penguins". Its preview shows the data passing through, unchanged.
2. In the function block's panel, click the edit icon and write:

   ```r
   function(data) {
     data$bill_ratio <- data$bill_len / data$bill_dep
     data
   }
   ```

   The function receives the upstream data; whatever it returns flows downstream.

   ![The function block editor with the three-line function](04-img-code.png)

3. Click "Run". The preview gains a "bill_ratio" column.
4. Add a "Chart" block after the function block: group by "species", value "bill_ratio", function "mean". The derived column works like any other.

Where your deployment has the AI assistant enabled, you don't even have to write the R: describe the step and the assistant writes the function; you review and run it.

When the same function keeps reappearing across your boards, that is the sign it wants to be a real block, with its own controls and a place in the picker.

## Next

Turn a recurring function into a block of its own: [Create a custom block](05-create-a-block).
