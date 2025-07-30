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

// Returns number of tracks in a template string
function countTracks(tpl?: string): number {
  if (!tpl) return 0
  return tokenize(expandRepeat(tpl)).length
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
  if (!Number.isNaN(n)) return n
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

  const columnTrackCountDeclared = countTracks(colsTpl)
  const rowTrackCountDeclared = countTracks(rowsTpl)

  // --- 3. Auto-sizing helper functions ---

  // Calculate minimum container size needed for auto-sizing
  function calculateMinimumContainerSize(
    tpl: string | undefined,
    children: typeof opts.children,
    isWidth: boolean,
    gap: number,
  ): number {
    if (!tpl) return 0

    const expanded = expandRepeat(tpl)
    const tokens = tokenize(expanded)
    const trackCount = tokens.length

    // Calculate minimum size needed based on content
    let minContentSize = 0
    let hasFlexibleTracks = false

    // First pass: calculate minimum size from fixed tracks and content
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i]!

      if (token.endsWith("px")) {
        minContentSize += parseFloat(token)
      } else if (token.endsWith("em")) {
        minContentSize += parseFloat(token) * 16
      } else if (token.endsWith("fr") || token === "auto") {
        hasFlexibleTracks = true
        // For fr/auto tracks, use the largest content size in that track
        let maxContentInTrack = 0

        for (const child of children) {
          const childStart = isWidth
            ? child.columnStart || child.column
            : child.rowStart || child.row
          const childSpan = isWidth ? child.columnSpan || 1 : child.rowSpan || 1
          const contentSize = isWidth ? child.contentWidth : child.contentHeight

          // Check if this child occupies this track
          const startIdx =
            (typeof childStart === "number"
              ? childStart
              : parseInt(childStart || "1")) - 1
          const span =
            typeof childSpan === "number"
              ? childSpan
              : parseInt(childSpan.toString())

          if (startIdx <= i && i < startIdx + span) {
            if (contentSize) {
              const size =
                typeof contentSize === "string" && contentSize.endsWith("px")
                  ? parseFloat(contentSize)
                  : typeof contentSize === "number"
                    ? contentSize
                    : 0
              maxContentInTrack = Math.max(maxContentInTrack, size / span) // Distribute across span
            }
          }
        }

        minContentSize += maxContentInTrack
      }
      // For percentage tracks without a container, we'll treat them as content-sized
    }

    // Add gaps
    const totalGaps = gap * (trackCount - 1)
    return minContentSize + totalGaps
  }

  // --- 4. Build numeric track size arrays ---

  function buildTrackSizes(
    tpl: string | undefined,
    containerSize: number | undefined,
    gap: number,
    isWidth = true,
    crossTrackCount = 1, // NEW
  ): number[] {
    if (!tpl) return []

    /* ── Intrinsic track sizing when container size is unknown ───────── */
    if (containerSize == null) {
      const expanded = expandRepeat(tpl)
      const tokens = tokenize(expanded)
      const trackCnt = tokens.length

      // helper – px value from contentWidth / contentHeight (+ 2 px border)
      const toPx = (v: string | number | undefined): number => {
        if (v === undefined) return 0
        if (typeof v === "number") return v
        if (v.endsWith("px")) return parseFloat(v)
        return parseFloat(v)
      }

      // gather the largest content-based size per track
      const sizes = new Array<number>(trackCnt).fill(0)
      let autoCursor = 0 // row-major auto placement

      for (const child of children) {
        const span = isWidth
          ? typeof child.columnSpan === "number"
            ? child.columnSpan
            : child.columnSpan
              ? parseInt(child.columnSpan.toString())
              : 1
          : typeof child.rowSpan === "number"
            ? child.rowSpan
            : child.rowSpan
              ? parseInt(child.rowSpan.toString())
              : 1

        const rawSize = isWidth ? child.contentWidth : child.contentHeight
        const sizePerTrack = toPx(rawSize) / span

        // which track does the item start in?
        let startIdx: number | undefined
        if (isWidth) {
          if (child.columnStart !== undefined || child.column !== undefined) {
            startIdx =
              parseInt((child.columnStart ?? child.column) as string) - 1
          }
        } else {
          if (child.rowStart !== undefined || child.row !== undefined) {
            startIdx = parseInt((child.rowStart ?? child.row) as string) - 1
          }
        }
        // ── determine implicit start track ──
        if (startIdx === undefined || Number.isNaN(startIdx)) {
          if (isWidth) {
            // columns: wrap inside the same row
            startIdx = autoCursor % trackCnt
          } else {
            // rows: CSS grid’s row-major auto-flow – fill columns first
            startIdx = Math.floor(autoCursor / crossTrackCount)
          }
          autoCursor += span
        }

        // distribute over the spanned tracks
        for (let i = 0; i < span && startIdx + i < trackCnt; i++) {
          sizes[startIdx + i] = Math.max(sizes[startIdx + i]!, sizePerTrack)
        }
      }

      // overwrite with any fixed/percentage tokens present
      tokens.forEach((tok, idx) => {
        const px = pxFromToken(tok, undefined)
        if (typeof px === "number") sizes[idx] = px
      })

      return sizes // <- EARLY RETURN
    }

    const expanded = expandRepeat(tpl)
    const tokens = tokenize(expanded)
    const trackCount = tokens.length

    // If no container size, calculate minimum needed for auto-sizing
    let effectiveContainerSize = containerSize
    if (effectiveContainerSize == null) {
      effectiveContainerSize = calculateMinimumContainerSize(
        tpl,
        children,
        isWidth,
        gap,
      )
    }

    const sizeForTracks = effectiveContainerSize - gap * (trackCount - 1)

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
    const free = Math.max(sizeForTracks - sumFixed, 0)
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

  // rows first
  const rowSizes = buildTrackSizes(
    rowsTpl,
    opts.containerHeight,
    rowGap,
    /* isWidth = */ false,
    /* cross-axis = */ columnTrackCountDeclared || 1,
  )

  const columnSizes = buildTrackSizes(
    colsTpl,
    opts.containerWidth,
    columnGap,
    /* isWidth = */ true,
    /* cross-axis = */ rowTrackCountDeclared || 1,
  )

  const rowCount = rowSizes.length
  const colCount = columnSizes.length

  // --- 4. Item placement (auto-placement, cut-down) ---

  const cells: GridCell[] = []
  let nextAutoCell = 0 // row-major index

  for (const child of children) {
    // Placement: row/col start
    let rowStart: number | string | undefined =
      child.rowStart !== undefined ? child.rowStart : child.row
    let colStart: number | string | undefined =
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
      position += trackSizes[i] || 0
      // Add gap after each track we've processed
      position += gap
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
  for (const cell of cells) {
    // Find the corresponding child to get contentWidth/contentHeight and other properties
    const child = children.find((c) => c.key === cell.key)

    // Calculate grid cell boundaries
    const cellX = getPositionFromTracks(cell.column, columnSizes, columnGap)
    const cellY = getPositionFromTracks(cell.row, rowSizes, rowGap)
    const cellWidth = getSizeFromSpan(
      cell.column,
      cell.columnSpan,
      columnSizes,
      columnGap,
    )
    const cellHeight = getSizeFromSpan(cell.row, cell.rowSpan, rowSizes, rowGap)

    // Get content dimensions (support string or number)
    const getContentDimension = (
      value: string | number | undefined,
    ): number => {
      if (value === undefined) return 0
      if (typeof value === "string") {
        if (value.endsWith("px")) return parseFloat(value)
        if (value.endsWith("%")) return 0 // TODO: implement percentage support
        return parseFloat(value)
      }
      return value
    }

    const contentWidth = getContentDimension(child?.contentWidth)
    const contentHeight = getContentDimension(child?.contentHeight)

    // Calculate actual item dimensions and position based on alignment
    let itemWidth = cellWidth
    let itemHeight = cellHeight
    let itemX = cellX
    let itemY = cellY

    // Apply contentWidth/contentHeight if specified
    if (contentWidth > 0) {
      itemWidth = contentWidth
      // Apply horizontal alignment (justifyItems)
      const justifyItems = opts.justifyItems || "stretch"
      switch (justifyItems) {
        case "start":
          itemX = cellX
          break
        case "end":
          itemX = cellX + cellWidth - itemWidth
          break
        case "center":
          itemX = cellX + (cellWidth - itemWidth) / 2
          break
        case "stretch":
          itemWidth = cellWidth
          itemX = cellX
          break
      }
    }

    if (contentHeight > 0) {
      itemHeight = contentHeight
      // Apply vertical alignment (alignItems)
      const alignItems = opts.alignItems || "stretch"
      switch (alignItems) {
        case "start":
          itemY = cellY
          break
        case "end":
          itemY = cellY + cellHeight - itemHeight
          break
        case "center":
          itemY = cellY + (cellHeight - itemHeight) / 2
          break
        case "stretch":
          itemHeight = cellHeight
          itemY = cellY
          break
      }
    }

    // Update the cell object
    cell.x = itemX
    cell.y = itemY
    cell.width = itemWidth
    cell.height = itemHeight

    // Store in itemCoordinates for easy access
    itemCoordinates[cell.key] = {
      x: itemX,
      y: itemY,
      width: itemWidth,
      height: itemHeight,
    }
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
