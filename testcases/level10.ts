import type { CssGridOptions } from "lib/types"

// Test: Order property
export default {
  children: [
    { key: "first", order: 3 },
    { key: "second", order: 1 },
    { key: "third", order: 2 },
    { key: "fourth" }, // no order, should be 0
  ],
  containerWidth: 400,
  containerHeight: 100,
  gridTemplateColumns: "1fr 1fr 1fr 1fr",
  gridTemplateRows: "1fr",
} satisfies CssGridOptions
