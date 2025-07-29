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

  const { cells, rowSizes, columnSizes, rowGap = 0, columnGap = 0 } = layout

  for (const cell of cells) {
    const { column, row, columnSpan, rowSpan, key } = cell

    let x = 0
    let y = 0

    for (let i = 0; i < column; i++) {
      x += columnSizes[i]!
      x += columnGap
    }

    for (let i = 0; i < row; i++) {
      y += rowSizes[i]!
      y += rowGap
    }

    let width = 0
    let height = 0

    for (let i = column; i < column + columnSpan; i++) {
      width += columnSizes[i]!
      if (i < column + columnSpan - 1) width += columnGap
    }

    for (let i = row; i < row + rowSpan; i++) {
      height += rowSizes[i]!
      if (i < row + rowSpan - 1) height += rowGap
    }

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
