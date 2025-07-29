import { expect, test } from "bun:test"
import level1 from "testcases/level01"
import browserResult from "testcases/level01.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level01", () => {
  const { browserResultSvg, layout, outputViz } = testGrid(
    level1,
    browserResult,
  )

  console.log({
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
