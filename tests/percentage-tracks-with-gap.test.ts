import { expect, test } from "bun:test"
import { CssGrid } from "../lib"

// Percentages use the inner container size, before subtracting track gaps.
// https://www.w3.org/TR/css-grid-1/#track-sizes
const cases = [
  {
    name: "percentage columns with gaps",
    axis: "columns",
    template: "50% 50%",
    size: 240,
    gap: 20,
    sizes: [120, 120],
    offset: 140,
  },
  {
    name: "percentage rows with gaps",
    axis: "rows",
    template: "50% 50%",
    size: 200,
    gap: 20,
    sizes: [100, 100],
    offset: 120,
  },
  {
    name: "mixed percentage and fractional columns",
    axis: "columns",
    template: "25% 1fr",
    size: 240,
    gap: 20,
    sizes: [60, 160],
    offset: 80,
  },
  {
    name: "mixed percentage and fractional rows",
    axis: "rows",
    template: "25% 1fr",
    size: 200,
    gap: 20,
    sizes: [50, 130],
    offset: 70,
  },
  {
    name: "percentages without gaps",
    axis: "columns",
    template: "50% 50%",
    size: 240,
    gap: 0,
    sizes: [120, 120],
    offset: 120,
  },
  {
    name: "fixed and fractional tracks still subtract gaps",
    axis: "columns",
    template: "50px 1fr",
    size: 240,
    gap: 20,
    sizes: [50, 170],
    offset: 70,
  },
  {
    name: "fractional tracks still subtract gaps",
    axis: "columns",
    template: "1fr 1fr",
    size: 240,
    gap: 20,
    sizes: [110, 110],
    offset: 130,
  },
] as const

for (const { name, axis, template, size, gap, sizes, offset } of cases) {
  test(name, () => {
    const columns = axis === "columns"
    const layout = new CssGrid({
      containerWidth: columns ? size : 100,
      containerHeight: columns ? 100 : size,
      gridTemplateColumns: columns ? template : "100px",
      gridTemplateRows: columns ? "100px" : template,
      gap: columns ? [0, gap] : [gap, 0],
      children: [{ key: "a" }, { key: "b" }],
    }).layout()

    expect(columns ? layout.columnSizes : layout.rowSizes).toEqual(sizes)
    expect(layout.itemCoordinates.b).toEqual(
      columns
        ? { x: offset, y: 0, width: sizes[1], height: 100 }
        : { x: 0, y: offset, width: 100, height: sizes[1] },
    )
  })
}
