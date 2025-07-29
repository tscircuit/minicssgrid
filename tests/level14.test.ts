import { expect, test } from "bun:test"
import level14 from "testcases/level14"
import browserResult from "testcases/level14.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level14", () => {
  const { browserResultSvg, layout, outputViz } = testGrid(
    level14,
    browserResult,
  )


  expect(layout).toMatchInlineSnapshot(`
    {
      "cells": [
        {
          "column": 1,
          "columnSpan": 1,
          "key": "poison",
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