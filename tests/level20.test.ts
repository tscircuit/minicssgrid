import { expect, test } from "bun:test"
import level20 from "testcases/level20"
import browserResult from "testcases/level20.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level20", () => {
  const { browserResultSvg, layout, outputViz } = testGrid(
    level20,
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
        50,
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