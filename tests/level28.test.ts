import { expect, test } from "bun:test"
import level28 from "testcases/level28"
import browserResult from "testcases/level28.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level28", () => {
  const { browserResultSvg, layout, outputViz } = testGrid(
    level28,
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
      ],
      "columnSizes": [
        20,
        80,
      ],
      "rowSizes": [
        50,
        50,
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