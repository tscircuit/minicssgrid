import type { CssGridOptions } from "lib/types"

export default {
  children: [
    { key: "water", column: 1, columnEnd: 2, row: 1, rowEnd: 6 },
    { key: "poison", column: 5, columnEnd: 6, row: 1, rowEnd: 6 }
  ],
  containerWidth: 100,
  containerHeight: 100,
  gridTemplateColumns: "50px 1fr 1fr 1fr 50px",
  gridTemplateRows: "20% 20% 20% 20% 20%",
} satisfies CssGridOptions