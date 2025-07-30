import type { CssGrid, GridCell } from "./CssGrid"

// --- Helpers ---

// Expand repeat(N, X) into X X X...
function expandRepeat(templateStr: string): string {
  // Only handles single-level repeat(N, X) as used in the repo
  return templateStr.replace(/repeat\((\d+),\s*([^)]+)\)/g, (_, count, val) =>
    Array(Number(count)).fill(val.trim()).join(" "),
  )
}

// Tokenize a template string into track tokens
function tokenize(templateStr: string): string[] {
  // Split by whitespace, ignore empty
  return templateStr.trim().split(/\s+/).filter(Boolean)
}

// pxFromToken: returns px value or undefined for "fr"
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

// CSS negative line index resolution
function resolveNegativeLine(idx: number, trackCnt: number): number {
  return idx > 0 ? idx : trackCnt + 2 + idx
}

export const CssGrid_layout = (
  grid: CssGrid,
): {
  cells: GridCell[]
  rowSizes: number[]
  columnSizes: number[]
  rowGap: number
  columnGap: number
  itemCoordinates: Record<
    string,
    { x: number; y: number; width: number; height: number }
  >
} => {
  const opts = grid.opts
  const children = opts.children

  // --- 2. Parse user options for templates ---
  let rowsTpl: string | undefined
  let colsTpl: string | undefined

  if ("gridTemplate" in opts && typeof opts.gridTemplate === "string") {
    // e.g. "1fr 2fr / 100px 1fr"
    const [rows, cols] = opts.gridTemplate.split("/")
    rowsTpl = rows?.trim()
    colsTpl = cols?.trim()
  } else {
    rowsTpl =
      typeof opts.gridTemplateRows === "string"
        ? opts.gridTemplateRows
        : undefined
    colsTpl =
      typeof opts.gridTemplateColumns === "string"
        ? opts.gridTemplateColumns
        : undefined
  }

  // --- 3. Build numeric track size arrays ---

  function buildTrackSizes(
    tpl: string | undefined,
    containerSize: number | undefined,
    gap: number,
  ): number[] {
    if (!tpl) return []
    const expanded = expandRepeat(tpl)
    const tokens = tokenize(expanded)
    const trackCount = tokens.length
    const sizeForTracks =
      containerSize != null ? containerSize - gap * (trackCount - 1) : undefined
    // First pass: collect fixed sizes and total fr
    let sumFixed = 0
    let totalFr = 0
    const frTokens: { idx: number; fr: number }[] = []
    const sizes: (number | { fr: number })[] = []
    tokens.forEach((token, i) => {
      const px = pxFromToken(token, sizeForTracks)
      if (typeof px === "number") {
        sizes.push(px)
        sumFixed += px
      } else if (px && typeof px === "object" && "fr" in px) {
        sizes.push(px)
        totalFr += px.fr
        frTokens.push({ idx: i, fr: px.fr })
      } else {
        sizes.push(0)
        sumFixed += 0
      }
    })
    // Compute free space
    const free = Math.max((sizeForTracks ?? 0) - sumFixed, 0)
    // Second pass: assign fr tracks
    return sizes.map((v) =>
      typeof v === "number" ? v : totalFr > 0 ? (free / totalFr) * v.fr : 0,
    )
  }

  const rowGap =
    typeof opts.gap === "number"
      ? opts.gap
      : Array.isArray(opts.gap)
        ? opts.gap[0]
        : 0
  const columnGap =
    typeof opts.gap === "number"
      ? opts.gap
      : Array.isArray(opts.gap)
        ? opts.gap[1]
        : 0

  const rowSizes = buildTrackSizes(rowsTpl, opts.containerHeight, rowGap)
  const columnSizes = buildTrackSizes(colsTpl, opts.containerWidth, columnGap)

  const rowCount = rowSizes.length
  const colCount = columnSizes.length

  // --- 4. Item placement (auto-placement, cut-down) ---

  const cells: GridCell[] = []
  let nextAutoCell = 0 // row-major index

  for (const child of children) {
    // Placement: row/col start
    let rowStart: number | undefined =
      child.rowStart !== undefined ? child.rowStart : child.row
    let colStart: number | undefined =
      child.columnStart !== undefined ? child.columnStart : child.column

    // Spans
    let rowSpan: number =
      child.rowSpan !== undefined
        ? typeof child.rowSpan === "string"
          ? parseInt(child.rowSpan)
          : (child.rowSpan as number)
        : 1
    let colSpan: number =
      child.columnSpan !== undefined
        ? typeof child.columnSpan === "string"
          ? parseInt(child.columnSpan)
          : (child.columnSpan as number)
        : 1

    // End indices (not used for placement, but for span calculation)
    if (child.rowEnd !== undefined) {
      const end =
        typeof child.rowEnd === "string"
          ? parseInt(child.rowEnd)
          : (child.rowEnd as number)
      if (rowStart !== undefined) {
        rowSpan =
          end - (typeof rowStart === "string" ? parseInt(rowStart) : rowStart)
      } else {
        rowStart = end - rowSpan
      }
    }
    if (child.columnEnd !== undefined) {
      const end =
        typeof child.columnEnd === "string"
          ? parseInt(child.columnEnd)
          : (child.columnEnd as number)
      if (colStart !== undefined) {
        colSpan =
          end - (typeof colStart === "string" ? parseInt(colStart) : colStart)
      } else {
        colStart = end - colSpan
      }
    }

    // Parse string indices
    if (typeof rowStart === "string") rowStart = parseInt(rowStart)
    if (typeof colStart === "string") colStart = parseInt(colStart)

    // Negative line indices
    if (typeof rowStart === "number" && rowStart < 0)
      rowStart = resolveNegativeLine(rowStart, rowCount)
    if (typeof colStart === "number" && colStart < 0)
      colStart = resolveNegativeLine(colStart, colCount)

    // Handle partial placement - if only one dimension is specified
    if (rowStart === undefined && colStart !== undefined) {
      // Column specified but not row - place in row 1
      rowStart = 1
    } else if (colStart === undefined && rowStart !== undefined) {
      // Row specified but not column - place in column 1
      colStart = 1
    } else if (rowStart === undefined && colStart === undefined) {
      // Neither specified - use auto-placement
      const idx = nextAutoCell
      rowStart = Math.floor(idx / colCount) + 1
      colStart = (idx % colCount) + 1
    }

    // Compute end indices
    const row = (rowStart as number) - 1
    const column = (colStart as number) - 1

    // Clamp spans to at least 1
    rowSpan = Math.max(1, rowSpan)
    colSpan = Math.max(1, colSpan)

    cells.push({
      key: child.key,
      row,
      column,
      rowSpan,
      columnSpan: colSpan,
      x: 0, // Will be calculated below
      y: 0, // Will be calculated below
      width: 0, // Will be calculated below
      height: 0, // Will be calculated below
    })

    // Advance auto cursor
    nextAutoCell += colSpan
  }

  // --- 5. Ensure size arrays are long enough for implicit tracks ---
  let maxRow = rowSizes.length
  let maxCol = columnSizes.length
  for (const cell of cells) {
    if (cell.row + cell.rowSpan > maxRow) maxRow = cell.row + cell.rowSpan
    if (cell.column + cell.columnSpan > maxCol)
      maxCol = cell.column + cell.columnSpan
  }
  while (rowSizes.length < maxRow) rowSizes.push(0)
  while (columnSizes.length < maxCol) columnSizes.push(0)

  // --- 6. Calculate exact coordinates for each cell ---

  // Helper function to calculate position from track index
  const getPositionFromTracks = (
    trackIndex: number,
    trackSizes: number[],
    gap: number,
  ): number => {
    let position = 0
    for (let i = 0; i < trackIndex; i++) {
      position += trackSizes[i] + (i > 0 ? gap : 0)
    }
    return position
  }

  // Helper function to calculate size from span
  const getSizeFromSpan = (
    trackIndex: number,
    span: number,
    trackSizes: number[],
    gap: number,
  ): number => {
    let size = 0
    for (let i = trackIndex; i < trackIndex + span; i++) {
      size += trackSizes[i] || 0
      if (i > trackIndex) size += gap
    }
    return size
  }

  const itemCoordinates: Record<
    string,
    { x: number; y: number; width: number; height: number }
  > = {}

  // Update cells with coordinates and build itemCoordinates
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i]

    // Calculate x position (sum of column widths + gaps before this column)
    const x = getPositionFromTracks(cell.column, columnSizes, columnGap)

    // Calculate y position (sum of row heights + gaps before this row)
    const y = getPositionFromTracks(cell.row, rowSizes, rowGap)

    // Calculate width (sum of spanned column widths + gaps between them)
    const width = getSizeFromSpan(
      cell.column,
      cell.columnSpan,
      columnSizes,
      columnGap,
    )

    // Calculate height (sum of spanned row heights + gaps between them)
    const height = getSizeFromSpan(cell.row, cell.rowSpan, rowSizes, rowGap)

    // Update the cell object
    cell.x = x
    cell.y = y
    cell.width = width
    cell.height = height

    // Store in itemCoordinates for easy access
    itemCoordinates[cell.key] = { x, y, width, height }
  }

  // --- 7. Return assembled object ---
  return {
    cells,
    rowSizes,
    columnSizes,
    rowGap,
    columnGap,
    itemCoordinates,
  }
}
