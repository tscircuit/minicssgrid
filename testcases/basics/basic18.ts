import type { CssGridOptions } from "lib/types"

export default {
  children: [
    { key: "water-1", column: 4, row: 1, rowSpan: 5 },
    { key: "water-2", column: 3, columnSpan: 3, row: 2, rowSpan: 3 }
  ],
  containerWidth: 100,
  containerHeight: 100,
  gridTemplateColumns: "20% 20% 20% 20% 20%",
  gridTemplateRows: "20% 20% 20% 20% 20%",
} satisfies CssGridOptions