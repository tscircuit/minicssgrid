import { expect, test } from "bun:test"
import { CssGrid } from "lib/CssGrid/CssGrid"

const children = [
  { key: "a" },
  { key: "b" },
  { key: "c" },
  { key: "d" },
  { key: "e" },
  { key: "f" },
]

test("array grid templates layout the same as the equivalent string templates", () => {
  const stringLayout = new CssGrid({
    containerWidth: 300,
    containerHeight: 200,
    gridTemplateColumns: "100px 1fr 2fr",
    gridTemplateRows: "1fr 1fr",
    children,
  }).layout()

  const arrayLayout = new CssGrid({
    containerWidth: 300,
    containerHeight: 200,
    gridTemplateColumns: ["100px", "1fr", "2fr"],
    gridTemplateRows: ["1fr", "1fr"],
    children,
  }).layout()

  expect(arrayLayout.columnSizes).toEqual(stringLayout.columnSizes)
  expect(arrayLayout.rowSizes).toEqual(stringLayout.rowSizes)
  expect(arrayLayout.itemCoordinates).toEqual(stringLayout.itemCoordinates)
  expect(arrayLayout.columnSizes).toEqual([100, 200 / 3, 400 / 3])
  expect(arrayLayout.rowSizes).toEqual([100, 100])
})

test("array repeat() templates expand the same as string templates", () => {
  const stringLayout = new CssGrid({
    containerWidth: 300,
    containerHeight: 90,
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "repeat(3, 1fr)",
    children,
  }).layout()

  const arrayLayout = new CssGrid({
    containerWidth: 300,
    containerHeight: 90,
    gridTemplateColumns: ["repeat(3, 1fr)"],
    gridTemplateRows: ["repeat(3, 1fr)"],
    children,
  }).layout()

  expect(arrayLayout.columnSizes).toEqual(stringLayout.columnSizes)
  expect(arrayLayout.rowSizes).toEqual(stringLayout.rowSizes)
  expect(arrayLayout.itemCoordinates).toEqual(stringLayout.itemCoordinates)
  expect(arrayLayout.columnSizes).toEqual([100, 100, 100])
  expect(arrayLayout.rowSizes).toEqual([30, 30, 30])
})
