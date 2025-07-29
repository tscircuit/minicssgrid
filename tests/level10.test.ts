import { expect, test } from "bun:test"
import level10 from "testcases/level10"
import browserResult from "testcases/level10.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level10", () => {
  const { laidOutResult, outputViz, layout } = testGrid(level10, browserResult)

  expect(browserResult).toMatchInlineSnapshot(`
    {
      "water": {
        "height": 20,
        "width": 40,
        "x": 60,
        "y": 0,
      },
    }
  `)
  expect(laidOutResult).toMatchInlineSnapshot(`
    {
      "water": {
        "height": 20,
        "width": 40,
        "x": 60,
        "y": 0,
      },
    }
  `)
  expect(layout).toMatchInlineSnapshot(`
    {
      "cells": [
        {
          "column": 3,
          "columnSpan": 2,
          "key": "water",
          "row": 0,
          "rowSpan": 1,
        },
      ],
      "columnSizes": [
        20,
        20,
        20,
        20,
        20,
      ],
      "rowSizes": [
        20,
        20,
        20,
        20,
        20,
      ],
    }
  `)

  expect(outputViz).toMatchSvgSnapshot(import.meta.path)
})
