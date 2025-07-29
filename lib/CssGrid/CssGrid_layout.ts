import type { CssGrid, GridCell } from "./CssGrid"

export const CssGrid_layout = (
  grid: CssGrid,
): {
  cells: GridCell[]
  rowSizes: number[]
  columnSizes: number[]
} => {
  const {
    children,
    containerWidth,
    containerHeight,
    gridTemplateColumns,
    gridTemplateRows,
  } = grid.opts
  return {
    cells: [],
    rowSizes: [],
    columnSizes: [],
  }
}
