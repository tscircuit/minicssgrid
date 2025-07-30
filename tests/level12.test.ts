import { expect, test } from "bun:test"
import level12 from "testcases/level12"
import browserResult from "testcases/level12.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level12", () => {
  const { laidOutResult, outputViz, layout } = testGrid(level12, browserResult)

  expect(browserResult).toMatchInlineSnapshot(`
    {
      "auto-width": {
        "height": 100,
        "width": 52,
        "x": 0,
        "y": 0,
      },
      "fixed-width": {
        "height": 100,
        "width": 100,
        "x": 52,
        "y": 0,
      },
      "flexible": {
        "height": 100,
        "width": 148,
        "x": 152,
        "y": 0,
      },
    }
  `)
  expect(laidOutResult).toMatchInlineSnapshot(`
    {
      "auto-width": {
        "height": 100,
        "width": 100,
        "x": 0,
        "y": 0,
      },
      "fixed-width": {
        "height": 100,
        "width": 100,
        "x": 100,
        "y": 0,
      },
      "flexible": {
        "height": 100,
        "width": 100,
        "x": 200,
        "y": 0,
      },
    }
  `)

  expect(layout).toMatchInlineSnapshot(`
    {
      "cells": [
        {
          "column": 0,
          "columnSpan": 1,
          "key": "auto-width",
          "row": 0,
          "rowSpan": 1,
        },
        {
          "column": 1,
          "columnSpan": 1,
          "key": "fixed-width",
          "row": 0,
          "rowSpan": 1,
        },
        {
          "column": 2,
          "columnSpan": 1,
          "key": "flexible",
          "row": 0,
          "rowSpan": 1,
        },
      ],
      "columnGap": 0,
      "columnSizes": [
        100,
        100,
        100,
      ],
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
