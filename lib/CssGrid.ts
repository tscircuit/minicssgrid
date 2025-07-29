import type { GraphicsObject } from "graphics-debug"
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
  public layout(): {
    cells: GridCell[]
    rowSizes: number[]
    columnSizes: number[]
  } {
    throw new Error("Not implemented")
  }

  public convertToHtml(): string {
    // helper to turn a template value into valid CSS text
    const stringifyTemplate = (tpl?: string | string[]) =>
      !tpl ? undefined : typeof tpl === "string" ? tpl : tpl.join(" ");

    /* ───────────── 1. build container style ───────────── */
    const s: string[] = ["display:grid"];

    const { 
      gridTemplateRows,
      gridTemplateColumns,
      gap,
      justifyItems,
      alignItems,
      containerWidth,
      containerHeight,
    } = this.opts;

    const tRows = stringifyTemplate(gridTemplateRows);
    if (tRows) s.push(`grid-template-rows:${tRows}`);

    const tCols = stringifyTemplate(gridTemplateColumns);
    if (tCols) s.push(`grid-template-columns:${tCols}`);

    if (gap !== undefined) {
      if (typeof gap === "number") {
        s.push(`gap:${gap}px`);
      } else {
        const [rowGap, colGap] = gap;
        s.push(`row-gap:${rowGap}px`, `column-gap:${colGap}px`);
      }
    }

    if (justifyItems) s.push(`justify-items:${justifyItems}`);
    if (alignItems)   s.push(`align-items:${alignItems}`);
    if (containerWidth  != null) s.push(`width:${containerWidth}px`);
    if (containerHeight != null) s.push(`height:${containerHeight}px`);

    const containerStyle = s.join(";");

    /* ───────────── 2. build children markup ───────────── */
    const childDivs = this.opts.children.map((c) => {
      const cs: string[] = [];

      if (c.area) {
        cs.push(`grid-area:${c.area}`);
      } else {
        if (c.row !== undefined || c.rowSpan !== undefined) {
          const start = c.row ?? "auto";
          const span  = c.rowSpan ? ` / span ${c.rowSpan}` : "";
          cs.push(`grid-row:${start}${span}`);
        }
        if (c.column !== undefined || c.columnSpan !== undefined) {
          const start = c.column ?? "auto";
          const span  = c.columnSpan ? ` / span ${c.columnSpan}` : "";
          cs.push(`grid-column:${start}${span}`);
        }
      }

      const childStyle = cs.join(";");
      // innerText is just the key for demo purposes
      return `  <div style="${childStyle}">${c.key}</div>`;
    });

    /* ───────────── 3. final HTML string ───────────── */
    return `<div style="${containerStyle}">\n${childDivs.join("\n")}\n</div>`;
  }

  public visualize(): GraphicsObject {
    throw new Error("Not implemented")
  }
}
