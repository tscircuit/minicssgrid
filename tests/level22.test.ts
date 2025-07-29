import { expect, test } from "bun:test"
import level22 from "testcases/level22"
import browserResult from "testcases/level22.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level22", () => {
  const { browserResultSvg, layout, outputViz } = testGrid(
    level22,
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
          "rowSpan": 5,
        },
        {
          "column": 4,
          "columnSpan": 1,
          "key": "poison",
          "row": 0,
          "rowSpan": 5,
        },
      ],
      "columnSizes": [
        50,
        0,
        0,
        0,
        50,
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