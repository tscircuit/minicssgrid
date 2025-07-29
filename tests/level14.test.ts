import { expect, test } from "bun:test"
import level14 from "testcases/level14"
import browserResult from "testcases/level14.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level14", () => {
  const { laidOutResult, outputViz, layout } = testGrid(level14, browserResult)

  expect(browserResult).toMatchInlineSnapshot(`
    {
      "poison": {
        "height": 20,
        "width": 20,
        "x": 20,
        "y": 80,
      },
    }
  `)
  expect(laidOutResult).toMatchInlineSnapshot(`
    {
      "poison": {
        "height": 20,
        "width": 20,
        "x": 20,
        "y": 80,
      },
    }
  `)
  expect(layout).toMatchInlineSnapshot(`
    {
      "cells": [
        {
          "column": 1,
          "columnSpan": 1,
          "key": "poison",
          "row": 4,
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
