import { expect, test } from "bun:test"
import level16 from "testcases/level16"
import browserResult from "testcases/level16.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level16", () => {
  const { laidOutResult, outputViz, layout } = testGrid(level16, browserResult)


  expect(browserResult).toMatchInlineSnapshot(`
    {
      "water": {
        "height": 60,
        "width": 80,
        "x": 20,
        "y": 0,
      },
    }
  `)
  expect(laidOutResult).toMatchInlineSnapshot(`
    {
      "water": {
        "height": 60,
        "width": 80,
        "x": 60,
        "y": 30,
      },
    }
  `)
  expect(layout).toMatchInlineSnapshot(`
    {
      "cells": [
        {
          "column": 1,
          "columnSpan": 4,
          "key": "water",
          "row": 0,
          "rowSpan": 3,
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