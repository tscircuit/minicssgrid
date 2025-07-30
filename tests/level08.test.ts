import { expect, test } from "bun:test"
import level08 from "testcases/level08"
import browserResult from "testcases/level08.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level08", () => {
  const { laidOutResult, outputViz, layout } = testGrid(level08, browserResult)

  expect(browserResult).toMatchInlineSnapshot(`
    {
      "a": {
        "height": 100,
        "width": 100,
        "x": 0,
        "y": 0,
      },
      "b": {
        "height": 100,
        "width": 100,
        "x": 200,
        "y": 100,
      },
      "c": {
        "height": 100,
        "width": 100,
        "x": 100,
        "y": 200,
      },
      "d": {
        "height": 100,
        "width": 100,
        "x": 200,
        "y": 0,
      },
    }
  `)
  expect(laidOutResult).toMatchInlineSnapshot(`
    {
      "a": {
        "height": 100,
        "width": 100,
        "x": 0,
        "y": 0,
      },
      "b": {
        "height": 100,
        "width": 100,
        "x": 200,
        "y": 100,
      },
      "c": {
        "height": 100,
        "width": 100,
        "x": 100,
        "y": 200,
      },
      "d": {
        "height": 100,
        "width": 100,
        "x": 200,
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
          "key": "a",
          "row": 0,
          "rowSpan": 1,
          "width": 100,
          "x": 0,
          "y": 0,
        },
        {
          "column": 2,
          "columnSpan": 1,
          "height": 100,
          "key": "b",
          "row": 1,
          "rowSpan": 1,
          "width": 100,
          "x": 200,
          "y": 100,
        },
        {
          "column": 1,
          "columnSpan": 1,
          "height": 100,
          "key": "c",
          "row": 2,
          "rowSpan": 1,
          "width": 100,
          "x": 100,
          "y": 200,
        },
        {
          "column": 2,
          "columnSpan": 1,
          "height": 100,
          "key": "d",
          "row": 0,
          "rowSpan": 1,
          "width": 100,
          "x": 200,
          "y": 0,
        },
      ],
      "columnGap": 0,
      "columnSizes": [
        100,
        100,
        100,
      ],
      "itemCoordinates": {
        "a": {
          "height": 100,
          "width": 100,
          "x": 0,
          "y": 0,
        },
        "b": {
          "height": 100,
          "width": 100,
          "x": 200,
          "y": 100,
        },
        "c": {
          "height": 100,
          "width": 100,
          "x": 100,
          "y": 200,
        },
        "d": {
          "height": 100,
          "width": 100,
          "x": 200,
          "y": 0,
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
