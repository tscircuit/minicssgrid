import { expect, test } from "bun:test"
import level21 from "testcases/level21"
import browserResult from "testcases/level21.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level21", () => {
  const { browserResultSvg, layout, outputViz } = testGrid(
    level21,
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
        12.5,
        12.5,
        12.5,
        12.5,
        12.5,
        12.5,
        12.5,
        12.5,
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