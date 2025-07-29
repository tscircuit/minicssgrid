import { expect, test } from "bun:test"
import level17 from "testcases/level17"
import browserResult from "testcases/level17.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level17", () => {
  const { laidOutResult, outputViz, layout } = testGrid(level17, browserResult)

  expect(browserResult).toMatchInlineSnapshot(`
    {
      "water-1": {
        "height": 100,
        "width": 20,
        "x": 60,
        "y": 0,
      },
      "water-2": {
        "height": 60,
        "width": 60,
        "x": 40,
        "y": 20,
      },
    }
  `)
  expect(laidOutResult).toMatchInlineSnapshot(`
    {
      "water-1": {
        "height": 100,
        "width": 20,
        "x": 60,
        "y": 0,
      },
      "water-2": {
        "height": 60,
        "width": 60,
        "x": 40,
        "y": 20,
      },
    }
  `)
  expect(layout).toMatchInlineSnapshot(`
    {
      "cells": [
        {
          "column": 3,
          "columnSpan": 1,
          "key": "water-1",
          "row": 0,
          "rowSpan": 5,
        },
        {
          "column": 2,
          "columnSpan": 3,
          "key": "water-2",
          "row": 1,
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
