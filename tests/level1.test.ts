import { expect, test } from "bun:test"
import { CssGrid } from "lib/CssGrid/CssGrid"
import level1 from "testcases/level1"
import browserResult from "testcases/level1.browser-result.json"
import { getSvgFromGraphicsObject } from "graphics-debug"
import { visualizeBrowserResult } from "lib/visualizeBrowserResult"

test("level1", () => {
  const grid = new CssGrid(level1)

  expect(visualizeBrowserResult(browserResult)).toMatchSvgSnapshot(
    import.meta.path,
  )
  // expect(grid.layout()).toMatchInlineSnapshot()

  // const go = grid.visualize()
  // const svg = getSvgFromGraphicsObject(go)
  // expect(svg).toMatchSvgSnapshot(import.meta.path)
})
