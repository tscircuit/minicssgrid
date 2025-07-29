import type { CssGridOptions } from "lib/types"

export default {
  children: [{ key: "water", column: 1, columnSpan: 5, row: 5 }],
  containerWidth: 100,
  containerHeight: 100,
  gridTemplateColumns: "20% 20% 20% 20% 20%",
  gridTemplateRows: "1fr 100px",
} satisfies CssGridOptions