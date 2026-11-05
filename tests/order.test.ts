import { expect, test } from "bun:test"
import { CssGrid } from "lib/CssGrid/CssGrid"
import type { CssGridOptions } from "lib/types"
import level10 from "testcases/level10"

const fixedGrid = (children: CssGridOptions["children"]) =>
  new CssGrid({
    containerWidth: 400,
    containerHeight: 100,
    gridTemplateColumns: "repeat(4, 1fr)",
    gridTemplateRows: "1fr",
    children,
  })

test("order sorts the documented example with omitted order before positives", () => {
  const layout = new CssGrid(level10).layout()
  expect(layout.cells.map(({ key }) => key)).toEqual([
    "fourth",
    "second",
    "third",
    "first",
  ])
  expect(layout.itemCoordinates.first).toEqual({
    x: 300,
    y: 0,
    width: 100,
    height: 100,
  })
  expect(layout.itemCoordinates.fourth?.x).toBe(0)
})

test("order supports negative integers, numeric strings and stable ties", () => {
  const layout = fixedGrid([
    { key: "late", order: "10" },
    { key: "earlier", order: " +2 " },
    { key: "first", order: -1 },
    { key: "same", order: 2 },
  ]).layout()
  expect(layout.cells.map(({ key }) => key)).toEqual([
    "first",
    "earlier",
    "same",
    "late",
  ])
})

test("order treats invalid values as zero in both layout and HTML", () => {
  for (const order of ["2px", "", "1.5", "0x10", 1.5, NaN, Infinity]) {
    const grid = fixedGrid([
      { key: "positive", order: 1 },
      { key: "invalid", order },
      { key: "default" },
    ])
    expect(grid.layout().cells.map(({ key }) => key)).toEqual([
      "invalid",
      "default",
      "positive",
    ])
    expect(grid.convertToHtml()).toContain("order:0")
  }
})

test("order keeps omitted and explicit zero values stable", () => {
  const children = [
    { key: "a" },
    { key: "b", order: 0 },
    { key: "c", order: "0" },
    { key: "d" },
  ]
  expect(fixedGrid(children).layout().cells.map(({ key }) => key)).toEqual([
    "a",
    "b",
    "c",
    "d",
  ])
})

test("order does not mutate input or HTML document order", () => {
  const options = structuredClone(level10)
  const original = structuredClone(options)
  options.children.forEach(Object.freeze)
  Object.freeze(options.children)
  const grid = new CssGrid(options)
  const htmlBefore = grid.convertToHtml()
  const firstLayout = grid.layout()
  expect(grid.layout()).toEqual(firstLayout)
  expect(options).toEqual(original)
  expect(grid.convertToHtml()).toBe(htmlBefore)
  expect([...htmlBefore.matchAll(/id="([^"]+)"/g)].map((m) => m[1])).toEqual([
    "first",
    "second",
    "third",
    "fourth",
  ])
  expect(htmlBefore).toContain("order:3")
})

test("order is used before intrinsic column and row sizing", () => {
  const layout = new CssGrid({
    gridTemplateColumns: "auto auto",
    gridTemplateRows: "auto auto",
    children: [
      { key: "last", order: 2, contentWidth: 90, contentHeight: 40 },
      { key: "first", order: -1, contentWidth: 20, contentHeight: 10 },
      { key: "middle", contentWidth: 50, contentHeight: 30 },
    ],
  }).layout()
  expect(layout.columnSizes).toEqual([90, 50])
  expect(layout.rowSizes).toEqual([30, 40])
  expect(layout.itemCoordinates.last).toEqual({
    x: 0,
    y: 30,
    width: 90,
    height: 40,
  })
})

test("order preserves explicit positions and visual painting order", () => {
  const grid = fixedGrid([
    { key: "top", order: 2, column: 2, row: 1 },
    { key: "bottom", order: -1, column: 2, row: 1 },
  ])
  expect(grid.layout().cells.map(({ column }) => column)).toEqual([1, 1])
  expect(grid.visualize().rects?.map(({ label }) => label)).toEqual([
    "bottom",
    "top",
  ])
})

test("order preserves spans while reordering auto-placed items", () => {
  const layout = fixedGrid([
    { key: "last", order: 1 },
    { key: "wide", order: -1, columnSpan: 2 },
  ]).layout()
  expect(layout.itemCoordinates.wide?.width).toBe(200)
  expect(layout.itemCoordinates.last?.x).toBe(200)
})
