import type { GraphicsObject } from "graphics-debug"
import type { BrowserResult } from "./types"
import { getColor } from "./colors"

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

  go.lines.push(
    {
      strokeColor: "black",
      points: [
        { x: 0, y: 0 },
        { x: 100, y: 0 },
      ],
    },
    {
      strokeColor: "black",
      points: [
        { x: 100, y: 0 },
        { x: 100, y: 100 },
      ],
    },
    {
      strokeColor: "black",
      points: [
        { x: 100, y: 100 },
        { x: 0, y: 100 },
      ],
    },
    {
      strokeColor: "black",
      points: [
        { x: 0, y: 100 },
        { x: 0, y: 0 },
      ],
    },
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
      fill: getColor(key),
      label: key,
    })
  }

  return go
}
