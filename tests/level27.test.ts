import { expect, test } from "bun:test"
import level27 from "testcases/level27"
import browserResult from "testcases/level27.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level27", () => {
  const { laidOutResult, outputViz, layout } = testGrid(level27, browserResult)

  expect(browserResult).toMatchInlineSnapshot(`
    {
      "water": {
        "height": 100,
        "width": 100,
        "x": 0,
        "y": 0,
      },
    }
  `)
  expect(laidOutResult).toMatchInlineSnapshot(`
    {
      "water": {
        "height": 60,
        "width": 200,
        "x": 0,
        "y": 0,
      },
    }
  `)
  expect(layout).toMatchInlineSnapshot(`
    {
      "cells": [
        {
          "column": 0,
          "columnSpan": 1,
          "key": "water",
          "row": 0,
          "rowSpan": 1,
        },
      ],
      "columnSizes": [
        200,
        0,
      ],
      "rowSizes": [
        60,
        40,
      ],
    }
  `)

  expect(outputViz).toMatchSvgSnapshot(import.meta.path)
})
