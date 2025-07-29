import type { CssGridOptions } from "lib/types"

// Test: Different row and column gaps
export default {
  children: [
    { key: "a" },
    { key: "b" },
    { key: "c" },
    { key: "d" },
    { key: "e" },
    { key: "f" }
  ],
  containerWidth: 300,
  containerHeight: 200,
  gridTemplateColumns: "1fr 1fr 1fr",
  gridTemplateRows: "1fr 1fr",
  gap: [10, 30], // [rowGap, columnGap]
} satisfies CssGridOptions