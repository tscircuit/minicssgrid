import { expect, test } from "bun:test"
import level20 from "testcases/level20"
import browserResult from "testcases/level20.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level20", () => {
  const { browserResultSvg, layout, outputViz } = testGrid(
    level20,
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