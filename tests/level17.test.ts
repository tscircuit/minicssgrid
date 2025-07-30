import { expect, test } from "bun:test"
import level17 from "testcases/level17"
import browserResult from "testcases/level17.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level17", () => {
  const { laidOutResult, outputViz, layout } = testGrid(level17, browserResult)

  expect(browserResult).toMatchInlineSnapshot(`
    {
      "item1": {
        "height": 42,
        "width": 52,
        "x": 0,
        "y": 0,
      },
      "item2": {
        "height": 42,
        "width": 82,
        "x": 62,
        "y": 0,
      },
      "item3": {
        "height": 42,
        "width": 100,
        "x": 154,
        "y": 0,
      },
    }
  `)
  expect(laidOutResult).toMatchInlineSnapshot(`
    {
      "item1": {
        "height": 42,
        "width": 52,
        "x": 0,
        "y": 0,
      },
      "item2": {
        "height": 42,
        "width": 82,
        "x": 62,
        "y": 0,
      },
      "item3": {
        "height": 42,
        "width": 100,
        "x": 154,
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
          "height": 42,
          "key": "item1",
          "row": 0,
          "rowSpan": 1,
          "width": 52,
          "x": 0,
          "y": 0,
        },
        {
          "column": 1,
          "columnSpan": 1,
          "height": 42,
          "key": "item2",
          "row": 0,
          "rowSpan": 1,
          "width": 82,
          "x": 62,
          "y": 0,
        },
        {
          "column": 2,
          "columnSpan": 1,
          "height": 42,
          "key": "item3",
          "row": 0,
          "rowSpan": 1,
          "width": 100,
          "x": 154,
          "y": 0,
        },
      ],
      "columnGap": 10,
      "columnSizes": [
        52,
        82,
        100,
      ],
      "itemCoordinates": {
        "item1": {
          "height": 42,
          "width": 52,
          "x": 0,
          "y": 0,
        },
        "item2": {
          "height": 42,
          "width": 82,
          "x": 62,
          "y": 0,
        },
        "item3": {
          "height": 42,
          "width": 100,
          "x": 154,
          "y": 0,
        },
      },
      "rowGap": 10,
      "rowSizes": [
        42,
        0,
      ],
    }
  `)
  expect(outputViz).toMatchSvgSnapshot(import.meta.path)

  if (!process.env.BUN_UPDATE_SNAPSHOTS) {
    expect(laidOutResult).toEqual(browserResult)
  }
})
