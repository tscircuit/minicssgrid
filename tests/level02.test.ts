import { expect, test } from "bun:test"
import level02 from "testcases/level02"
import browserResult from "testcases/level02.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level02", () => {
  const { laidOutResult, outputViz, layout } = testGrid(level02, browserResult)

  expect(browserResult).toMatchInlineSnapshot(`
    {
      "water": {
        "height": 20,
        "width": 20,
        "x": 0,
        "y": 40,
      },
    }
  `)
  expect(laidOutResult).toMatchInlineSnapshot(`
    {
      "water": {
        "height": 20,
        "width": 20,
        "x": 0,
        "y": 40,
      },
    }
  `)
  expect(laidOutResult).toEqual(browserResult)
  expect(layout).toMatchInlineSnapshot(`
    {
      "cells": [
        {
          "column": 0,
          "columnSpan": 1,
          "key": "water",
          "row": 2,
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
