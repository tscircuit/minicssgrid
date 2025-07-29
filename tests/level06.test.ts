import { expect, test } from "bun:test"
import level6 from "testcases/level06"
import browserResult from "testcases/level06.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level06", () => {
  const { browserResultSvg, layout, outputViz } = testGrid(
    level6,
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