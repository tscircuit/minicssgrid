import type { CssGridOptions } from "lib/types"

export default {
  children: [{ key: "water" }],
  containerWidth: 100,
  containerHeight: 100,
  gridTemplateRows: "repeat(2, 10%)",
} satisfies CssGridOptions
