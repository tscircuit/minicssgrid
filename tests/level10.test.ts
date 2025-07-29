import { expect, test } from "bun:test"
import level10 from "testcases/level10"
import browserResult from "testcases/level10.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level10", () => {
  const { browserResultSvg, layout, outputViz } = testGrid(
    level10,
    browserResult,
  )


  expect(layout).toMatchInlineSnapshot(`
    {
      "cells": [
        {
          "column": 0,
          "columnSpan": 2,
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