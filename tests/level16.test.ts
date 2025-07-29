import { expect, test } from "bun:test"
import level16 from "testcases/level16"
import browserResult from "testcases/level16.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level16", () => {
  const { browserResultSvg, layout, outputViz } = testGrid(
    level16,
    browserResult,
  )


  expect(layout).toMatchInlineSnapshot(`
    {
      "cells": [
        {
          "column": 1,
          "columnSpan": 4,
          "key": "water",
          "row": 0,
          "rowSpan": 3,
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