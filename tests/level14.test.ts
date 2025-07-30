import { expect, test } from "bun:test"
import level14 from "testcases/level14"
import browserResult from "testcases/level14.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level14", () => {
  const { laidOutResult, outputViz, layout } = testGrid(level14, browserResult)

  expect(browserResult).toMatchInlineSnapshot(`
    {
      "background": {
        "height": 300,
        "width": 300,
        "x": 0,
        "y": 0,
      },
      "corner": {
        "height": 100,
        "width": 100,
        "x": 200,
        "y": 200,
      },
      "overlay1": {
        "height": 200,
        "width": 200,
        "x": 0,
        "y": 0,
      },
      "overlay2": {
        "height": 200,
        "width": 200,
        "x": 100,
        "y": 100,
      },
    }
  `)
  expect(laidOutResult).toMatchInlineSnapshot(`
    {
      "background": {
        "height": 300,
        "width": 300,
        "x": 0,
        "y": 0,
      },
      "corner": {
        "height": 100,
        "width": 100,
        "x": 200,
        "y": 200,
      },
      "overlay1": {
        "height": 200,
        "width": 200,
        "x": 0,
        "y": 0,
      },
      "overlay2": {
        "height": 200,
        "width": 200,
        "x": 100,
        "y": 100,
      },
    }
  `)

  expect(layout).toMatchInlineSnapshot(`
    {
      "cells": [
        {
          "column": 0,
          "columnSpan": 3,
          "height": 300,
          "key": "background",
          "row": 0,
          "rowSpan": 3,
          "width": 300,
          "x": 0,
          "y": 0,
        },
        {
          "column": 0,
          "columnSpan": 2,
          "height": 200,
          "key": "overlay1",
          "row": 0,
          "rowSpan": 2,
          "width": 200,
          "x": 0,
          "y": 0,
        },
        {
          "column": 1,
          "columnSpan": 2,
          "height": 200,
          "key": "overlay2",
          "row": 1,
          "rowSpan": 2,
          "width": 200,
          "x": 100,
          "y": 100,
        },
        {
          "column": 2,
          "columnSpan": 1,
          "height": 100,
          "key": "corner",
          "row": 2,
          "rowSpan": 1,
          "width": 100,
          "x": 200,
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
        "background": {
          "height": 300,
          "width": 300,
          "x": 0,
          "y": 0,
        },
        "corner": {
          "height": 100,
          "width": 100,
          "x": 200,
          "y": 200,
        },
        "overlay1": {
          "height": 200,
          "width": 200,
          "x": 0,
          "y": 0,
        },
        "overlay2": {
          "height": 200,
          "width": 200,
          "x": 100,
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
