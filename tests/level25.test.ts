import { expect, test } from "bun:test"
import level25 from "testcases/level25"
import browserResult from "testcases/level25.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level25", () => {
  const { browserResultSvg, layout, outputViz } = testGrid(
    level25,
    browserResult,
  )


  expect(layout).toMatchInlineSnapshot(`
    {
      "cells": [
        {
          "column": 0,
          "columnSpan": 1,
          "key": "water",
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
      ],
      "columnSizes": [
        75,
        15,
        10,
      ],
      "rowSizes": [
        100,
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