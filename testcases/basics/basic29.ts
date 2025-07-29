import type { CssGridOptions } from "lib/types"

export default {
  children: [
    { key: "poison" },
    { key: "water" }
  ],
  containerWidth: 100,
  containerHeight: 100,
  gridTemplateColumns: "20% 1fr",
  gridTemplateRows: "1fr 50px",
} satisfies CssGridOptions