import type { CssGridOptions } from "lib/types"

// Test: Multiple items with automatic placement
export default {
  children: [
    { key: "item1" },
    { key: "item2" },
    { key: "item3" },
    { key: "item4" },
  ],
  containerWidth: 200,
  containerHeight: 200,
  gridTemplateColumns: "1fr 1fr",
  gridTemplateRows: "1fr 1fr",
} satisfies CssGridOptions
