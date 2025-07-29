import { expect, test } from "bun:test"
import level28 from "testcases/level28"
import browserResult from "testcases/level28.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level28", () => {
  const { browserResultSvg, layout, outputViz } = testGrid(
    level28,
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