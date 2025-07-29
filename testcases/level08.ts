import type { CssGridOptions } from "lib/types"

// Test: Explicit row and column positioning
export default {
  children: [
    { key: "a", row: 1, column: 1 },
    { key: "b", row: 2, column: 3 },
    { key: "c", row: 3, column: 2 },
    { key: "d", row: 1, column: 3 }
  ],
  containerWidth: 300,
  containerHeight: 300,
  gridTemplateColumns: "1fr 1fr 1fr",
  gridTemplateRows: "1fr 1fr 1fr",
} satisfies CssGridOptions