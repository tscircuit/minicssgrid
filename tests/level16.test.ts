import { expect, test } from "bun:test"
import level16 from "testcases/level16"
import browserResult from "testcases/level16.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level16", () => {
  const { laidOutResult, outputViz, layout } = testGrid(level16, browserResult)

  expect(browserResult).toMatchInlineSnapshot(`
    {
      "content": {
        "height": 239,
        "width": 198,
        "x": 101,
        "y": 51,
      },
      "footer": {
        "height": 7,
        "width": 298,
        "x": 1,
        "y": 292,
      },
      "header": {
        "height": 48,
        "width": 298,
        "x": 1,
        "y": 1,
      },
      "sidebar": {
        "height": 189,
        "width": 98,
        "x": 1,
        "y": 51,
      },
    }
  `)
  expect(laidOutResult).toMatchInlineSnapshot(`
    {
      "content": {
        "height": 250,
        "width": 200,
        "x": 100,
        "y": 50,
      },
      "footer": {
        "height": 50,
        "width": 300,
        "x": 0,
        "y": 250,
      },
      "header": {
        "height": 50,
        "width": 300,
        "x": 0,
        "y": 0,
      },
      "sidebar": {
        "height": 200,
        "width": 100,
        "x": 0,
        "y": 50,
      },
    }
  `)

  expect(layout).toMatchInlineSnapshot(`
    {
      "cells": [
        {
          "column": 0,
          "columnSpan": 2,
          "height": 50,
          "key": "header",
          "row": 0,
          "rowSpan": 1,
          "width": 300,
          "x": 0,
          "y": 0,
        },
        {
          "column": 0,
          "columnSpan": 1,
          "height": 200,
          "key": "sidebar",
          "row": 1,
          "rowSpan": 1,
          "width": 100,
          "x": 0,
          "y": 50,
        },
        {
          "column": 1,
          "columnSpan": 1,
          "height": 250,
          "key": "content",
          "row": 1,
          "rowSpan": 2,
          "width": 200,
          "x": 100,
          "y": 50,
        },
        {
          "column": 0,
          "columnSpan": 2,
          "height": 50,
          "key": "footer",
          "row": 2,
          "rowSpan": 1,
          "width": 300,
          "x": 0,
          "y": 250,
        },
      ],
      "columnGap": 0,
      "columnSizes": [
        100,
        200,
      ],
      "itemCoordinates": {
        "content": {
          "height": 250,
          "width": 200,
          "x": 100,
          "y": 50,
        },
        "footer": {
          "height": 50,
          "width": 300,
          "x": 0,
          "y": 250,
        },
        "header": {
          "height": 50,
          "width": 300,
          "x": 0,
          "y": 0,
        },
        "sidebar": {
          "height": 200,
          "width": 100,
          "x": 0,
          "y": 50,
        },
      },
      "rowGap": 0,
      "rowSizes": [
        50,
        200,
        50,
      ],
    }
  `)
  expect(outputViz).toMatchSvgSnapshot(import.meta.path)

  if (!process.env.BUN_UPDATE_SNAPSHOTS) {
    expect(laidOutResult).toEqual(browserResult)
  }
})
