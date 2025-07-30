import { expect, test } from "bun:test"
import level15 from "testcases/level15"
import browserResult from "testcases/level15.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level15", () => {
  const { laidOutResult, outputViz, layout } = testGrid(level15, browserResult)

  expect(browserResult).toMatchInlineSnapshot(`
    {
      "center-item": {
        "height": 7,
        "width": 55,
        "x": 0,
        "y": 193,
      },
      "end-item": {
        "height": 7,
        "width": 40,
        "x": 200,
        "y": 93,
      },
      "start-item": {
        "height": 7,
        "width": 50,
        "x": 0,
        "y": 93,
      },
      "stretch-item": {
        "height": 7,
        "width": 60,
        "x": 200,
        "y": 193,
      },
    }
  `)
  expect(laidOutResult).toMatchInlineSnapshot(`
    {
      "center-item": {
        "height": 100,
        "width": 200,
        "x": 0,
        "y": 100,
      },
      "end-item": {
        "height": 100,
        "width": 200,
        "x": 200,
        "y": 0,
      },
      "start-item": {
        "height": 100,
        "width": 200,
        "x": 0,
        "y": 0,
      },
      "stretch-item": {
        "height": 100,
        "width": 200,
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
          "columnSpan": 1,
          "key": "start-item",
          "row": 0,
          "rowSpan": 1,
        },
        {
          "column": 1,
          "columnSpan": 1,
          "key": "end-item",
          "row": 0,
          "rowSpan": 1,
        },
        {
          "column": 0,
          "columnSpan": 1,
          "key": "center-item",
          "row": 1,
          "rowSpan": 1,
        },
        {
          "column": 1,
          "columnSpan": 1,
          "key": "stretch-item",
          "row": 1,
          "rowSpan": 1,
        },
      ],
      "columnGap": 0,
      "columnSizes": [
        200,
        200,
      ],
      "rowGap": 0,
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
