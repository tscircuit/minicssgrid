import type { CssGridOptions } from "lib/types"

export default {
  children: [{ key: "water", column: 1, row: 1 }],
  containerWidth: 100,
  containerHeight: 100,
  gridTemplate: "60% 1fr / 200px 1fr",
} satisfies CssGridOptions