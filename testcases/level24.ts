import type { CssGridOptions } from "lib/types"

export default {
  children: [
    { key: "water" },
    { key: "poison" },
    { key: "water-2" }
  ],
  containerWidth: 100,
  containerHeight: 100,
  gridTemplateColumns: "100px 3em 40%",
  gridTemplateRows: "20% 20% 20% 20% 20%",
} satisfies CssGridOptions