import type { CssGridOptions } from "lib/types"

export default {
  children: [{ key: "water" }, { key: "poison" }],
  containerWidth: 100,
  containerHeight: 100,
  gridTemplate: "1fr 50px / 20% 1fr",
} satisfies CssGridOptions
