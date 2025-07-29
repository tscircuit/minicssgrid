import { CssGrid } from "lib/index"
import type { BrowserResult, CssGridOptions } from "lib/types"
import { hasJSDocParameterTags } from "typescript"

export const testGrid = (
  input: CssGridOptions,
  browserResult: BrowserResult,
) => {
  const grid = new CssGrid(level1)

  const browserResultSvg = getSvgFromGraphicsObject(
    visualizeBrowserResult(browserResult),
    {
      backgroundColor: "white",
    },
  )

  const layout = grid.layout()

  const outputViz = grid.visualize()

  return {
    browserResultSvg,
    layout,
    outputViz,
  }
}
