import { expect, test } from "bun:test"
import level4 from "testcases/level04"
import browserResult from "testcases/level04.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level04", () => {
  const { browserResultSvg, layout, outputViz } = testGrid(
    level4,
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