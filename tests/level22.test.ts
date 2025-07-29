import { expect, test } from "bun:test"
import level22 from "testcases/level22"
import browserResult from "testcases/level22.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level22", () => {
  const { browserResultSvg, layout, outputViz } = testGrid(
    level22,
    browserResult,
  )

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