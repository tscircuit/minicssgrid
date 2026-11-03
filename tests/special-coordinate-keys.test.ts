import { expect, test } from "bun:test"
import { CssGrid } from "../lib"

function gridWithKeys(keys: string[]) {
  return new CssGrid({
    containerWidth: 100,
    containerHeight: 60,
    gridTemplateColumns: "50px 50px",
    gridTemplateRows: "60px",
    children: keys.map((key) => ({ key })),
  })
}

test("__proto__ remains an own enumerable coordinate key", () => {
  const { itemCoordinates } = gridWithKeys(["__proto__", "ordinary"]).layout()

  expect(Object.keys(itemCoordinates)).toEqual(["__proto__", "ordinary"])
  expect(Object.hasOwn(itemCoordinates, "__proto__")).toBe(true)
  expect(itemCoordinates.__proto__).toEqual({
    x: 0,
    y: 0,
    width: 50,
    height: 60,
  })
})

test("JSON serialization retains the __proto__ item's coordinates", () => {
  const { itemCoordinates } = gridWithKeys(["__proto__"]).layout()
  const decoded = JSON.parse(JSON.stringify(itemCoordinates))

  expect(Object.hasOwn(decoded, "__proto__")).toBe(true)
  expect(decoded.__proto__).toEqual({ x: 0, y: 0, width: 50, height: 60 })
})

test("an item key cannot replace the coordinate record's prototype", () => {
  const { itemCoordinates } = gridWithKeys(["__proto__"]).layout()

  expect(Object.getPrototypeOf(itemCoordinates)).toBe(Object.prototype)
  expect("x" in itemCoordinates).toBe(false)
})

test("ordinary keys keep their positions and normal property descriptors", () => {
  const { itemCoordinates } = gridWithKeys(["first", "second"]).layout()

  expect(itemCoordinates).toEqual({
    first: { x: 0, y: 0, width: 50, height: 60 },
    second: { x: 50, y: 0, width: 50, height: 60 },
  })
  expect(Object.getPrototypeOf(itemCoordinates)).toBe(Object.prototype)
  expect(Object.getOwnPropertyDescriptor(itemCoordinates, "first")).toEqual({
    value: { x: 0, y: 0, width: 50, height: 60 },
    enumerable: true,
    configurable: true,
    writable: true,
  })
})

for (const key of ["constructor", "toString", "hasOwnProperty", "", "日本語"]) {
  test(`preserves the ordinary string key ${JSON.stringify(key)}`, () => {
    const { itemCoordinates } = gridWithKeys([key]).layout()

    expect(Object.keys(itemCoordinates)).toEqual([key])
    expect(Object.hasOwn(itemCoordinates, key)).toBe(true)
    expect(itemCoordinates[key]).toEqual({ x: 0, y: 0, width: 50, height: 60 })
  })
}

test("special-key entries remain writable and configurable", () => {
  const { itemCoordinates } = gridWithKeys(["__proto__"]).layout()
  const replacement = { x: 1, y: 2, width: 3, height: 4 }

  itemCoordinates.__proto__ = replacement
  expect(Object.getPrototypeOf(itemCoordinates)).toBe(Object.prototype)
  expect(Object.hasOwn(itemCoordinates, "__proto__")).toBe(true)
  expect(itemCoordinates.__proto__).toEqual(replacement)
  expect(delete itemCoordinates.__proto__).toBe(true)
  expect(Object.hasOwn(itemCoordinates, "__proto__")).toBe(false)
})

test("repeated layouts produce independent records with the special key", () => {
  const grid = gridWithKeys(["ordinary", "__proto__"])
  const first = grid.layout().itemCoordinates
  const second = grid.layout().itemCoordinates

  expect(first).not.toBe(second)
  expect(Object.keys(second)).toEqual(["ordinary", "__proto__"])
  expect(second.__proto__).toEqual({ x: 50, y: 0, width: 50, height: 60 })
})
