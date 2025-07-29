import { expect, test } from "bun:test"
import level19 from "testcases/level19"
import browserResult from "testcases/level19.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level19", () => {
  const { browserResultSvg, layout, outputViz } = testGrid(
    level19,
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
          "key": "poison-1",
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
          "key": "poison-2",
          "row": 0,
          "rowSpan": 1,
        },
        {
          "column": 4,
          "columnSpan": 1,
          "key": "water-3",
          "row": 0,
          "rowSpan": 1,
        },
        {
          "column": 0,
          "columnSpan": 1,
          "key": "poison-3",
          "row": 1,
          "rowSpan": 1,
        },
        {
          "column": 1,
          "columnSpan": 1,
          "key": "water-4",
          "row": 1,
          "rowSpan": 1,
        },
        {
          "column": 2,
          "columnSpan": 1,
          "key": "poison-4",
          "row": 1,
          "rowSpan": 1,
        },
        {
          "column": 3,
          "columnSpan": 1,
          "key": "water-5",
          "row": 1,
          "rowSpan": 1,
        },
        {
          "column": 4,
          "columnSpan": 1,
          "key": "poison-5",
          "row": 1,
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