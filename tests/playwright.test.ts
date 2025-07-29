import { test, expect } from "@playwright/test"
import { CssGrid } from "lib/CssGrid"
import testcase01 from "testcases/basics/basics01"

test("CssGrid convertToHtml renders correctly with testcase01", async ({ page }) => {
  // Create CssGrid instance with testcase01 configuration
  const grid = new CssGrid(testcase01)
  
  // Generate HTML from the grid
  const htmlContent = grid.convertToHtml()
  
  // Create a complete HTML page with the grid
  const fullHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Grid Test</title>
      <style>
        body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
      </style>
    </head>
    <body>
      ${htmlContent}
    </body>
    </html>
  `
  
  // Set the HTML content in the page
  await page.setContent(fullHtml)
  
  // Verify the grid container exists
  const gridContainer = page.locator('div').first()
  await expect(gridContainer).toHaveCSS('display', 'grid')
  await expect(gridContainer).toHaveCSS('width', '100px')
  await expect(gridContainer).toHaveCSS('height', '100px')
  
  // Verify the grid item exists
  const gridItem = page.locator('div div').first()
  await expect(gridItem).toBeVisible()
  await expect(gridItem).toHaveText('a')
  
  // Take a screenshot for visual verification
  await expect(page).toHaveScreenshot('testcase01-grid.png')
})