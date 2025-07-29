import { expect, test } from "bun:test"
import level27 from "testcases/level27"
import browserResult from "testcases/level27.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level27", () => {
  const { browserResultSvg, layout, outputViz } = testGrid(
    level27,
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
      ],
      "columnSizes": [
        200,
        0,
      ],
      "rowSizes": [
        60,
        40,
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