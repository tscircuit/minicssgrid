import type { CssGridOptions } from "lib/types"

export default {
  children: [{ key: "water", column: 1, row: 1 }],
  containerWidth: 100,
  containerHeight: 100,
  gridTemplateColumns: "200px 1fr",
  gridTemplateRows: "60% 1fr",
} satisfies CssGridOptions