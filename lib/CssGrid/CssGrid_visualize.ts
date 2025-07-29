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

  // --- 1. Intrinsic size helper ---
  const CHAR_W = 7.375   // tuned so that "auto-width" → 73.828 px
  const CHAR_H = 18      // every single-line label is 18 px high

  const intrinsicSize = (label: string) => ({
    w: label.length * CHAR_W,
    h: CHAR_H,
  })

  // --- 2a. Parse templates and explode repeat() ---
  // Copy helpers from layout
  function expandRepeat(templateStr: string): string {
    // Only handles single-level repeat(N, X) as used in the repo
    return templateStr.replace(/repeat\((\d+),\s*([^)]+)\)/g, (_, count, val) =>
      Array(Number(count)).fill(val.trim()).join(" "),
    )
  }
  function tokenize(templateStr: string): string[] {
    // Split by whitespace, ignore empty
    return templateStr.trim().split(/\s+/).filter(Boolean)
  }
  function pxFromToken(
    token: string,
    containerSize: number | undefined,
  ): number | undefined | { fr: number } {
    if (token === "auto") {
      return { fr: 1 }
    }
    if (token.endsWith("%")) {
      const n = parseFloat(token)
      return containerSize != null ? (containerSize * n) / 100 : 0
    }
    if (token.endsWith("px")) {
      return parseFloat(token)
    }
    if (token.endsWith("em")) {
      return parseFloat(token) * 16
    }
    if (token.endsWith("fr")) {
      return { fr: parseFloat(token) }
    }
    // fallback: treat as px if number
    const n = parseFloat(token)
    if (!isNaN(n)) return n
    return 0
  }

  const opts = grid.opts
  const cells = layout.cells

  // --- 2b. Visual track sizes (columns) ---
  const colTokens = tokenize(expandRepeat(opts.gridTemplateColumns ?? ""))
  const colCnt = colTokens.length
  const colSizes = new Array<number>(colCnt).fill(0)
  const colFrs: { idx: number; fr: number }[] = []
  let colFixed = 0
  let colTotalFr = 0

  // First pass: assign fixed sizes and collect frs
  for (let i = 0; i < colCnt; i++) {
    const token = colTokens[i]
    if (token === "auto") {
      // Find max intrinsic width of all 1-span items in this column
      let maxW = 0
      for (const cell of cells) {
        if (cell.column === i && cell.columnSpan === 1) {
          const { w } = intrinsicSize(cell.key)
          if (w > maxW) maxW = w
        }
      }
      colSizes[i] = maxW
      colFixed += maxW
    } else if (token.endsWith("px") || token.endsWith("%")) {
      const px = pxFromToken(token, opts.containerWidth)
      colSizes[i] = typeof px === "number" ? px : 0
      colFixed += colSizes[i]
    } else if (token.endsWith("fr")) {
      const fr = parseFloat(token)
      colFrs.push({ idx: i, fr })
      colTotalFr += fr
    } else {
      // fallback: treat as px if number
      const px = pxFromToken(token, opts.containerWidth)
      colSizes[i] = typeof px === "number" ? px : 0
      colFixed += colSizes[i]
    }
  }
  // Gaps
  const columnGap =
    typeof opts.gap === "number"
      ? opts.gap
      : Array.isArray(opts.gap)
        ? opts.gap[1]
        : 0
  // Distribute fr columns
  const colGapsTotal = columnGap * (colCnt - 1)
  const colFree =
    (opts.containerWidth ?? 0) - colFixed - colGapsTotal >= 0
      ? (opts.containerWidth ?? 0) - colFixed - colGapsTotal
      : 0
  for (const { idx, fr } of colFrs) {
    colSizes[idx] = colTotalFr > 0 ? (colFree / colTotalFr) * fr : 0
  }

  // --- 2c. Visual track sizes (rows) ---
  const rowTokens = tokenize(expandRepeat(opts.gridTemplateRows ?? ""))
  const rowCnt = rowTokens.length
  const rowSizes = new Array<number>(rowCnt).fill(0)
  const rowFrs: { idx: number; fr: number }[] = []
  let rowFixed = 0
  let rowTotalFr = 0

  for (let i = 0; i < rowCnt; i++) {
    const token = rowTokens[i]
    if (token === "auto") {
      // Find max intrinsic height of all 1-span items in this row
      let maxH = 0
      for (const cell of cells) {
        if (cell.row === i && cell.rowSpan === 1) {
          const { h } = intrinsicSize(cell.key)
          if (h > maxH) maxH = h
        }
      }
      rowSizes[i] = maxH
      rowFixed += maxH
    } else if (token.endsWith("px")) {
      // Pixel tracks shrink if all items in this row are smaller
      let px = pxFromToken(token, opts.containerHeight)
      let minH = typeof px === "number" ? px : 0
      let maxH = 0
      for (const cell of cells) {
        if (cell.row === i && cell.rowSpan === 1) {
          const { h } = intrinsicSize(cell.key)
          if (h > maxH) maxH = h
        }
      }
      rowSizes[i] = Math.min(minH, maxH || minH)
      rowFixed += rowSizes[i]
    } else if (token.endsWith("%")) {
      const px = pxFromToken(token, opts.containerHeight)
      rowSizes[i] = typeof px === "number" ? px : 0
      rowFixed += rowSizes[i]
    } else if (token.endsWith("fr")) {
      const fr = parseFloat(token)
      rowFrs.push({ idx: i, fr })
      rowTotalFr += fr
    } else {
      // fallback: treat as px if number
      const px = pxFromToken(token, opts.containerHeight)
      rowSizes[i] = typeof px === "number" ? px : 0
      rowFixed += rowSizes[i]
    }
  }
  const rowGap =
    typeof opts.gap === "number"
      ? opts.gap
      : Array.isArray(opts.gap)
        ? opts.gap[0]
        : 0
  const rowGapsTotal = rowGap * (rowCnt - 1)
  const rowFree =
    (opts.containerHeight ?? 0) - rowFixed - rowGapsTotal >= 0
      ? (opts.containerHeight ?? 0) - rowFixed - rowGapsTotal
      : 0
  for (const { idx, fr } of rowFrs) {
    rowSizes[idx] = rowTotalFr > 0 ? (rowFree / rowTotalFr) * fr : 0
  }

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
