import type { CssGridOptions } from "lib/types"

export default {
  children: [
    { key: "water-1", column: 4, columnEnd: 5, row: 1, rowEnd: 6 },
    { key: "water-2", column: 3, columnEnd: 6, row: 2, rowEnd: 5 },
  ],
  containerWidth: 100,
  containerHeight: 100,
  gridTemplateColumns: "20% 20% 20% 20% 20%",
  gridTemplateRows: "20% 20% 20% 20% 20%",
} satisfies CssGridOptions
