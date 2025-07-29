import { expect, test } from "bun:test"
import level04 from "testcases/level04"
import browserResult from "testcases/level04.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level04", () => {
  const { laidOutResult, outputViz, layout } = testGrid(level04, browserResult)

  expect(browserResult).toMatchInlineSnapshot(`
    {
      "content": {
        "height": 120,
        "width": 100,
        "x": 0,
        "y": 50,
      },
      "footer": {
        "height": 120,
        "width": 200,
        "x": 100,
        "y": 50,
      },
      "header": {
        "height": 50,
        "width": 100,
        "x": 0,
        "y": 0,
      },
      "sidebar": {
        "height": 50,
        "width": 200,
        "x": 100,
        "y": 0,
      },
    }
  `)
  expect(laidOutResult).toMatchInlineSnapshot(`
    {
      "content": {
        "height": 120,
        "width": 100,
        "x": 0,
        "y": 50,
      },
      "footer": {
        "height": 120,
        "width": 200,
        "x": 100,
        "y": 50,
      },
      "header": {
        "height": 50,
        "width": 100,
        "x": 0,
        "y": 0,
      },
      "sidebar": {
        "height": 50,
        "width": 200,
        "x": 100,
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
          "key": "header",
          "row": 0,
          "rowSpan": 1,
        },
        {
          "column": 1,
          "columnSpan": 1,
          "key": "sidebar",
          "row": 0,
          "rowSpan": 1,
        },
        {
          "column": 0,
          "columnSpan": 1,
          "key": "content",
          "row": 1,
          "rowSpan": 1,
        },
        {
          "column": 1,
          "columnSpan": 1,
          "key": "footer",
          "row": 1,
          "rowSpan": 1,
        },
      ],
      "columnSizes": [
        100,
        200,
      ],
      "rowSizes": [
        50,
        120,
        30,
      ],
    }
  `)
  expect(outputViz).toMatchSvgSnapshot(import.meta.path)

  if (!process.env.BUN_UPDATE_SNAPSHOTS) {
    expect(laidOutResult).toEqual(browserResult)
  }
})