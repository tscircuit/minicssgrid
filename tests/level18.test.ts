import { expect, test } from "bun:test"
import level18 from "testcases/level18"
import browserResult from "testcases/level18.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level18", () => {
  const { browserResultSvg, layout, outputViz } = testGrid(
    level18,
    browserResult,
  )


  expect(layout).toMatchInlineSnapshot(`
    {
      "cells": [
        {
          "column": 0,
          "columnSpan": 1,
          "key": "water-1",
          "row": 0,
          "rowSpan": 1,
        },
        {
          "column": 1,
          "columnSpan": 1,
          "key": "poison",
          "row": 0,
          "rowSpan": 1,
        },
        {
          "column": 2,
          "columnSpan": 1,
          "key": "water-2",
          "row": 0,
          "rowSpan": 1,
        },
        {
          "column": 3,
          "columnSpan": 1,
          "key": "water-3",
          "row": 0,
          "rowSpan": 1,
        },
        {
          "column": 4,
          "columnSpan": 1,
          "key": "water-4",
          "row": 0,
          "rowSpan": 1,
        },
      ],
      "columnSizes": [
        20,
        20,
        20,
        20,
        20,
      ],
      "rowSizes": [
        20,
        20,
        20,
        20,
        20,
      ],
    }
  `)

  expect(browserResultSvg).toMatchSvgSnapshot(
    import.meta.path.replace(".test.ts", ".browser-result"),
  )

  expect(outputViz).toMatchSvgSnapshot(
    import.meta.path.replace(".test.ts", ".output"),
  )
})