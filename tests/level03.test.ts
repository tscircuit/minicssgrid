import { expect, test } from "bun:test"
import level03 from "testcases/level03"
import browserResult from "testcases/level03.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level03", () => {
  const { laidOutResult, outputViz, layout } = testGrid(level03, browserResult)

  expect(browserResult).toMatchInlineSnapshot(`
    {
      "item1": {
        "height": 100,
        "width": 100,
        "x": 0,
        "y": 0,
      },
      "item2": {
        "height": 100,
        "width": 100,
        "x": 100,
        "y": 0,
      },
      "item3": {
        "height": 100,
        "width": 100,
        "x": 0,
        "y": 100,
      },
      "item4": {
        "height": 100,
        "width": 100,
        "x": 100,
        "y": 100,
      },
    }
  `)
  expect(laidOutResult).toMatchInlineSnapshot(`
    {
      "item1": {
        "height": 100,
        "width": 100,
        "x": 0,
        "y": 0,
      },
      "item2": {
        "height": 100,
        "width": 100,
        "x": 100,
        "y": 0,
      },
      "item3": {
        "height": 100,
        "width": 100,
        "x": 0,
        "y": 100,
      },
      "item4": {
        "height": 100,
        "width": 100,
        "x": 100,
        "y": 100,
      },
    }
  `)

  expect(layout).toMatchInlineSnapshot(`
    {
      "cells": [
        {
          "column": 0,
          "columnSpan": 1,
          "key": "item1",
          "row": 0,
          "rowSpan": 1,
        },
        {
          "column": 1,
          "columnSpan": 1,
          "key": "item2",
          "row": 0,
          "rowSpan": 1,
        },
        {
          "column": 0,
          "columnSpan": 1,
          "key": "item3",
          "row": 1,
          "rowSpan": 1,
        },
        {
          "column": 1,
          "columnSpan": 1,
          "key": "item4",
          "row": 1,
          "rowSpan": 1,
        },
      ],
      "columnSizes": [
        100,
        100,
      ],
      "rowSizes": [
        100,
        100,
      ],
    }
  `)
  expect(outputViz).toMatchSvgSnapshot(import.meta.path)

  if (!process.env.BUN_UPDATE_SNAPSHOTS) {
    expect(laidOutResult).toEqual(browserResult)
  }
})