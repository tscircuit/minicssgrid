import { expect, test } from "bun:test"
import level11 from "testcases/level11"
import browserResult from "testcases/level11.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level11", () => {
  const { laidOutResult, outputViz, layout } = testGrid(level11, browserResult)

  expect(browserResult).toMatchInlineSnapshot(`
    {
      "another-item": {
        "height": 27,
        "width": 32,
        "x": 134,
        "y": 36.5,
      },
      "center-item": {
        "height": 27,
        "width": 32,
        "x": 34,
        "y": 36.5,
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
          "height": 100,
          "key": "center-item",
          "row": 0,
          "rowSpan": 1,
          "width": 100,
          "x": 0,
          "y": 0,
        },
        {
          "column": 1,
          "columnSpan": 1,
          "height": 100,
          "key": "another-item",
          "row": 0,
          "rowSpan": 1,
          "width": 100,
          "x": 100,
          "y": 0,
        },
      ],
      "columnGap": 0,
      "columnSizes": [
        100,
        100,
      ],
      "itemCoordinates": {
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
