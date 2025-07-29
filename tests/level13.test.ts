import { expect, test } from "bun:test"
import level13 from "testcases/level13"
import browserResult from "testcases/level13.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level13", () => {
  const { laidOutResult, outputViz, layout } = testGrid(level13, browserResult)

  expect(browserResult).toMatchInlineSnapshot(`
    {
      "water": {
        "height": 60,
        "width": 20,
        "x": 0,
        "y": 40,
      },
    }
  `)
  expect(laidOutResult).toMatchInlineSnapshot(`
    {
      "water": {
        "height": 60,
        "width": 20,
        "x": 10,
        "y": 30,
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
          "rowSpan": 3,
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