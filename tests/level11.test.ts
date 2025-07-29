import { expect, test } from "bun:test"
import level11 from "testcases/level11"
import browserResult from "testcases/level11.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level11", () => {
  const { laidOutResult, outputViz, layout } = testGrid(level11, browserResult)

  expect(browserResult).toMatchInlineSnapshot(`
    {
      "another-item": {
        "height": 18,
        "width": 89.828125,
        "x": 105.078125,
        "y": 41,
      },
      "center-item": {
        "height": 18,
        "width": 80.03125,
        "x": 9.984375,
        "y": 41,
      },
    }
  `)
  expect(laidOutResult).toMatchInlineSnapshot(`
    {
      "another-item": {
        "height": 100,
        "width": 100,
        "x": 100,
        "y": 0,
      },
      "center-item": {
        "height": 100,
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
          "key": "center-item",
          "row": 0,
          "rowSpan": 1,
        },
        {
          "column": 1,
          "columnSpan": 1,
          "key": "another-item",
          "row": 0,
          "rowSpan": 1,
        },
      ],
      "columnSizes": [
        100,
        100,
      ],
      "rowSizes": [
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