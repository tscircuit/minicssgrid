import type { CssGridOptions } from "lib/types"

// Test: Mixed units - percentages, pixels, and fr
export default {
  children: [{ key: "sidebar" }, { key: "main" }, { key: "ads" }],
  containerWidth: 400,
  containerHeight: 300,
  gridTemplateColumns: "25% 1fr 80px",
  gridTemplateRows: "100%",
} satisfies CssGridOptions
