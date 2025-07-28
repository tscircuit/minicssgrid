import { expect, test } from "bun:test"
import { CssGrid } from "../../lib/CssGrid"

test("minimal single-item layout", () => {
  const grid = new CssGrid({
    children: [{ key: "a" }],
  })

  expect(grid.layout()).toEqual([
    { key: "a", row: 1, column: 1, rowSpan: 1, columnSpan: 1 },
  ])
})
