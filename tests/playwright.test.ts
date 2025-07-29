import { test, expect } from "@playwright/test"
import { CssGrid } from "lib/CssGrid"
import basics01 from "testcases/basics/basics01"
import * as fs from "fs"
import * as path from "path"

const TEST_CASES = {
  "basics/basics01": basics01,
}

test("CssGrid convertToHtml renders correctly with testcase01", async ({
  page,
}) => {
  for (const [testcasePath, testcaseConfig] of Object.entries(TEST_CASES)) {
    // Create CssGrid instance with testcase01 configuration
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
          body { margin: 0; padding: 0px; font-family: Arial, sans-serif; }
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
    const elementsData: Record<string, { x: number; y: number; width: number; height: number }> = {}
    
    // Find all div elements inside the grid container
    const childDivs = await page.locator("div > div").all()
    
    for (const div of childDivs) {
      const text = await div.textContent()
      if (text?.trim()) {
        const boundingBox = await div.boundingBox()
        if (boundingBox) {
          elementsData[text.trim()] = {
            x: boundingBox.x,
            y: boundingBox.y,
            width: boundingBox.width,
            height: boundingBox.height
          }
        }
      }
    }
    
    // Save to file
    const outputPath = path.join("testcases", `${testcasePath}.browser-result.json`)
    const outputDir = path.dirname(outputPath)
    
    // Ensure directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }
    
    fs.writeFileSync(outputPath, JSON.stringify(elementsData, null, 2))
  }
})
