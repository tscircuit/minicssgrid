import type { GraphicsObject } from "graphics-debug"
import type { BrowserResult, BrowserResultItem } from "./types"

const COLORS = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(
  (i) => `hsl(${(i * 360) / 9}deg, 100%, 50%)`,
)

const stringHash = (str: string): number => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
  }
  return hash
}

export const visualizeBrowserResult = (
  browserOutput: BrowserResult,
): GraphicsObject => {
  const go: Required<GraphicsObject> = {
    title: "Browser Result",
    coordinateSystem: "screen",
    points: [],
    lines: [],
    rects: [],
    circles: [],
    texts: [],
  }

  go.points.push(
    { x: 0, y: 0, label: "corner" },
    { x: 100, y: 0, label: "corner" },
    { x: 100, y: 100, label: "corner" },
    { x: 0, y: 100, label: "corner" },
  )

  // Convert each item in browserOutput to a rectangle
  for (const [key, item] of Object.entries(browserOutput)) {
    go.rects.push({
      center: {
        x: item.x + item.width / 2,
        y: item.y + item.height / 2,
      },
      width: item.width,
      height: item.height,
      fill: COLORS[stringHash(key) % COLORS.length],
      label: key,
    })
  }

  return go
}
