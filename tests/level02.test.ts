import { expect, test } from "bun:test"
import level2 from "testcases/level02"
import browserResult from "testcases/level02.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level02", () => {
  const { browserResultSvg, layout, outputViz } = testGrid(
    level2,
    browserResult,
  )

  expect(layout).toMatchInlineSnapshot(`
    {
      "cells": [
        {
          "column": 0,
          "columnSpan": 1,
          "key": "poison",
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
