import {
  getSvgFromGraphicsObject,
  stackGraphicsHorizontally,
} from "graphics-debug"
import { CssGrid } from "lib/index"
import type { BrowserResult, CssGridOptions } from "lib/types"
import { visualizeBrowserResult } from "lib/visualizeBrowserResult"

export const testGrid = (
  input: CssGridOptions,
  browserResult: BrowserResult,
) => {
  const grid = new CssGrid(input)

  const browserResultGraphics = visualizeBrowserResult(browserResult)
  const browserResultSvg = getSvgFromGraphicsObject(browserResultGraphics, {
    backgroundColor: "white",
  })

  const layout = grid.layout()

  const algoOutputGraphics = grid.visualize()

  // Use the itemCoordinates directly from the layout
  const laidOutResult = layout.itemCoordinates

  algoOutputGraphics.lines?.push(
    {
      strokeColor: "black",
      points: [
        { x: 0, y: 0 },
        { x: 100, y: 0 },
      ],
    },
    {
      strokeColor: "black",
      points: [
        { x: 100, y: 0 },
        { x: 100, y: 100 },
      ],
    },
    {
      strokeColor: "black",
      points: [
        { x: 100, y: 100 },
        { x: 0, y: 100 },
      ],
    },
    {
      strokeColor: "black",
      points: [
        { x: 0, y: 100 },
        { x: 0, y: 0 },
      ],
    },
  )
  const outputVizSvg = getSvgFromGraphicsObject(
    stackGraphicsHorizontally([algoOutputGraphics, browserResultGraphics], {
      titles: ["algo", "correct"],
    }),
    {
      backgroundColor: "white",
    },
  )

  return {
    browserResultSvg,
    layout,
    laidOutResult,
    outputViz: outputVizSvg,
  }
}
