import { expect, test } from "bun:test"
import level19 from "testcases/level19"
import browserResult from "testcases/level19.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level19", () => {
  const { laidOutResult, outputViz, layout } = testGrid(level19, browserResult)


  expect(browserResult).toMatchInlineSnapshot(`
    {
      "poison-1": {
        "height": 20,
        "width": 20,
        "x": 20,
        "y": 0,
      },
      "poison-2": {
        "height": 20,
        "width": 20,
        "x": 60,
        "y": 0,
      },
      "poison-3": {
        "height": 20,
        "width": 20,
        "x": 0,
        "y": 20,
      },
      "poison-4": {
        "height": 20,
        "width": 20,
        "x": 40,
        "y": 20,
      },
      "poison-5": {
        "height": 20,
        "width": 20,
        "x": 80,
        "y": 20,
      },
      "water-1": {
        "height": 20,
        "width": 20,
        "x": 0,
        "y": 0,
      },
      "water-2": {
        "height": 20,
        "width": 20,
        "x": 40,
        "y": 0,
      },
      "water-3": {
        "height": 20,
        "width": 20,
        "x": 80,
        "y": 0,
      },
      "water-4": {
        "height": 20,
        "width": 20,
        "x": 20,
        "y": 20,
      },
      "water-5": {
        "height": 20,
        "width": 20,
        "x": 60,
        "y": 20,
      },
    }
  `)
  expect(laidOutResult).toMatchInlineSnapshot(`
    {
      "poison-1": {
        "height": 20,
        "width": 20,
        "x": 30,
        "y": 10,
      },
      "poison-2": {
        "height": 20,
        "width": 20,
        "x": 70,
        "y": 10,
      },
      "poison-3": {
        "height": 20,
        "width": 20,
        "x": 10,
        "y": 30,
      },
      "poison-4": {
        "height": 20,
        "width": 20,
        "x": 50,
        "y": 30,
      },
      "poison-5": {
        "height": 20,
        "width": 20,
        "x": 90,
        "y": 30,
      },
      "water-1": {
        "height": 20,
        "width": 20,
        "x": 10,
        "y": 10,
      },
      "water-2": {
        "height": 20,
        "width": 20,
        "x": 50,
        "y": 10,
      },
      "water-3": {
        "height": 20,
        "width": 20,
        "x": 90,
        "y": 10,
      },
      "water-4": {
        "height": 20,
        "width": 20,
        "x": 30,
        "y": 30,
      },
      "water-5": {
        "height": 20,
        "width": 20,
        "x": 70,
        "y": 30,
      },
    }
  `)
  expect(layout).toMatchInlineSnapshot(`
    {
      "cells": [
        {
          "column": 0,
          "columnSpan": 1,
          "key": "water-1",
          "row": 0,
          "rowSpan": 1,
        },
        {
          "column": 1,
          "columnSpan": 1,
          "key": "poison-1",
          "row": 0,
          "rowSpan": 1,
        },
        {
          "column": 2,
          "columnSpan": 1,
          "key": "water-2",
          "row": 0,
          "rowSpan": 1,
        },
        {
          "column": 3,
          "columnSpan": 1,
          "key": "poison-2",
          "row": 0,
          "rowSpan": 1,
        },
        {
          "column": 4,
          "columnSpan": 1,
          "key": "water-3",
          "row": 0,
          "rowSpan": 1,
        },
        {
          "column": 0,
          "columnSpan": 1,
          "key": "poison-3",
          "row": 1,
          "rowSpan": 1,
        },
        {
          "column": 1,
          "columnSpan": 1,
          "key": "water-4",
          "row": 1,
          "rowSpan": 1,
        },
        {
          "column": 2,
          "columnSpan": 1,
          "key": "poison-4",
          "row": 1,
          "rowSpan": 1,
        },
        {
          "column": 3,
          "columnSpan": 1,
          "key": "water-5",
          "row": 1,
          "rowSpan": 1,
        },
        {
          "column": 4,
          "columnSpan": 1,
          "key": "poison-5",
          "row": 1,
          "rowSpan": 1,
        },
      ],
      "columnSizes": [
        20,
        20,
        20,
        20,
        20,
      ],
      "rowSizes": [
        20,
        20,
        20,
        20,
        20,
      ],
    }
  `)

  expect(outputViz).toMatchSvgSnapshot(import.meta.path)
})