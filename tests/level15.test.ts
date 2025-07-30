import { expect, test } from "bun:test"
import level15 from "testcases/level15"
import browserResult from "testcases/level15.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level15", () => {
  const { laidOutResult, outputViz, layout } = testGrid(level15, browserResult)

  expect(browserResult).toMatchInlineSnapshot(`
    {
      "center-item": {
        "height": 14,
        "width": 42,
        "x": 0,
        "y": 186,
      },
      "end-item": {
        "height": 22,
        "width": 32,
        "x": 200,
        "y": 78,
      },
      "start-item": {
        "height": 32,
        "width": 52,
        "x": 0,
        "y": 68,
      },
      "stretch-item": {
        "height": 42,
        "width": 26,
        "x": 200,
        "y": 158,
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
          "height": 100,
          "key": "start-item",
          "row": 0,
          "rowSpan": 1,
          "width": 200,
          "x": 0,
          "y": 0,
        },
        {
          "column": 1,
          "columnSpan": 1,
          "height": 100,
          "key": "end-item",
          "row": 0,
          "rowSpan": 1,
          "width": 200,
          "x": 200,
          "y": 0,
        },
        {
          "column": 0,
          "columnSpan": 1,
          "height": 100,
          "key": "center-item",
          "row": 1,
          "rowSpan": 1,
          "width": 200,
          "x": 0,
          "y": 100,
        },
        {
          "column": 1,
          "columnSpan": 1,
          "height": 100,
          "key": "stretch-item",
          "row": 1,
          "rowSpan": 1,
          "width": 200,
          "x": 200,
          "y": 100,
        },
      ],
      "columnGap": 0,
      "columnSizes": [
        200,
        200,
      ],
      "itemCoordinates": {
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
      },
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
