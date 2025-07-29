import { expect, test } from "bun:test"
import level15 from "testcases/level15"
import browserResult from "testcases/level15.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level15", () => {
  const { browserResultSvg, layout, outputViz } = testGrid(
    level15,
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