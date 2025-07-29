import type { CssGridOptions } from "lib/types"

// Test: Grid gap
export default {
  children: [
    { key: "box1" },
    { key: "box2" },
    { key: "box3" },
    { key: "box4" }
  ],
  containerWidth: 240,
  containerHeight: 240,
  gridTemplateColumns: "1fr 1fr",
  gridTemplateRows: "1fr 1fr",
  gap: 20,
} satisfies CssGridOptions