import { expect, test } from "bun:test"
import level20 from "testcases/level20"
import browserResult from "testcases/level20.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level20", () => {
  const { laidOutResult, outputViz, layout } = testGrid(level20, browserResult)

  expect(browserResult).toMatchInlineSnapshot(`
    {
      "water": {
        "height": 10,
        "width": 100,
        "x": 0,
        "y": 0,
      },
    }
  `)
  expect(laidOutResult).toMatchInlineSnapshot(`
    {
      "water": {
        "height": 10,
        "width": 100,
        "x": 0,
        "y": 0,
      },
    }
  `)

  expect(layout).toMatchInlineSnapshot(`
    {
      "cells": [
        {
          "column": 0,
          "columnSpan": 1,
          "height": 10,
          "key": "water",
          "row": 0,
          "rowSpan": 1,
          "width": 100,
          "x": 0,
          "y": 0,
        },
      ],
      "columnGap": 0,
      "columnSizes": [
        100,
      ],
      "itemCoordinates": {
        "water": {
          "height": 10,
          "width": 100,
          "x": 0,
          "y": 0,
        },
      },
      "rowGap": 0,
      "rowSizes": [
        10,
        10,
      ],
    }
  `)
  expect(outputViz).toMatchSvgSnapshot(import.meta.path)

  if (!process.env.BUN_UPDATE_SNAPSHOTS) {
    expect(laidOutResult).toEqual(browserResult)
  }
})
