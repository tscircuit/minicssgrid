import { expect, test } from "bun:test"
import { CssGrid } from "lib/CssGrid"
import basic01 from "testcases/basics/basics01"

test("minimal single-item layout", () => {
  const grid = new CssGrid(basic01)
  console.log(grid.convertToHtml())
})
