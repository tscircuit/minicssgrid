import { expect, test } from "bun:test"
import level04 from "testcases/level04"
import browserResult from "testcases/level04.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level04", () => {
  const { laidOutResult, outputViz, layout } = testGrid(level04, browserResult)

  expect(browserResult).toMatchInlineSnapshot(`
    {
      "content": {
        "height": 118,
        "width": 98,
        "x": 1,
        "y": 51,
      },
      "footer": {
        "height": 118,
        "width": 198,
        "x": 101,
        "y": 51,
      },
      "header": {
        "height": 48,
        "width": 98,
        "x": 1,
        "y": 1,
      },
      "sidebar": {
        "height": 48,
        "width": 198,
        "x": 101,
        "y": 1,
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
          "height": 50,
          "key": "header",
          "row": 0,
          "rowSpan": 1,
          "width": 100,
          "x": 0,
          "y": 0,
        },
        {
          "column": 1,
          "columnSpan": 1,
          "height": 50,
          "key": "sidebar",
          "row": 0,
          "rowSpan": 1,
          "width": 200,
          "x": 100,
          "y": 0,
        },
        {
          "column": 0,
          "columnSpan": 1,
          "height": 120,
          "key": "content",
          "row": 1,
          "rowSpan": 1,
          "width": 100,
          "x": 0,
          "y": 50,
        },
        {
          "column": 1,
          "columnSpan": 1,
          "height": 120,
          "key": "footer",
          "row": 1,
          "rowSpan": 1,
          "width": 200,
          "x": 100,
          "y": 50,
        },
      ],
      "columnGap": 0,
      "columnSizes": [
        100,
        200,
      ],
      "itemCoordinates": {
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
      },
      "rowGap": 0,
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
