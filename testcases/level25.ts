import type { CssGridOptions } from "lib/types"

export default {
  children: [{ key: "water" }, { key: "poison" }, { key: "water-2" }],
  containerWidth: 100,
  containerHeight: 100,
  gridTemplateColumns: "75px 3fr 2fr",
  gridTemplateRows: "100%",
} satisfies CssGridOptions
