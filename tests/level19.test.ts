import { expect, test } from "bun:test"
import level19 from "testcases/level19"
import browserResult from "testcases/level19.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level19", () => {
  const { browserResultSvg, layout, outputViz } = testGrid(
    level19,
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