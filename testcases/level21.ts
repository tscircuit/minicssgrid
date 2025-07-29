import type { CssGridOptions } from "lib/types"

export default {
  children: [{ key: "water", column: 1, row: 1 }],
  containerWidth: 100,
  containerHeight: 100,
  gridTemplateColumns: "repeat(8, 12.5%)",
  gridTemplateRows: "20% 20% 20% 20% 20%",
} satisfies CssGridOptions
