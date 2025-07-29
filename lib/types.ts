/* ────────────────────────────────────────────────────────
   Primitive value helpers
   ──────────────────────────────────────────────────────── */
type Fr = `${number}fr` // e.g. "1fr"
type Px = `${number}px` // e.g. "120px"
type Percent = `${number}%` // e.g. "50%"
type Keyword = "auto" | "min-content" | "max-content"
type TrackSize = Fr | Px | Percent | Keyword

/** A single track definition (string) or a repeat/minmax helper */
type Track =
  | TrackSize
  | `minmax(${TrackSize}, ${TrackSize})`
  | `repeat(${number}, ${TrackSize})`

/** A full template as string (CSS‑like) or structured array  */
type GridTemplate = string | Track[]

/* ────────────────────────────────────────────────────────
      Grid‑item description
      ──────────────────────────────────────────────────────── */
interface GridItem {
  /** Stable identifier – never a DOM node */
  key: string

  /* Explicit placement (1‑based like CSS Grid) */
  row?: number | string
  column?: number | string
  rowStart?: number | string
  columnStart?: number | string
  rowEnd?: number | string
  columnEnd?: number | string

  /** Named area (alternative to numeric placement) */
  area?: string

  order?: number | string

  /** Any extra data your engine wants to carry along */
  payload?: unknown
}

/* ────────────────────────────────────────────────────────
      Top‑level configuration object
      ──────────────────────────────────────────────────────── */
export interface CssGridOptions {
  /** All grid items (order irrelevant unless you want it) */
  children: GridItem[]

  /* Track templates */
  gridTemplateRows?: GridTemplate // e.g. "repeat(2, 1fr)" or ['1fr','2fr']
  gridTemplateColumns?: GridTemplate

  /* Gaps in *css‑logical* order: [rowGap, columnGap] */
  gap?: number | [number, number]

  /* Alignment – mirror CSS keywords, but feel free to extend */
  justifyItems?: "start" | "end" | "center" | "stretch"
  alignItems?: "start" | "end" | "center" | "stretch"

  containerWidth?: number
  containerHeight?: number
}

export type BrowserResult = any
