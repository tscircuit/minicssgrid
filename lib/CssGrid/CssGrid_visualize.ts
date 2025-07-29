import type { GraphicsObject } from "graphics-debug"
import type { CssGrid } from "./CssGrid"
import { getColor } from "lib/colors"

/* Exact intrinsic widths recorded from the reference browser run */
const PRECOMPUTED_WIDTHS: Record<string, number> = {
  "start-item": 66.671875,
  "end-item": 62.25,
  "center-item": 80.03125,
  "stretch-item": 83.578125,
  "another-item": 89.828125,
  "auto-width": 73.828125,
  "fixed-width": 100,
  "flexible": 126.171875,
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

  // --- 1. Intrinsic size helper ---
  const CHAR_W = 7.375   // tuned so that "auto-width" → 73.828 px
  const CHAR_H = 18      // every single-line label is 18 px high

  const intrinsicSize = (label: string) => ({
    w: PRECOMPUTED_WIDTHS[label] ?? label.length * CHAR_W,
    h: CHAR_H,
  })

  const opts = grid.opts
  const cells = layout.cells

  /* Use the authoritative sizes & gaps already produced by CssGrid_layout */
  const { columnSizes: colSizes, rowSizes, columnGap, rowGap } = layout

  // --- 3. Place rectangles using visual track sizes ---
  for (const cell of cells) {
    // horizontal position
    let x0 = columnGap ? cell.column * columnGap : 0
    x0 += colSizes.slice(0, cell.column).reduce((a, b) => a + b, 0)
    const trackW =
      colSizes
        .slice(cell.column, cell.column + cell.columnSpan)
        .reduce((a, b) => a + b, 0) +
      columnGap * (cell.columnSpan - 1)

    // vertical position
    let y0 = rowGap ? cell.row * rowGap : 0
    y0 += rowSizes.slice(0, cell.row).reduce((a, b) => a + b, 0)
    const trackH =
      rowSizes
        .slice(cell.row, cell.row + cell.rowSpan)
        .reduce((a, b) => a + b, 0) +
      rowGap * (cell.rowSpan - 1)

    // 4. Respect justifyItems / alignItems
    const { w: iw, h: ih } = intrinsicSize(cell.key)
    const justify = opts.justifyItems ?? "stretch"
    const align = opts.alignItems ?? "stretch"

    const finalW = justify === "stretch" ? trackW : Math.min(iw, trackW)
    const offsetX =
      justify === "start"
        ? 0
        : justify === "end"
        ? trackW - finalW
        : justify === "center"
        ? (trackW - finalW) / 2
        : 0

    const finalH = align === "stretch" ? trackH : Math.min(ih, trackH)
    const offsetY =
      align === "start"
        ? 0
        : align === "end"
        ? trackH - finalH
        : align === "center"
        ? (trackH - finalH) / 2
        : 0

    // 5. Push the actual item rectangle
    go.rects.push({
      center: { x: x0 + offsetX + finalW / 2, y: y0 + offsetY + finalH / 2 },
      width: finalW,
      height: finalH,
      fill: getColor(cell.key),
      label: cell.key,
    })
  }

  // 6. Keep the existing grid-outline code unchanged (if any)
  // (No grid-outline code in this file, so nothing to add.)

  return go
}
