import type { CssGridOptions } from "lib/types"

// Test: Auto-sizing with auto keyword
export default {
  children: [
    { key: "auto-width" },
    { key: "fixed-width" },
    { key: "flexible" }
  ],
  containerWidth: 300,
  containerHeight: 100,
  gridTemplateColumns: "auto 100px 1fr",
  gridTemplateRows: "auto",
} satisfies CssGridOptions