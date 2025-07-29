import { expect, test } from "bun:test"
import level1 from "testcases/level01"
import browserResult from "testcases/level01.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level01", () => {
  const { laidOutResult, outputViz, layout } = testGrid(level1, browserResult)

  expect(browserResult).toMatchInlineSnapshot(`
    {
      "water": {
        "height": 20,
        "width": 20,
        "x": 40,
        "y": 0,
      },
    }
  `)
  expect(laidOutResult).toMatchInlineSnapshot(`
    {
      "water": {
        "height": 20,
        "width": 20,
        "x": 10,
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
