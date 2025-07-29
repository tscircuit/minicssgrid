import type { CssGridOptions } from "lib/types"

// Test: Fixed pixel sizes
export default {
  children: [
    { key: "header" },
    { key: "sidebar" },
    { key: "content" },
    { key: "footer" }
  ],
  containerWidth: 300,
  containerHeight: 200,
  gridTemplateColumns: "100px 1fr",
  gridTemplateRows: "50px 1fr 30px",
} satisfies CssGridOptions