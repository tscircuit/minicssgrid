import { expect, test } from "bun:test"
import level25 from "testcases/level25"
import browserResult from "testcases/level25.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level25", () => {
  const { laidOutResult, outputViz, layout } = testGrid(level25, browserResult)

  expect(browserResult).toMatchInlineSnapshot(`
    {
      "poison": {
        "height": 100,
        "width": 47.15625,
        "x": 75,
        "y": 0,
      },
      "water": {
        "height": 100,
        "width": 75,
        "x": 0,
        "y": 0,
      },
      "water-2": {
        "height": 100,
        "width": 44.453125,
        "x": 122.15625,
        "y": 0,
      },
    }
  `)
  expect(laidOutResult).toMatchInlineSnapshot(`
    {
      "poison": {
        "height": 100,
        "width": 15,
        "x": 82.5,
        "y": 50,
      },
      "water": {
        "height": 100,
        "width": 75,
        "x": 37.5,
        "y": 50,
      },
      "water-2": {
        "height": 100,
        "width": 10,
        "x": 95,
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
          "rowSpan": 1,
        },
        {
          "column": 1,
          "columnSpan": 1,
          "key": "poison",
          "row": 0,
          "rowSpan": 1,
        },
        {
          "column": 2,
          "columnSpan": 1,
          "key": "water-2",
          "row": 0,
          "rowSpan": 1,
        },
      ],
      "columnSizes": [
        75,
        15,
        10,
      ],
      "rowSizes": [
        100,
      ],
    }
  `)

  expect(outputViz).toMatchSvgSnapshot(import.meta.path)
})