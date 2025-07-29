import { expect, test } from "bun:test"
import level11 from "testcases/level11"
import browserResult from "testcases/level11.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level11", () => {
  const { browserResultSvg, layout, outputViz } = testGrid(
    level11,
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