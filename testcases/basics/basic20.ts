import type { CssGridOptions } from "lib/types"

export default {
  children: [
    { key: "poison-1" },
    { key: "water-1" },
    { key: "poison-2" },
    { key: "water-2" },
    { key: "poison-3" },
    { key: "water-3" },
    { key: "poison-4" },
    { key: "water-4" },
    { key: "poison-5" },
    { key: "water-5" }
  ],
  containerWidth: 100,
  containerHeight: 100,
  gridTemplateColumns: "20% 20% 20% 20% 20%",
  gridTemplateRows: "20% 20% 20% 20% 20%",
} satisfies CssGridOptions