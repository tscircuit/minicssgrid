import type { CssGridOptions } from "lib/types"

// Test: Different alignment values
export default {
  children: [
    { key: "start-item", contentWidth: 50, contentHeight: 30 },
    { key: "end-item", contentWidth: 30, contentHeight: 20 },
    { key: "center-item", contentWidth: 40, contentHeight: 12 },
    { key: "stretch-item", contentWidth: 24, contentHeight: 40 },
  ],
  containerWidth: 400,
  containerHeight: 200,
  gridTemplateColumns: "1fr 1fr",
  gridTemplateRows: "1fr 1fr",
  justifyItems: "start",
  alignItems: "end",
} satisfies CssGridOptions
