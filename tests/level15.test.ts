import { expect, test } from "bun:test"
import level15 from "testcases/level15"
import browserResult from "testcases/level15.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level15", () => {
  const { laidOutResult, outputViz, layout } = testGrid(level15, browserResult)

  expect(browserResult).toMatchInlineSnapshot(`
    {
      "water": {
        "height": 100,
        "width": 80,
        "x": 20,
        "y": 0,
      },
    }
  `)
  expect(laidOutResult).toMatchInlineSnapshot(`
    {
      "water": {
        "height": 100,
        "width": 80,
        "x": 20,
        "y": 0,
      },
    }
  `)
  expect(layout).toMatchInlineSnapshot(`
    {
      "cells": [
        {
          "column": 1,
          "columnSpan": 4,
          "key": "water",
          "row": 0,
          "rowSpan": 5,
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
