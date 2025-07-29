import { expect, test } from "bun:test"
import level5 from "testcases/level05"
import browserResult from "testcases/level05.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level05", () => {
  const { browserResultSvg, layout, outputViz } = testGrid(
    level5,
    browserResult,
  )


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