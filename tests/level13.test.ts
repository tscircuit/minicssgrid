import { expect, test } from "bun:test"
import level13 from "testcases/level13"
import browserResult from "testcases/level13.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level13", () => {
  const { browserResultSvg, layout, outputViz } = testGrid(
    level13,
    browserResult,
  )

    browserResultSvg,
    layout,
    outputViz,
  })

  expect(layout).toMatchInlineSnapshot(`
    {
      "cells": [],
      "columnSizes": [],
      "rowSizes": [],
    }
  `)

  expect(browserResultSvg).toMatchSvgSnapshot(
    import.meta.path.replace(".test.ts", ".browser-result"),
  )

  expect(outputViz).toMatchSvgSnapshot(
    import.meta.path.replace(".test.ts", ".output"),
  )
})