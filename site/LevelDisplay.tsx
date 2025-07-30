import { getSvgFromGraphicsObject } from "graphics-debug"
import { CssGrid } from "lib/index"

export const LevelDisplay = ({ level }: { level: any }) => {
  const grid = new CssGrid(level)

  const resultGraphics = grid.visualize()
  resultGraphics.lines ??= []
  const maxX = grid.opts.containerWidth ?? 100
  const maxY = grid.opts.containerHeight ?? 100
  resultGraphics.lines.push(
    {
      strokeColor: "black",
      points: [
        { x: 0, y: 0 },
        { x: maxX, y: 0 },
      ],
    },
    {
      strokeColor: "black",
      points: [
        { x: maxX, y: 0 },
        { x: maxX, y: maxY },
      ],
    },
    {
      strokeColor: "black",
      points: [
        { x: maxX, y: maxY },
        { x: 0, y: maxY },
      ],
    },
    {
      strokeColor: "black",
      points: [
        { x: 0, y: maxY },
        { x: 0, y: 0 },
      ],
    },
  )
  // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: "50%" }}>
          <h2>Browser Result</h2>
          <div dangerouslySetInnerHTML={{ __html: grid.convertToHtml() }} />
        </div>
        <div>
          <h2>Algorithm Result</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: getSvgFromGraphicsObject(resultGraphics, {
                backgroundColor: "white",
                svgHeight: 200,
                svgWidth: 200,
              }),
            }}
          />
        </div>
      </div>
      <pre>{JSON.stringify(level, null, 2)}</pre>
    </div>
  )
}
