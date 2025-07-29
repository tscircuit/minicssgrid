import type { GraphicsObject } from "graphics-debug"
import type { CssGrid } from "./CssGrid"

const COLORS = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(
  (i) => `hsl(${(i * 360) / 9}deg, 100%, 50%)`,
)

const stringHash = (str: string): number => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
  }
  return hash
}

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

  const { cells, rowSizes, columnSizes } = layout

  for (const cell of cells) {
    const { column, row, columnSpan, rowSpan, key } = cell

    let x = 0
    let y = 0

    for (let i = 0; i < column; i++) {
      x += columnSizes[i]!
    }

    for (let i = 0; i < row; i++) {
      y += rowSizes[i]!
    }

    let width = 0
    let height = 0

    for (let i = column; i < column + columnSpan; i++) {
      width += columnSizes[i]!
    }

    for (let i = row; i < row + rowSpan; i++) {
      height += rowSizes[i]!
    }

    go.rects.push({
      center: { x: x + width / 2, y: y + height / 2 },
      width,
      height,
      color: COLORS[stringHash(key) % COLORS.length],
      label: key,
    })
  }

  return go
}
