import { expect, test } from "bun:test"
import level26 from "testcases/level26"
import browserResult from "testcases/level26.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level26", () => {
  const { browserResultSvg, layout, outputViz } = testGrid(
    level26,
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