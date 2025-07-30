import { expect, test } from "bun:test"
import level09 from "testcases/level09"
import browserResult from "testcases/level09.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level09", () => {
  const { laidOutResult, outputViz, layout } = testGrid(level09, browserResult)

  expect(browserResult).toMatchInlineSnapshot(`
    {
      "big": {
        "height": 198,
        "width": 198,
        "x": 1,
        "y": 1,
      },
      "bottom": {
        "height": 98,
        "width": 298,
        "x": 1,
        "y": 201,
      },
      "small1": {
        "height": 98,
        "width": 98,
        "x": 201,
        "y": 1,
      },
      "small2": {
        "height": 98,
        "width": 98,
        "x": 201,
        "y": 101,
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
          "height": 200,
          "key": "big",
          "row": 0,
          "rowSpan": 2,
          "width": 200,
          "x": 0,
          "y": 0,
        },
        {
          "column": 2,
          "columnSpan": 1,
          "height": 100,
          "key": "small1",
          "row": 0,
          "rowSpan": 1,
          "width": 100,
          "x": 200,
          "y": 0,
        },
        {
          "column": 2,
          "columnSpan": 1,
          "height": 100,
          "key": "small2",
          "row": 1,
          "rowSpan": 1,
          "width": 100,
          "x": 200,
          "y": 100,
        },
        {
          "column": 0,
          "columnSpan": 3,
          "height": 100,
          "key": "bottom",
          "row": 2,
          "rowSpan": 1,
          "width": 300,
          "x": 0,
          "y": 200,
        },
      ],
      "columnGap": 0,
      "columnSizes": [
        100,
        100,
        100,
      ],
      "itemCoordinates": {
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
      },
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
