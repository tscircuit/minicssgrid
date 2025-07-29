import type { GraphicsObject } from "graphics-debug"
import type { BrowserResult } from "./types"

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

  return go
}
