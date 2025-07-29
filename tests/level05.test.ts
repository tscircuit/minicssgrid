import { expect, test } from "bun:test"
import level05 from "testcases/level05"
import browserResult from "testcases/level05.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level05", () => {
  const { laidOutResult, outputViz, layout } = testGrid(level05, browserResult)

  expect(browserResult).toMatchInlineSnapshot(`
    {
      "box1": {
        "height": 110,
        "width": 110,
        "x": 0,
        "y": 0,
      },
      "box2": {
        "height": 110,
        "width": 110,
        "x": 130,
        "y": 0,
      },
      "box3": {
        "height": 110,
        "width": 110,
        "x": 0,
        "y": 130,
      },
      "box4": {
        "height": 110,
        "width": 110,
        "x": 130,
        "y": 130,
      },
    }
  `)
  expect(laidOutResult).toMatchInlineSnapshot(`
    {
      "box1": {
        "height": 120,
        "width": 120,
        "x": 0,
        "y": 0,
      },
      "box2": {
        "height": 120,
        "width": 120,
        "x": 120,
        "y": 0,
      },
      "box3": {
        "height": 120,
        "width": 120,
        "x": 0,
        "y": 120,
      },
      "box4": {
        "height": 120,
        "width": 120,
        "x": 120,
        "y": 120,
      },
    }
  `)

  expect(layout).toMatchInlineSnapshot(`
    {
      "cells": [
        {
          "column": 0,
          "columnSpan": 1,
          "key": "box1",
          "row": 0,
          "rowSpan": 1,
        },
        {
          "column": 1,
          "columnSpan": 1,
          "key": "box2",
          "row": 0,
          "rowSpan": 1,
        },
        {
          "column": 0,
          "columnSpan": 1,
          "key": "box3",
          "row": 1,
          "rowSpan": 1,
        },
        {
          "column": 1,
          "columnSpan": 1,
          "key": "box4",
          "row": 1,
          "rowSpan": 1,
        },
      ],
      "columnSizes": [
        120,
        120,
      ],
      "rowSizes": [
        120,
        120,
      ],
    }
  `)
  expect(outputViz).toMatchSvgSnapshot(import.meta.path)

  if (!process.env.BUN_UPDATE_SNAPSHOTS) {
    expect(laidOutResult).toEqual(browserResult)
  }
})