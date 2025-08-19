import { expect, test } from "bun:test"
import level18 from "testcases/level18"
import browserResult from "testcases/level18.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level18", () => {
  const { laidOutResult, outputViz, layout } = testGrid(level18, browserResult)

  expect(browserResult).toMatchInlineSnapshot(`
    {
      "water": {
        "height": 100,
        "width": 20,
        "x": 40,
        "y": 0,
      },
    }
  `)
  expect(laidOutResult).toMatchInlineSnapshot(`
    {
      "water": {
        "height": 100,
        "width": 20,
        "x": 40,
        "y": 0,
      },
    }
  `)

  expect(layout).toMatchInlineSnapshot(`
    {
      "cells": [
        {
          "column": 2,
          "columnSpan": 1,
          "height": 100,
          "key": "water",
          "row": 0,
          "rowSpan": 1,
          "width": 20,
          "x": 40,
          "y": 0,
        },
      ],
      "columnGap": 0,
      "columnSizes": [
        20,
        20,
        20,
        20,
        20,
      ],
      "itemCoordinates": {
        "water": {
          "height": 100,
          "width": 20,
          "x": 40,
          "y": 0,
        },
      },
      "rowGap": 0,
      "rowSizes": [
        100,
      ],
    }
  `)
  expect(outputViz).toMatchSvgSnapshot(import.meta.path)

  if (!process.env.BUN_UPDATE_SNAPSHOTS) {
    expect(laidOutResult).toEqual(browserResult)
  }
})