import { expect, test } from "bun:test"
import level22 from "testcases/level22"
import browserResult from "testcases/level22.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level22", () => {
  const { laidOutResult, outputViz, layout } = testGrid(level22, browserResult)

  expect(browserResult).toMatchInlineSnapshot(`
    {
      "poison": {
        "height": 100,
        "width": 50,
        "x": 50,
        "y": 0,
      },
      "water": {
        "height": 100,
        "width": 50,
        "x": 0,
        "y": 0,
      },
    }
  `)
  expect(laidOutResult).toMatchInlineSnapshot(`
    {
      "poison": {
        "height": 100,
        "width": 50,
        "x": 75,
        "y": 50,
      },
      "water": {
        "height": 100,
        "width": 50,
        "x": 25,
        "y": 50,
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
          "rowSpan": 5,
        },
        {
          "column": 4,
          "columnSpan": 1,
          "key": "poison",
          "row": 0,
          "rowSpan": 5,
        },
      ],
      "columnSizes": [
        50,
        0,
        0,
        0,
        50,
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