import { expect, test } from "bun:test"
import level8 from "testcases/level08"
import browserResult from "testcases/level08.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level08", () => {
  const { browserResultSvg, layout, outputViz } = testGrid(
    level8,
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