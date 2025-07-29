import level1 from "testcases/level1"
import { CssGrid } from "lib/CssGrid/CssGrid"

export default () => {
  const grid = new CssGrid(level1)

  // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
  return <div dangerouslySetInnerHTML={{ __html: grid.convertToHtml() }} />
}
