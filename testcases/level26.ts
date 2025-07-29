import type { CssGridOptions } from "lib/types"

export default {
  children: [{ key: "water", column: 1, columnEnd: 6, row: 5, rowEnd: 6 }],
  containerWidth: 100,
  containerHeight: 100,
  gridTemplateColumns: "20% 20% 20% 20% 20%",
  gridTemplateRows: "1fr 100px",
} satisfies CssGridOptions