import { expect, test } from "bun:test"
import level24 from "testcases/level24"
import browserResult from "testcases/level24.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level24", () => {
  const { laidOutResult, outputViz, layout } = testGrid(level24, browserResult)

  expect(browserResult).toMatchInlineSnapshot(`
    {
      "poison": {
        "height": 20,
        "width": 48,
        "x": 100,
        "y": 0,
      },
      "water": {
        "height": 20,
        "width": 100,
        "x": 0,
        "y": 0,
      },
      "water-2": {
        "height": 20,
        "width": 40,
        "x": 148,
        "y": 0,
      },
    }
  `)
  expect(laidOutResult).toMatchInlineSnapshot(`
    {
      "poison": {
        "height": 20,
        "width": 48,
        "x": 124,
        "y": 10,
      },
      "water": {
        "height": 20,
        "width": 100,
        "x": 50,
        "y": 10,
      },
      "water-2": {
        "height": 20,
        "width": 40,
        "x": 168,
        "y": 10,
      },
    }
  `)
  expect(layout).toMatchInlineSnapshot(`
    {
      "cells": [
        {
          "column": 0,
          "columnSpan": 1,
          "key": "water",
          "row": 0,
          "rowSpan": 1,
        },
        {
          "column": 1,
          "columnSpan": 1,
          "key": "poison",
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
      ],
      "columnSizes": [
        100,
        48,
        40,
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