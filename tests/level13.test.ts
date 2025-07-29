import { expect, test } from "bun:test"
import level13 from "testcases/level13"
import browserResult from "testcases/level13.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level13", () => {
  const { laidOutResult, outputViz, layout } = testGrid(level13, browserResult)

  expect(browserResult).toMatchInlineSnapshot(`
    {
      "ads": {
        "height": 300,
        "width": 80,
        "x": 320,
        "y": 0,
      },
      "main": {
        "height": 300,
        "width": 220,
        "x": 100,
        "y": 0,
      },
      "sidebar": {
        "height": 300,
        "width": 100,
        "x": 0,
        "y": 0,
      },
    }
  `)
  expect(laidOutResult).toMatchInlineSnapshot(`
    {
      "ads": {
        "height": 300,
        "width": 80,
        "x": 320,
        "y": 0,
      },
      "main": {
        "height": 300,
        "width": 220,
        "x": 100,
        "y": 0,
      },
      "sidebar": {
        "height": 300,
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
          "key": "sidebar",
          "row": 0,
          "rowSpan": 1,
        },
        {
          "column": 1,
          "columnSpan": 1,
          "key": "main",
          "row": 0,
          "rowSpan": 1,
        },
        {
          "column": 2,
          "columnSpan": 1,
          "key": "ads",
          "row": 0,
          "rowSpan": 1,
        },
      ],
      "columnGap": 0,
      "columnSizes": [
        100,
        220,
        80,
      ],
      "rowGap": 0,
      "rowSizes": [
        300,
      ],
    }
  `)
  expect(outputViz).toMatchSvgSnapshot(import.meta.path)

  if (!process.env.BUN_UPDATE_SNAPSHOTS) {
    expect(laidOutResult).toEqual(browserResult)
  }
})
