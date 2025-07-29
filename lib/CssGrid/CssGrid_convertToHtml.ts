import type { CssGridOptions } from "lib/types"
import type { CssGrid } from "./CssGrid"

export const CssGrid_convertToHtml = (grid: CssGrid) => {
  // helper to turn a template value into valid CSS text
  const stringifyTemplate = (tpl?: string | string[]) =>
    !tpl ? undefined : typeof tpl === "string" ? tpl : tpl.join(" ")

  /* ───────────── 1. build container style ───────────── */
  const s: string[] = ["display:grid"]

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
    const cs: string[] = []

    if (c.area) {
      cs.push(`grid-area:${c.area}`)
    } else {
      if (c.row !== undefined || c.rowSpan !== undefined) {
        const start = c.row ?? "auto"
        const span = c.rowSpan ? ` / span ${c.rowSpan}` : ""
        cs.push(`grid-row:${start}${span}`)
      }
      if (c.column !== undefined || c.columnSpan !== undefined) {
        const start = c.column ?? "auto"
        const span = c.columnSpan ? ` / span ${c.columnSpan}` : ""
        cs.push(`grid-column:${start}${span}`)
      }
    }

    const childStyle = cs.join(";")
    // innerText is just the key for demo purposes
    return `  <div style="${childStyle}">${c.key}</div>`
  })

  /* ───────────── 3. final HTML string ───────────── */
  return `<div style="${containerStyle}">\n${childDivs.join("\n")}\n</div>`
}
