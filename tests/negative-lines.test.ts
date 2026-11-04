import { expect, test } from "bun:test"
import { CssGrid } from "lib/index"
import type { CssGridOptions } from "lib/types"

type Placement = Omit<CssGridOptions["children"][number], "key">

const cases: {
  name: string
  placement: Placement
  expected: { x: number; y: number; width: number; height: number }
  spans: { rowSpan: number; columnSpan: number }
}[] = [
  {
    name: "positive starts and negative ends span the explicit grid",
    placement: { columnStart: 1, columnEnd: -1, rowStart: 1, rowEnd: -1 },
    expected: { x: 0, y: 0, width: 430, height: 110 },
    spans: { rowSpan: 2, columnSpan: 4 },
  },
  {
    name: "negative starts and positive ends",
    placement: { columnStart: -3, columnEnd: 5, rowStart: -2, rowEnd: 3 },
    expected: { x: 220, y: 50, width: 210, height: 60 },
    spans: { rowSpan: 1, columnSpan: 2 },
  },
  {
    name: "both endpoints are negative",
    placement: { columnStart: -4, columnEnd: -1, rowStart: -3, rowEnd: -1 },
    expected: { x: 110, y: 0, width: 320, height: 110 },
    spans: { rowSpan: 2, columnSpan: 3 },
  },
  {
    name: "positive endpoints retain their spans",
    placement: { columnStart: 2, columnEnd: 5, rowStart: 1, rowEnd: 3 },
    expected: { x: 110, y: 0, width: 320, height: 110 },
    spans: { rowSpan: 2, columnSpan: 3 },
  },
  {
    name: "negative starts without ends retain their spans",
    placement: { columnStart: -3, columnSpan: 2, rowStart: -3, rowSpan: 2 },
    expected: { x: 220, y: 0, width: 210, height: 110 },
    spans: { rowSpan: 2, columnSpan: 2 },
  },
  {
    name: "negative ends without starts use the default span",
    placement: { columnEnd: -1, rowEnd: -1 },
    expected: { x: 330, y: 50, width: 100, height: 60 },
    spans: { rowSpan: 1, columnSpan: 1 },
  },
  {
    name: "negative ends without starts retain their explicit spans",
    placement: { columnEnd: -1, columnSpan: 2, rowEnd: -1, rowSpan: 2 },
    expected: { x: 220, y: 0, width: 210, height: 110 },
    spans: { rowSpan: 2, columnSpan: 2 },
  },
  {
    name: "positive ends without starts retain their explicit spans",
    placement: { columnEnd: 5, columnSpan: 2, rowEnd: 3, rowSpan: 2 },
    expected: { x: 220, y: 0, width: 210, height: 110 },
    spans: { rowSpan: 2, columnSpan: 2 },
  },
  {
    name: "row and column aliases resolve before positive ends",
    placement: { column: -3, columnEnd: 5, row: -3, rowEnd: 3 },
    expected: { x: 220, y: 0, width: 210, height: 110 },
    spans: { rowSpan: 2, columnSpan: 2 },
  },
]

function gridOptions(placement: Placement): CssGridOptions {
  return {
    gridTemplateColumns: "100px 100px 100px 100px",
    gridTemplateRows: "40px 60px",
    gap: [10, 10],
    containerWidth: 430,
    containerHeight: 110,
    children: [{ key: "target", ...placement }],
  }
}

for (const { name, placement, expected, spans } of cases) {
  for (const strings of [false, true]) {
    test(`${name} (${strings ? "strings" : "numbers"})`, () => {
      const input = strings
        ? Object.fromEntries(
            Object.entries(placement).map(([key, value]) => [
              key,
              String(value),
            ]),
          )
        : placement
      const opts = gridOptions(input)
      const original = structuredClone(opts)
      const grid = new CssGrid(opts)
      const layout = grid.layout()

      // CSS Grid counts negative lines back from the explicit grid's end.
      expect(layout.itemCoordinates.target).toEqual(expected)
      expect(layout.cells[0]).toMatchObject(spans)
      expect(layout.columnSizes).toEqual([100, 100, 100, 100])
      expect(layout.rowSizes).toEqual([40, 60])
      expect(grid.layout()).toEqual(layout)
      expect(opts).toEqual(original)
    })
  }
}

test("implicit tracks do not change negative explicit-grid endpoints", () => {
  const opts = gridOptions({
    columnStart: 1,
    columnEnd: -1,
    rowStart: 1,
    rowEnd: -1,
  })
  opts.children.unshift({ key: "implicit", columnStart: 6, rowStart: 4 })
  const layout = new CssGrid(opts).layout()

  expect(layout.columnSizes).toHaveLength(6)
  expect(layout.rowSizes).toHaveLength(4)
  expect(layout.itemCoordinates.target).toEqual({
    x: 0,
    y: 0,
    width: 430,
    height: 110,
  })
  expect(layout.cells[1]).toMatchObject({ rowSpan: 2, columnSpan: 4 })
})
