# minigrid

A tiny CSS grid implementation in TypeScript that provides programmatic CSS Grid layout computation.

[Online Playground](https://minigrid.tscircuit.com)

<img width="250" height="250" alt="image" src="https://github.com/user-attachments/assets/c0cd5c34-a62c-40e4-b132-fc2f81b6fc49" />

## Installation

```bash
bun add @tscircuit/minigrid
# or
npm install @tscircuit/minigrid
```

## Quick Start

```typescript
import { CssGrid } from "@tscircuit/minigrid"

// Create a simple 2x2 grid
const grid = new CssGrid({
  containerWidth: 200,
  containerHeight: 200,
  gridTemplateColumns: "1fr 1fr",
  gridTemplateRows: "1fr 1fr",
  children: [
    { key: "item1" },
    { key: "item2" },
    { key: "item3" },
    { key: "item4" },
  ],
})

// Get computed layout
const { cells, itemCoordinates } = grid.layout()
console.log(itemCoordinates)
// Output: {
//   item1: { x: 0, y: 0, width: 100, height: 100 },
//   item2: { x: 100, y: 0, width: 100, height: 100 },
//   item3: { x: 0, y: 100, width: 100, height: 100 },
//   item4: { x: 100, y: 100, width: 100, height: 100 }
// }
```

## API Reference

### CssGrid Class

The main class for creating and computing CSS Grid layouts.

```typescript
const grid = new CssGrid(options: CssGridOptions)
```

#### Methods

- **`layout()`** - Returns computed layout with cell positions and coordinates
- **`convertToHtml()`** - Generates HTML representation of the grid
- **`visualize()`** - Returns graphics object for debugging visualization

### CssGridOptions Interface

Configuration object for the grid container and its items.

```typescript
interface CssGridOptions {
  children: GridItem[] // Grid items to layout
  gridTemplateRows?: GridTemplate // Row track definitions
  gridTemplateColumns?: GridTemplate // Column track definitions
  gap?: number | [number, number] // Gap between grid items
  justifyItems?: "start" | "end" | "center" | "stretch"
  alignItems?: "start" | "end" | "center" | "stretch"
  containerWidth?: number // Container dimensions
  containerHeight?: number
}
```

### GridItem Interface

Individual grid item configuration.

```typescript
interface GridItem {
  key: string // Unique identifier

  // Positioning (1-based like CSS Grid)
  row?: number | string
  column?: number | string
  rowSpan?: number | string
  columnSpan?: number | string
  rowStart?: number | string
  columnStart?: number | string
  rowEnd?: number | string
  columnEnd?: number | string

  // Content sizing
  contentWidth?: number | string
  contentHeight?: number | string

  // Other properties
  area?: string // Named grid area
  order?: number | string // Display order
  payload?: unknown // Custom data
}
```

## Grid Templates

Grid templates can be defined as strings (CSS-like) or structured arrays:

### String Format

```typescript
gridTemplateColumns: "100px 1fr 2fr"
gridTemplateRows: "repeat(3, 1fr)"
gridTemplateColumns: "20% 20% 20% 20% 20%"
```

### Array Format

```typescript
gridTemplateColumns: ["100px", "1fr", "2fr"]
gridTemplateRows: ["repeat(3, 1fr)"]
```

### Supported Track Sizes

- **Fixed**: `"100px"`, `"50%"`
- **Flexible**: `"1fr"`, `"2fr"`
- **Keywords**: `"auto"`, `"min-content"`, `"max-content"`
- **Functions**: `"minmax(100px, 1fr)"`, `"repeat(3, 1fr)"`

## Usage Examples

### Basic Grid Layout

```typescript
const grid = new CssGrid({
  containerWidth: 300,
  containerHeight: 200,
  gridTemplateColumns: "1fr 1fr 1fr",
  gridTemplateRows: "1fr 1fr",
  children: [
    { key: "header" },
    { key: "nav" },
    { key: "main" },
    { key: "aside" },
    { key: "footer" },
  ],
})
```

### Explicit Item Placement

```typescript
const grid = new CssGrid({
  containerWidth: 400,
  containerHeight: 300,
  gridTemplateColumns: "repeat(4, 1fr)",
  gridTemplateRows: "repeat(3, 1fr)",
  children: [
    { key: "header", columnStart: 1, columnEnd: 5, row: 1 },
    { key: "sidebar", column: 1, rowStart: 2, rowEnd: 4 },
    { key: "content", columnStart: 2, columnEnd: 5, rowStart: 2, rowEnd: 4 },
  ],
})
```

### Grid with Spanning Items

```typescript
const grid = new CssGrid({
  containerWidth: 300,
  containerHeight: 300,
  gridTemplateColumns: "1fr 2fr",
  gridTemplateRows: "50px 1fr 50px",
  children: [
    { key: "header", columnSpan: 2 }, // Spans 2 columns
    { key: "sidebar" }, // Auto-placed
    { key: "content" }, // Auto-placed
    { key: "footer", columnSpan: 2 }, // Spans 2 columns
  ],
})
```

### Grid with Gaps

```typescript
const grid = new CssGrid({
  containerWidth: 240,
  containerHeight: 240,
  gridTemplateColumns: "1fr 1fr",
  gridTemplateRows: "1fr 1fr",
  gap: 20, // 20px gap between items
  children: [
    { key: "box1" },
    { key: "box2" },
    { key: "box3" },
    { key: "box4" },
  ],
})
```

### Different Gap Values

```typescript
const grid = new CssGrid({
  gridTemplateColumns: "1fr 1fr 1fr",
  gridTemplateRows: "1fr 1fr",
  gap: [10, 20], // [rowGap, columnGap]
  children: [
    /* ... */
  ],
})
```

### Item Ordering

```typescript
const grid = new CssGrid({
  containerWidth: 400,
  containerHeight: 100,
  gridTemplateColumns: "1fr 1fr 1fr 1fr",
  gridTemplateRows: "1fr",
  children: [
    { key: "first", order: 3 }, // Appears third
    { key: "second", order: 1 }, // Appears first
    { key: "third", order: 2 }, // Appears second
    { key: "fourth" }, // Default order (0), appears last
  ],
})
```

### Content Sizing

```typescript
const grid = new CssGrid({
  gridTemplateColumns: "auto 1fr auto",
  children: [
    { key: "icon", contentWidth: 24, contentHeight: 24 },
    { key: "text", contentWidth: 200 },
    { key: "button", contentWidth: 80, contentHeight: 32 },
  ],
})
```

### Alignment

```typescript
const grid = new CssGrid({
  gridTemplateColumns: "1fr 1fr",
  gridTemplateRows: "1fr 1fr",
  justifyItems: "center", // Horizontal alignment
  alignItems: "start", // Vertical alignment
  children: [
    /* ... */
  ],
})
```

## Working with Layout Results

The `layout()` method returns detailed information about the computed grid:

```typescript
const { cells, rowSizes, columnSizes, rowGap, columnGap, itemCoordinates } =
  grid.layout()

// Individual cell information
cells.forEach((cell) => {
  console.log(`${cell.key}: row ${cell.row}, col ${cell.column}`)
  console.log(`Position: (${cell.x}, ${cell.y})`)
  console.log(`Size: ${cell.width} × ${cell.height}`)
  console.log(`Spans: ${cell.rowSpan} rows, ${cell.columnSpan} columns`)
})

// Quick access to item coordinates
const headerCoords = itemCoordinates.header
// { x: 0, y: 0, width: 300, height: 50 }

// Track information
console.log("Column widths:", columnSizes) // [100, 200, 100]
console.log("Row heights:", rowSizes) // [50, 200, 50]
```

## HTML Generation

Generate HTML representation of your grid:

```typescript
const htmlString = grid.convertToHtml()
console.log(htmlString)
```

This creates a `<div>` with CSS Grid styles and child elements positioned accordingly.

## Development & Testing

### Running Tests

```bash
bun test                    # Run all tests
bun test level01           # Run specific test
```

### Adding Test Cases

## Introducing Test Cases

1. Create a test case in `testcases/levelXX.ts`
2. Generate the browser result by running `bun run generate-browser-results`
3. Create a test in `tests/levelXX.test.ts` with the following structure:
4. Run `bun test tests/levelXX.test.ts -u` to see the test results and update the snapshots

```tsx
import { expect, test } from "bun:test"
import levelXX from "testcases/levelXX"
import browserResult from "testcases/levelXX.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("levelXX", () => {
  const { laidOutResult, outputViz, layout } = testGrid(levelXX, browserResult)

  expect(browserResult).toMatchInlineSnapshot()
  expect(laidOutResult).toMatchInlineSnapshot()

  expect(layout).toMatchInlineSnapshot()
  expect(outputViz).toMatchSvgSnapshot(import.meta.path)

  if (!process.env.BUN_UPDATE_SNAPSHOTS) {
    expect(laidOutResult).toEqual(browserResult)
  }
})
```
