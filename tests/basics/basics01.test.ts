import { expect, test } from "bun:test"
import { CssGrid } from "lib/CssGrid/CssGrid"
import basic01 from "testcases/basics/basics01"
import { getSvgFromGraphicsObject } from "graphics-debug"

test("minimal single-item layout", () => {
  const grid = new CssGrid(basic01)

  const go = grid.visualize()
  const svg = getSvgFromGraphicsObject(go)
  expect(svg).toMatchSvgSnapshot(import.meta.path)
})
