import { expect, test } from "bun:test"
import level20 from "testcases/level20"
import browserResult from "testcases/level20.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level20", () => {
  const { laidOutResult, outputViz, layout } = testGrid(level20, browserResult)


  expect(browserResult).toMatchInlineSnapshot(`
    {
      "water": {
        "height": 20,
        "width": 50,
        "x": 0,
        "y": 0,
      },
    }
  `)
  expect(laidOutResult).toMatchInlineSnapshot(`
    {
      "water": {
        "height": 20,
        "width": 50,
        "x": 25,
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
        50,
        50,
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