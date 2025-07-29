import { expect, test } from "bun:test"
import level21 from "testcases/level21"
import browserResult from "testcases/level21.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level21", () => {
  const { laidOutResult, outputViz, layout } = testGrid(level21, browserResult)

  expect(browserResult).toMatchInlineSnapshot(`
    {
      "water": {
        "height": 20,
        "width": 12.5,
        "x": 0,
        "y": 0,
      },
    }
  `)
  expect(laidOutResult).toMatchInlineSnapshot(`
    {
      "water": {
        "height": 20,
        "width": 12.5,
        "x": 6.25,
        "y": 10,
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
        12.5,
        12.5,
        12.5,
        12.5,
        12.5,
        12.5,
        12.5,
        12.5,
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