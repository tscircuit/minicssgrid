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

  const laidOutResult: Record<
    string,
    { x: number; y: number; width: number; height: number }
  > = {}

  for (const rect of algoOutputGraphics.rects ?? []) {
    laidOutResult[rect.label!] = {
      x: rect.center.x - rect.width / 2, // Convert center to top-left
      y: rect.center.y - rect.height / 2, // Convert center to top-left
      width: rect.width,
      height: rect.height,
    }
  }

  algoOutputGraphics.points?.push(
    {
      x: 0,
      y: 0,
    },
    {
      x: 100,
      y: 0,
    },
    {
      x: 100,
      y: 100,
    },
    { x: 0, y: 100 },
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
