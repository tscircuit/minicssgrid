import type { CssGridOptions } from "lib/types"

// Test: rowEnd and columnEnd positioning
export default {
  children: [
    { key: "big", rowStart: 1, rowEnd: 3, columnStart: 1, columnEnd: 3 },
    { key: "small1", rowStart: 1, columnStart: 3 },
    { key: "small2", rowStart: 2, columnStart: 3 },
    { key: "bottom", rowStart: 3, columnStart: 1, columnEnd: 4 },
  ],
  containerWidth: 300,
  containerHeight: 300,
  gridTemplateColumns: "1fr 1fr 1fr",
  gridTemplateRows: "1fr 1fr 1fr",
} satisfies CssGridOptions
