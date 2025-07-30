import type { CssGridOptions } from "lib/types"

// Test: Different alignment values
export default {
  children: [
    { key: "start-item" },
    { key: "end-item" },
    { key: "center-item" },
    { key: "stretch-item" },
  ],
  containerWidth: 400,
  containerHeight: 200,
  gridTemplateColumns: "1fr 1fr",
  gridTemplateRows: "1fr 1fr",
  justifyItems: "start",
  alignItems: "end",
} satisfies CssGridOptions
