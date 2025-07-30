import type { CssGridOptions } from "lib/types"

// Test: Alignment - justifyItems and alignItems
export default {
  children: [
    { key: "center-item", contentWidth: 30, contentHeight: 25 },
    { key: "another-item", contentWidth: 30, contentHeight: 25 },
  ],
  containerWidth: 200,
  containerHeight: 200,
  gridTemplateColumns: "1fr 1fr",
  gridTemplateRows: "1fr 1fr",
  justifyItems: "center",
  alignItems: "center",
} satisfies CssGridOptions
