import { expect, test } from "bun:test"
import level25 from "testcases/level25"
import browserResult from "testcases/level25.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level25", () => {
  const { browserResultSvg, layout, outputViz } = testGrid(
    level25,
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