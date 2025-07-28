/* ────────────────────────────────────────────────────────
      The class skeleton
      ──────────────────────────────────────────────────────── */

import type { CssGridOptions } from "./types"

/** Final position of a single grid item (1-based like CSS Grid) */
export interface GridCell {
  key: string
  row: number
  column: number
  rowSpan: number
  columnSpan: number
}

export class CssGrid {
  private readonly opts: CssGridOptions

  constructor(opts: CssGridOptions) {
    this.opts = opts
    // 1. normalise templates → list of track sizes
    // 2. compute cell positions & final matrix
  }

  /** Returns the computed layout matrix, ready for rendering elsewhere */
  public layout(): GridCell[] {
    throw new Error("Not implemented")
  }
}
