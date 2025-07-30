# minigrid

A tiny CSS grid implementation in typescript

<img width="528" height="528" alt="image" src="https://github.com/user-attachments/assets/952f4f37-0644-456c-87a5-1cd78a573c46" />

## Introducing Test Cases

1. Create a test case in `testcases/levelXX.ts`
2. Generate the browser result by running `bun run generate-browser-results`
3. Create a test in `tests/levelXX.test.ts` with the following structure:
4. Run `bun test tests/levelXX.test.ts -u` to see the test results and update the snapshots

```tsx
import { expect, test } from "bun:test"
import levelXX from "testcases/levelXX"
import browserResult from "testcases/levelXX.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("levelXX", () => {
  const { laidOutResult, outputViz, layout } = testGrid(levelXX, browserResult)

  expect(browserResult).toMatchInlineSnapshot()
  expect(laidOutResult).toMatchInlineSnapshot()

  expect(layout).toMatchInlineSnapshot()
  expect(outputViz).toMatchSvgSnapshot(import.meta.path)

  if (!process.env.BUN_UPDATE_SNAPSHOTS) {
    expect(laidOutResult).toEqual(browserResult)
  }
})
```
