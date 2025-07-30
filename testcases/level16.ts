import type { CssGridOptions } from "lib/types"

// Test: Column and row spanning
export default {
  children: [
    { key: "header", columnSpan: 2 },
    { key: "sidebar" },
    { key: "content", rowSpan: 2 },
    { key: "footer", columnSpan: 2 },
  ],
  containerWidth: 300,
  containerHeight: 300,
  gridTemplateColumns: "1fr 2fr",
  gridTemplateRows: "50px 1fr 50px",
} satisfies CssGridOptions
