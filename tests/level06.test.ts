import { expect, test } from "bun:test"
import level6 from "testcases/level06"
import browserResult from "testcases/level06.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level06", () => {
  const { laidOutResult, outputViz, layout } = testGrid(level6, browserResult)

  expect(browserResult).toMatchInlineSnapshot(`
    {
      "poison": {
        "height": 20,
        "width": 20,
        "x": 60,
        "y": 0,
      },
    }
  `)
  expect(laidOutResult).toMatchInlineSnapshot(`
    {
      "poison": {
        "height": 20,
        "width": 20,
        "x": 60,
        "y": 0,
      },
    }
  `)
  expect(layout).toMatchInlineSnapshot(`
    {
      "cells": [
        {
          "column": 3,
          "columnSpan": 1,
          "key": "poison",
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
