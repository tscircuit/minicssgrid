import { CssGrid } from "lib/index"

export const LevelDisplay = ({ level }: { level: any }) => {
  const grid = new CssGrid(level)
  // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <pre>{JSON.stringify(level, null, 2)}</pre>
      <div dangerouslySetInnerHTML={{ __html: grid.convertToHtml() }} />
    </div>
  )
}
