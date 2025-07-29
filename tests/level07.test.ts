import { expect, test } from "bun:test"
import level7 from "testcases/level07"
import browserResult from "testcases/level07.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level07", () => {
  const { laidOutResult, outputViz, layout } = testGrid(level7, browserResult)

  expect(browserResult).toMatchInlineSnapshot(`
    {
      "water": {
        "height": 20,
        "width": 40,
        "x": 20,
        "y": 0,
      },
    }
  `)
  expect(laidOutResult).toMatchInlineSnapshot(`
    {
      "water": {
        "height": 20,
        "width": 40,
        "x": 20,
        "y": 10,
      },
    }
  `)
  expect(layout).toMatchInlineSnapshot(`
    {
      "cells": [
        {
          "column": 0,
          "columnSpan": 2,
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