import { expect, test } from "bun:test"
import { CssGrid } from "lib/CssGrid/CssGrid"
import level1 from "testcases/level01"
import browserResult from "testcases/level01.browser-result.json"
import { getSvgFromGraphicsObject } from "graphics-debug"
import { visualizeBrowserResult } from "lib/visualizeBrowserResult"
import { testGrid } from "./fixtures/testGrid"

test("level01", () => {
  const { browserResultSvg, layout, outputViz } = testGrid(
    level1,
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
    import.meta.path.replace(".test.ts", ".browser-result.svg"),
  )

  expect(outputViz).toMatchSvgSnapshot(
    import.meta.path.replace(".test.ts", ".output.svg"),
  )
})
