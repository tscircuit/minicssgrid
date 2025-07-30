import type { CssGridOptions } from "lib/types"

// Test: Auto-sizing without container dimensions
export default {
  children: [
    { key: "item1", contentWidth: 50, contentHeight: 30 },
    { key: "item2", contentWidth: 80, contentHeight: 40 },
    { key: "item3", contentWidth: 60, contentHeight: 25 },
  ],
  // No containerWidth or containerHeight specified
  gridTemplateColumns: "1fr auto 100px",
  gridTemplateRows: "auto 1fr",
  gap: 10,
} satisfies CssGridOptions
