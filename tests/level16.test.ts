import { expect, test } from "bun:test"
import level16 from "testcases/level16"
import browserResult from "testcases/level16.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level16", () => {
  const { browserResultSvg, layout, outputViz } = testGrid(
    level16,
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