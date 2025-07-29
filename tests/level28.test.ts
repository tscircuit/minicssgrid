import { expect, test } from "bun:test"
import level28 from "testcases/level28"
import browserResult from "testcases/level28.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level28", () => {
  const { laidOutResult, outputViz, layout } = testGrid(level28, browserResult)

  expect(browserResult).toMatchInlineSnapshot(`
    {
      "poison": {
        "height": 50,
        "width": 100,
        "x": 0,
        "y": 50,
      },
      "water": {
        "height": 50,
        "width": 100,
        "x": 0,
        "y": 0,
      },
    }
  `)
  expect(laidOutResult).toMatchInlineSnapshot(`
    {
      "poison": {
        "height": 50,
        "width": 80,
        "x": 60,
        "y": 25,
      },
      "water": {
        "height": 50,
        "width": 20,
        "x": 10,
        "y": 25,
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
        {
          "column": 1,
          "columnSpan": 1,
          "key": "poison",
          "row": 0,
          "rowSpan": 1,
        },
      ],
      "columnSizes": [
        20,
        80,
      ],
      "rowSizes": [
        50,
        50,
      ],
    }
  `)

  expect(outputViz).toMatchSvgSnapshot(import.meta.path)
})