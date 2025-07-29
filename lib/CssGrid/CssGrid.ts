import type { GraphicsObject } from "graphics-debug"

import type { CssGridOptions } from "../types"
import { CssGrid_convertToHtml } from "./CssGrid_convertToHtml"
import { CssGrid_visualize } from "./CssGrid_visualize"
import { CssGrid_layout } from "./CssGrid_layout"

/** Final position of a single grid item (1-based like CSS Grid) */
export interface GridCell {
  key: string
  row: number
  column: number
  rowSpan: number
  columnSpan: number
}

export class CssGrid {
  readonly opts: CssGridOptions

  constructor(opts: CssGridOptions) {
    this.opts = opts
    // 1. normalise templates → list of track sizes
    // 2. compute cell positions & final matrix
  }

  /** Returns the computed layout matrix, ready for rendering elsewhere */
  public layout(): {
    cells: GridCell[]
    rowSizes: number[]
    columnSizes: number[]
  } {
    return CssGrid_layout(this)
  }

  public convertToHtml(): string {
    return CssGrid_convertToHtml(this)
  }

  public visualize(): GraphicsObject {
    return CssGrid_visualize(this)
  }
}
