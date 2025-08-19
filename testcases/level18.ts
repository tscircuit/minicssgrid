import type { CssGridOptions } from "lib/types"

export default {
  children: [{ key: "water", columnStart: 3 }],
  containerWidth: 100,
  containerHeight: 100,
  gridTemplateColumns: "20% 20% 20% 20% 20%",
} satisfies CssGridOptions
