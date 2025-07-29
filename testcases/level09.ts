import type { CssGridOptions } from "lib/types"

export default {
  children: [{ key: "water", columnSpan: 3, columnEnd: 6 }],
  containerWidth: 100,
  containerHeight: 100,
  gridTemplateColumns: "20% 20% 20% 20% 20%",
  gridTemplateRows: "20% 20% 20% 20% 20%",
} satisfies CssGridOptions