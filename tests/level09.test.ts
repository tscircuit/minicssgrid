import { expect, test } from "bun:test"
import level9 from "testcases/level09"
import browserResult from "testcases/level09.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level09", () => {
  const { browserResultSvg, layout, outputViz } = testGrid(
    level9,
    browserResult,
  )


  expect(layout).toMatchInlineSnapshot(`
    {
      "cells": [
        {
          "column": 0,
          "columnSpan": 3,
          "key": "water",
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