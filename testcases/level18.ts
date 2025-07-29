import type { CssGridOptions } from "lib/types"

export default {
  children: [
    { key: "water-1", order: 0 },
    { key: "poison", order: 2 },
    { key: "water-2", order: 0 },
    { key: "water-3", order: 0 },
    { key: "water-4", order: 0 },
  ],
  containerWidth: 100,
  containerHeight: 100,
  gridTemplateColumns: "20% 20% 20% 20% 20%",
  gridTemplateRows: "20% 20% 20% 20% 20%",
} satisfies CssGridOptions
