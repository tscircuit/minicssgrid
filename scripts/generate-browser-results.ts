import * as fs from "node:fs"
import * as path from "node:path"
import { chromium, devices } from "playwright"
import { CssGrid } from "lib/CssGrid/CssGrid"
import type { CssGridOptions } from "lib/types"

async function loadTestCases(): Promise<Record<string, CssGridOptions>> {
  const testCases: Record<string, CssGridOptions> = {}
  const testcasesDir = path.join(process.cwd(), "testcases")

  const files = fs.readdirSync(testcasesDir)
  const tsFiles = files.filter(
    (file) => file.endsWith(".ts") && !file.includes("browser-result"),
  )

  for (const file of tsFiles) {
    const testcaseName = path.basename(file, ".ts")
    try {
      const testcaseModule = await import(`../testcases/${testcaseName}`)
      testCases[testcaseName] = testcaseModule.default
    } catch (error) {
      console.warn(`Failed to load testcase ${testcaseName}:`, error)
    }
  }

  return testCases
}

async function generateBrowserResults() {
  const testCases = await loadTestCases()
  console.log(`Found ${Object.keys(testCases).length} test cases`)

  const browser = await chromium.launch()
  const context = await browser.newContext({
    ...devices["Desktop Chrome"],
    viewport: { width: 120, height: 120 },
  })
  const page = await context.newPage()

  for (const [testcasePath, testcaseConfig] of Object.entries(testCases)) {
    // Create CssGrid instance with testcase configuration
    const grid = new CssGrid(testcaseConfig)

    // Generate HTML from the grid
    const htmlContent = grid.convertToHtml()

    // Create a complete HTML page with the grid
    const fullHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Grid Test</title>
        <style>
          body { margin: 0; padding: 0px; font-family: Arial, sans-serif; width: 100%; height: 100%; }
        </style>
      </head>
      <body>
        ${htmlContent}
      </body>
      </html>
    `

    // Set the HTML content in the page
    await page.setContent(fullHtml)

    // Extract positions of all named elements
    const elementBounds: Record<
      string,
      { x: number; y: number; width: number; height: number }
    > = {}

    // Find all div elements with an id attribute
    const childDivs = await page.locator("div[id]").all()

    for (const div of childDivs) {
      const id = await div.getAttribute("id")
      if (id?.trim()) {
        const boundingBox = await div.boundingBox()
        if (boundingBox) {
          elementBounds[id.trim()] = {
            x: boundingBox.x,
            y: boundingBox.y,
            width: boundingBox.width,
            height: boundingBox.height,
          }
        }
      }
    }

    // Save to file
    const outputPath = path.join(
      "testcases",
      `${testcasePath}.browser-result.json`,
    )
    const outputDir = path.dirname(outputPath)

    // Ensure directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    fs.writeFileSync(outputPath, JSON.stringify(elementBounds, null, 2))
    console.log(`Generated browser results for ${testcasePath}`)
  }

  await browser.close()
}

generateBrowserResults().catch(console.error)
