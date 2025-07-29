import { expect, test } from "bun:test"
import level15 from "testcases/level15"
import browserResult from "testcases/level15.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level15", () => {
  const { browserResultSvg, layout, outputViz } = testGrid(
    level15,
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
          "rowSpan": 5,
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