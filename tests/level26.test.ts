import { expect, test } from "bun:test"
import level26 from "testcases/level26"
import browserResult from "testcases/level26.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level26", () => {
  const { laidOutResult, outputViz, layout } = testGrid(level26, browserResult)

  expect(browserResult).toMatchInlineSnapshot(`
    {
      "water": {
        "height": 18,
        "width": 100,
        "x": 0,
        "y": 100,
      },
    }
  `)
  expect(laidOutResult).toMatchInlineSnapshot(`
    {
      "water": {
        "height": 0,
        "width": 100,
        "x": 50,
        "y": 100,
      },
    }
  `)
  expect(layout).toMatchInlineSnapshot(`
    {
      "cells": [
        {
          "column": 0,
          "columnSpan": 5,
          "key": "water",
          "row": 4,
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
        0,
        100,
        0,
        0,
        0,
      ],
    }
  `)

  expect(outputViz).toMatchSvgSnapshot(import.meta.path)
})