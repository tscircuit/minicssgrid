import type { GraphicsObject } from "graphics-debug"
import type { CssGrid } from "./CssGrid"
import { getColor } from "lib/colors"

export const CssGrid_visualize = (grid: CssGrid): GraphicsObject => {
  const layout = grid.layout()

  const go: Required<GraphicsObject> = {
    title: "CssGrid",
    coordinateSystem: "screen",
    lines: [],
    circles: [],
    points: [],
    rects: [],
    texts: [],
  }

  const { cells } = layout

  for (const cell of cells) {
    const { x, y, width, height, key } = cell

    go.rects.push({
      center: { x: x + width / 2, y: y + height / 2 },
      width,
      height,
      fill: getColor(key),
      label: key,
    })
  }

  return go
}
