import { expect, test } from "bun:test"
import level12 from "testcases/level12"
import browserResult from "testcases/level12.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level12", () => {
  const { browserResultSvg, layout, outputViz } = testGrid(
    level12,
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