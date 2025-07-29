import { expect, test } from "bun:test"
import level26 from "testcases/level26"
import browserResult from "testcases/level26.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level26", () => {
  const { browserResultSvg, layout, outputViz } = testGrid(
    level26,
    browserResult,
  )


  expect(layout).toMatchInlineSnapshot(`
    {
      "cells": [
        {
          "column": 0,
          "columnSpan": 5,
          "key": "water",
          "row": 4,
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
        0,
        100,
        0,
        0,
        0,
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