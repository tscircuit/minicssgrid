import type { GraphicsObject } from "graphics-debug"
/* ────────────────────────────────────────────────────────
      The class skeleton
      ──────────────────────────────────────────────────────── */

import type { CssGridOptions } from "../types"
import { CssGrid_convertToHtml } from "./CssGrid_convertToHtml"

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
    throw new Error("Not implemented")
  }

  public convertToHtml(): string {
    return CssGrid_convertToHtml(this, this.opts)
  }

  public visualize(): GraphicsObject {
    throw new Error("Not implemented")
  }
}
