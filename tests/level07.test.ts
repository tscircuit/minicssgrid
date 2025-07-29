import { expect, test } from "bun:test"
import level7 from "testcases/level07"
import browserResult from "testcases/level07.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level07", () => {
  const { browserResultSvg, layout, outputViz } = testGrid(
    level7,
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