import type { CssGridOptions } from "lib/types"

export default {
  children: [
    { key: "water-1", order: -1 },
    { key: "poison-1", order: 0 },
    { key: "water-2", order: -1 },
    { key: "poison-2", order: 0 },
    { key: "water-3", order: -1 },
    { key: "poison-3", order: 0 },
    { key: "water-4", order: -1 },
    { key: "poison-4", order: 0 },
    { key: "water-5", order: -1 },
    { key: "poison-5", order: 0 }
  ],
  containerWidth: 100,
  containerHeight: 100,
  gridTemplateColumns: "20% 20% 20% 20% 20%",
  gridTemplateRows: "20% 20% 20% 20% 20%",
} satisfies CssGridOptions