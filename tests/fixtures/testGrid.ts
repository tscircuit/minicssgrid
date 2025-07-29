import { getSvgFromGraphicsObject } from "graphics-debug"
import { CssGrid } from "lib/index"
import type { BrowserResult, CssGridOptions } from "lib/types"
import { visualizeBrowserResult } from "lib/visualizeBrowserResult"

export const testGrid = (
  input: CssGridOptions,
  browserResult: BrowserResult,
) => {
  const grid = new CssGrid(input)

  const browserResultSvg = getSvgFromGraphicsObject(
    visualizeBrowserResult(browserResult),
    {
      backgroundColor: "white",
    },
  )

  const layout = grid.layout()

  const outputViz = grid.visualize()
  const outputVizSvg = getSvgFromGraphicsObject(outputViz, {
    backgroundColor: "white",
  })

  return {
    browserResultSvg,
    layout,
    outputViz: outputVizSvg,
  }
}
