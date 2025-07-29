import level1 from "testcases/level1"
import { CssGrid } from "lib/CssGrid/CssGrid"

export default () => {
  const grid = new CssGrid(level1)

  // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div dangerouslySetInnerHTML={{ __html: grid.convertToHtml() }} />
    </div>
  )
}
