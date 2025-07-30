import type { CssGridOptions } from "lib/types"
import type { CssGrid } from "./CssGrid"
import { getColor } from "lib/colors"

export const CssGrid_convertToHtml = (grid: CssGrid) => {
  // helper to turn a template value into valid CSS text
  const stringifyTemplate = (tpl?: string | string[]) =>
    !tpl ? undefined : typeof tpl === "string" ? tpl : tpl.join(" ")

  /* ───────────── 1. build container style ───────────── */
  const s: string[] = ["display:grid", "background-color:gray"]

  const {
    gridTemplateRows,
    gridTemplateColumns,
    gap,
    justifyItems,
    alignItems,
    containerWidth,
    containerHeight,
  } = grid.opts

  const tRows = stringifyTemplate(gridTemplateRows)
  if (tRows) s.push(`grid-template-rows:${tRows}`)

  const tCols = stringifyTemplate(gridTemplateColumns)
  if (tCols) s.push(`grid-template-columns:${tCols}`)

  if (gap !== undefined) {
    if (typeof gap === "number") {
      s.push(`gap:${gap}px`)
    } else {
      const [rowGap, colGap] = gap
      s.push(`row-gap:${rowGap}px`, `column-gap:${colGap}px`)
    }
  }

  if (justifyItems) s.push(`justify-items:${justifyItems}`)
  if (alignItems) s.push(`align-items:${alignItems}`)
  if (containerWidth != null) s.push(`width:${containerWidth}px`)
  if (containerHeight != null) s.push(`height:${containerHeight}px`)

  const containerStyle = s.join(";")

  /* ───────────── 2. build children markup ───────────── */
  const childDivs = grid.opts.children.map((c) => {
    const cs: string[] = [
      "display:flex",
      "border: 1px solid black",
      "box-sizing: border-box",
      `background-color:${getColor(c.key)}`,
    ]

    /* placement ------------------------------------------------ */
    // 1. Named area still has top priority
    if (c.area) {
      cs.push(`grid-area:${c.area}`)
    } else {
      /* ----- rows ----- */
      // full custom string always wins (e.g. "2 / span 3")
      if (typeof c.row === "string" && c.row.includes("/")) {
        cs.push(`grid-row:${c.row}`)
      } else {
        const start = c.rowStart ?? c.row // alias handling
        const end = c.rowEnd
        const span = c.rowSpan

        if (start !== undefined || end !== undefined) {
          if (start !== undefined && end !== undefined) {
            cs.push(`grid-row:${start} / ${end}`)
          } else if (start !== undefined) {
            span !== undefined
              ? cs.push(`grid-row:${start} / span ${span}`)
              : cs.push(`grid-row-start:${start}`)
          } else {
            // only end
            cs.push(`grid-row-end:${end}`)
          }
        } else if (span !== undefined) {
          // no explicit start/end → just a span
          cs.push(`grid-row:auto / span ${span}`)
        }
      }

      /* ----- columns ----- */
      if (typeof c.column === "string" && c.column.includes("/")) {
        cs.push(`grid-column:${c.column}`)
      } else {
        const start = c.columnStart ?? c.column // alias handling
        const end = c.columnEnd
        const span = c.columnSpan

        if (start !== undefined || end !== undefined) {
          if (start !== undefined && end !== undefined) {
            cs.push(`grid-column:${start} / ${end}`)
          } else if (start !== undefined) {
            span !== undefined
              ? cs.push(`grid-column:${start} / span ${span}`)
              : cs.push(`grid-column-start:${start}`)
          } else {
            cs.push(`grid-column-end:${end}`)
          }
        } else if (span !== undefined) {
          cs.push(`grid-column:auto / span ${span}`)
        }
      }
    }

    const childStyle = cs.join(";")

    // Build inner div style with contentWidth/contentHeight if provided
    const innerStyles: string[] = ["font-size: 7px"]

    if (c.contentWidth !== undefined) {
      const width =
        typeof c.contentWidth === "string"
          ? c.contentWidth
          : `${c.contentWidth}px`
      innerStyles.push(`width:${width}`)
    } else {
      innerStyles.push(`width:${c.key.length * 5}px`)
    }

    if (c.contentHeight !== undefined) {
      const height =
        typeof c.contentHeight === "string"
          ? c.contentHeight
          : `${c.contentHeight}px`
      innerStyles.push(`height:${height}`)
    }

    const innerStyle = innerStyles.join(";")
    return `  <div id="${c.key}" style="${childStyle}"><div style="${innerStyle}">${c.key}</div></div>`
  })

  /* ───────────── 3. final HTML string ───────────── */
  return `<div style="${containerStyle}">\n${childDivs.join("\n")}\n</div>`
}
