import type { CssGridOptions } from "lib/types"

// Test: Complex layout with overlapping items
export default {
  children: [
    { key: "background", rowStart: 1, rowEnd: 4, columnStart: 1, columnEnd: 4 },
    { key: "overlay1", rowStart: 1, columnStart: 1, rowSpan: 2, columnSpan: 2 },
    { key: "overlay2", rowStart: 2, columnStart: 2, rowSpan: 2, columnSpan: 2 },
    { key: "corner", rowStart: 3, columnStart: 3 }
  ],
  containerWidth: 300,
  containerHeight: 300,
  gridTemplateColumns: "1fr 1fr 1fr",
  gridTemplateRows: "1fr 1fr 1fr",
} satisfies CssGridOptions