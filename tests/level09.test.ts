import { expect, test } from "bun:test"
import level09 from "testcases/level09"
import browserResult from "testcases/level09.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level09", () => {
  const { laidOutResult, outputViz, layout } = testGrid(level09, browserResult)

  expect(browserResult).toMatchInlineSnapshot(`
    {
      "big": {
        "height": 200,
        "width": 200,
        "x": 0,
        "y": 0,
      },
      "bottom": {
        "height": 100,
        "width": 300,
        "x": 0,
        "y": 200,
      },
      "small1": {
        "height": 100,
        "width": 100,
        "x": 200,
        "y": 0,
      },
      "small2": {
        "height": 100,
        "width": 100,
        "x": 200,
        "y": 100,
      },
    }
  `)
  expect(laidOutResult).toMatchInlineSnapshot(`
    {
      "big": {
        "height": 200,
        "width": 200,
        "x": 0,
        "y": 0,
      },
      "bottom": {
        "height": 100,
        "width": 300,
        "x": 0,
        "y": 200,
      },
      "small1": {
        "height": 100,
        "width": 100,
        "x": 200,
        "y": 0,
      },
      "small2": {
        "height": 100,
        "width": 100,
        "x": 200,
        "y": 100,
      },
    }
  `)

  expect(layout).toMatchInlineSnapshot(`
    {
      "cells": [
        {
          "column": 0,
          "columnSpan": 2,
          "key": "big",
          "row": 0,
          "rowSpan": 2,
        },
        {
          "column": 2,
          "columnSpan": 1,
          "key": "small1",
          "row": 0,
          "rowSpan": 1,
        },
        {
          "column": 2,
          "columnSpan": 1,
          "key": "small2",
          "row": 1,
          "rowSpan": 1,
        },
        {
          "column": 0,
          "columnSpan": 3,
          "key": "bottom",
          "row": 2,
          "rowSpan": 1,
        },
      ],
      "columnGap": 0,
      "columnSizes": [
        100,
        100,
        100,
      ],
      "rowGap": 0,
      "rowSizes": [
        100,
        100,
        100,
      ],
    }
  `)
  expect(outputViz).toMatchSvgSnapshot(import.meta.path)

  if (!process.env.BUN_UPDATE_SNAPSHOTS) {
    expect(laidOutResult).toEqual(browserResult)
  }
})
