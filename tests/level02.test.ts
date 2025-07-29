import { expect, test } from "bun:test"
import level2 from "testcases/level02"
import browserResult from "testcases/level02.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level02", () => {
  const { laidOutResult, outputViz, layout } = testGrid(level2, browserResult)

  expect(browserResult).toMatchInlineSnapshot(`
    {
      "poison": {
        "height": 20,
        "width": 20,
        "x": 80,
        "y": 0,
      },
    }
  `)
  expect(laidOutResult).toMatchInlineSnapshot(`
    {
      "poison": {
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
