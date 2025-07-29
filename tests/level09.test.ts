import { expect, test } from "bun:test"
import level9 from "testcases/level09"
import browserResult from "testcases/level09.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level09", () => {
  const { browserResultSvg, layout, outputViz } = testGrid(
    level9,
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