import { expect, test } from "bun:test"
import level06 from "testcases/level06"
import browserResult from "testcases/level06.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level06", () => {
  const { laidOutResult, outputViz, layout } = testGrid(level06, browserResult)

  expect(browserResult).toMatchInlineSnapshot(`
    {
      "a": {
        "height": 95,
        "width": 80,
        "x": 0,
        "y": 0,
      },
      "b": {
        "height": 95,
        "width": 80,
        "x": 110,
        "y": 0,
      },
      "c": {
        "height": 95,
        "width": 80,
        "x": 220,
        "y": 0,
      },
      "d": {
        "height": 95,
        "width": 80,
        "x": 0,
        "y": 105,
      },
      "e": {
        "height": 95,
        "width": 80,
        "x": 110,
        "y": 105,
      },
      "f": {
        "height": 95,
        "width": 80,
        "x": 220,
        "y": 105,
      },
    }
  `)
  expect(laidOutResult).toMatchInlineSnapshot(`
    {
      "a": {
        "height": 95,
        "width": 80,
        "x": 0,
        "y": 0,
      },
      "b": {
        "height": 95,
        "width": 80,
        "x": 110,
        "y": 0,
      },
      "c": {
        "height": 95,
        "width": 80,
        "x": 220,
        "y": 0,
      },
      "d": {
        "height": 95,
        "width": 80,
        "x": 0,
        "y": 105,
      },
      "e": {
        "height": 95,
        "width": 80,
        "x": 110,
        "y": 105,
      },
      "f": {
        "height": 95,
        "width": 80,
        "x": 220,
        "y": 105,
      },
    }
  `)

  expect(layout).toMatchInlineSnapshot(`
    {
      "cells": [
        {
          "column": 0,
          "columnSpan": 1,
          "height": 95,
          "key": "a",
          "row": 0,
          "rowSpan": 1,
          "width": 80,
          "x": 0,
          "y": 0,
        },
        {
          "column": 1,
          "columnSpan": 1,
          "height": 95,
          "key": "b",
          "row": 0,
          "rowSpan": 1,
          "width": 80,
          "x": 110,
          "y": 0,
        },
        {
          "column": 2,
          "columnSpan": 1,
          "height": 95,
          "key": "c",
          "row": 0,
          "rowSpan": 1,
          "width": 80,
          "x": 220,
          "y": 0,
        },
        {
          "column": 0,
          "columnSpan": 1,
          "height": 95,
          "key": "d",
          "row": 1,
          "rowSpan": 1,
          "width": 80,
          "x": 0,
          "y": 105,
        },
        {
          "column": 1,
          "columnSpan": 1,
          "height": 95,
          "key": "e",
          "row": 1,
          "rowSpan": 1,
          "width": 80,
          "x": 110,
          "y": 105,
        },
        {
          "column": 2,
          "columnSpan": 1,
          "height": 95,
          "key": "f",
          "row": 1,
          "rowSpan": 1,
          "width": 80,
          "x": 220,
          "y": 105,
        },
      ],
      "columnGap": 30,
      "columnSizes": [
        80,
        80,
        80,
      ],
      "itemCoordinates": {
        "a": {
          "height": 95,
          "width": 80,
          "x": 0,
          "y": 0,
        },
        "b": {
          "height": 95,
          "width": 80,
          "x": 110,
          "y": 0,
        },
        "c": {
          "height": 95,
          "width": 80,
          "x": 220,
          "y": 0,
        },
        "d": {
          "height": 95,
          "width": 80,
          "x": 0,
          "y": 105,
        },
        "e": {
          "height": 95,
          "width": 80,
          "x": 110,
          "y": 105,
        },
        "f": {
          "height": 95,
          "width": 80,
          "x": 220,
          "y": 105,
        },
      },
      "rowGap": 10,
      "rowSizes": [
        95,
        95,
      ],
    }
  `)
  expect(outputViz).toMatchSvgSnapshot(import.meta.path)

  if (!process.env.BUN_UPDATE_SNAPSHOTS) {
    expect(laidOutResult).toEqual(browserResult)
  }
})
