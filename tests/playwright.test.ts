import { test, expect } from "@playwright/test"
import { CssGrid } from "lib/CssGrid"
import basics01 from "testcases/basics/basics01"

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

    // TODO get the positions of all the named elements and save to "testcases/${testcasePath}.browser-result.json"
  }
})
