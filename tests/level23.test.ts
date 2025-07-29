import { expect, test } from "bun:test"
import level23 from "testcases/level23"
import browserResult from "testcases/level23.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level23", () => {
  const { laidOutResult, outputViz, layout } = testGrid(level23, browserResult)

  expect(browserResult).toMatchInlineSnapshot(`
    {
      "poison": {
        "height": 20,
        "width": 60.875,
        "x": 39.125,
        "y": 0,
      },
      "water": {
        "height": 20,
        "width": 39.125,
        "x": 0,
        "y": 0,
      },
    }
  `)
  expect(laidOutResult).toMatchInlineSnapshot(`
    {
      "poison": {
        "height": 20,
        "width": 83.33333333333334,
        "x": 58.33333333333334,
        "y": 10,
      },
      "water": {
        "height": 20,
        "width": 16.666666666666668,
        "x": 8.333333333333334,
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
        {
          "column": 1,
          "columnSpan": 1,
          "key": "poison",
          "row": 0,
          "rowSpan": 1,
        },
      ],
      "columnSizes": [
        16.666666666666668,
        83.33333333333334,
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