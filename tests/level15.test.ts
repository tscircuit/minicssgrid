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
        "height": 12,
        "width": 40,
        "x": 0,
        "y": 188,
      },
      "end-item": {
        "height": 20,
        "width": 30,
        "x": 200,
        "y": 80,
      },
      "start-item": {
        "height": 30,
        "width": 50,
        "x": 0,
        "y": 70,
      },
      "stretch-item": {
        "height": 40,
        "width": 24,
        "x": 200,
        "y": 160,
      },
    }
  `)

  expect(layout).toMatchInlineSnapshot(`
    {
      "cells": [
        {
          "column": 0,
          "columnSpan": 1,
          "height": 30,
          "key": "start-item",
          "row": 0,
          "rowSpan": 1,
          "width": 50,
          "x": 0,
          "y": 70,
        },
        {
          "column": 1,
          "columnSpan": 1,
          "height": 20,
          "key": "end-item",
          "row": 0,
          "rowSpan": 1,
          "width": 30,
          "x": 200,
          "y": 80,
        },
        {
          "column": 0,
          "columnSpan": 1,
          "height": 12,
          "key": "center-item",
          "row": 1,
          "rowSpan": 1,
          "width": 40,
          "x": 0,
          "y": 188,
        },
        {
          "column": 1,
          "columnSpan": 1,
          "height": 40,
          "key": "stretch-item",
          "row": 1,
          "rowSpan": 1,
          "width": 24,
          "x": 200,
          "y": 160,
        },
      ],
      "columnGap": 0,
      "columnSizes": [
        200,
        200,
      ],
      "itemCoordinates": {
        "center-item": {
          "height": 12,
          "width": 40,
          "x": 0,
          "y": 188,
        },
        "end-item": {
          "height": 20,
          "width": 30,
          "x": 200,
          "y": 80,
        },
        "start-item": {
          "height": 30,
          "width": 50,
          "x": 0,
          "y": 70,
        },
        "stretch-item": {
          "height": 40,
          "width": 24,
          "x": 200,
          "y": 160,
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
