import { expect, test } from "bun:test"
import level24 from "testcases/level24"
import browserResult from "testcases/level24.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level24", () => {
  const { browserResultSvg, layout, outputViz } = testGrid(
    level24,
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