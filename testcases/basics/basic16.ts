import type { CssGridOptions } from "lib/types"

export default {
  children: [{ key: "water", column: 2, columnSpan: 4, row: 1, rowSpan: 5 }],
  containerWidth: 100,
  containerHeight: 100,
  gridTemplateColumns: "20% 20% 20% 20% 20%",
  gridTemplateRows: "20% 20% 20% 20% 20%",
} satisfies CssGridOptions