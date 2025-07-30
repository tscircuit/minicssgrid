import { expect, test } from "bun:test"
import level1 from "testcases/level01"
import browserResult from "testcases/level01.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level01", () => {
  const { laidOutResult, outputViz, layout } = testGrid(level1, browserResult)

  expect(browserResult).toMatchInlineSnapshot(`
    {
      "water": {
        "height": 18,
        "width": 18,
        "x": 41,
        "y": 1,
      },
    }
  `)
  expect(laidOutResult).toMatchInlineSnapshot(`
    {
      "water": {
        "height": 20,
        "width": 20,
        "x": 40,
        "y": 0,
      },
    }
  `)
  expect(laidOutResult).toEqual(browserResult)
  expect(layout).toMatchInlineSnapshot(`
    {
      "cells": [
        {
          "column": 2,
          "columnSpan": 1,
          "height": 20,
          "key": "water",
          "row": 0,
          "rowSpan": 1,
          "width": 20,
          "x": 40,
          "y": 0,
        },
      ],
      "columnGap": 0,
      "columnSizes": [
        20,
        20,
        20,
        20,
        20,
      ],
      "itemCoordinates": {
        "water": {
          "height": 20,
          "width": 20,
          "x": 40,
          "y": 0,
        },
      },
      "rowGap": 0,
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
