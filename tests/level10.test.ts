import { expect, test } from "bun:test"
import level10 from "testcases/level10"
import browserResult from "testcases/level10.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level10", () => {
  const { laidOutResult, outputViz, layout } = testGrid(level10, browserResult)

  expect(browserResult).toMatchInlineSnapshot(`
    {
      "first": {
        "height": 98,
        "width": 98,
        "x": 1,
        "y": 1,
      },
      "fourth": {
        "height": 98,
        "width": 98,
        "x": 301,
        "y": 1,
      },
      "second": {
        "height": 98,
        "width": 98,
        "x": 101,
        "y": 1,
      },
      "third": {
        "height": 98,
        "width": 98,
        "x": 201,
        "y": 1,
      },
    }
  `)
  expect(laidOutResult).toMatchInlineSnapshot(`
    {
      "first": {
        "height": 100,
        "width": 100,
        "x": 0,
        "y": 0,
      },
      "fourth": {
        "height": 100,
        "width": 100,
        "x": 300,
        "y": 0,
      },
      "second": {
        "height": 100,
        "width": 100,
        "x": 100,
        "y": 0,
      },
      "third": {
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
          "height": 100,
          "key": "first",
          "row": 0,
          "rowSpan": 1,
          "width": 100,
          "x": 0,
          "y": 0,
        },
        {
          "column": 1,
          "columnSpan": 1,
          "height": 100,
          "key": "second",
          "row": 0,
          "rowSpan": 1,
          "width": 100,
          "x": 100,
          "y": 0,
        },
        {
          "column": 2,
          "columnSpan": 1,
          "height": 100,
          "key": "third",
          "row": 0,
          "rowSpan": 1,
          "width": 100,
          "x": 200,
          "y": 0,
        },
        {
          "column": 3,
          "columnSpan": 1,
          "height": 100,
          "key": "fourth",
          "row": 0,
          "rowSpan": 1,
          "width": 100,
          "x": 300,
          "y": 0,
        },
      ],
      "columnGap": 0,
      "columnSizes": [
        100,
        100,
        100,
        100,
      ],
      "itemCoordinates": {
        "first": {
          "height": 100,
          "width": 100,
          "x": 0,
          "y": 0,
        },
        "fourth": {
          "height": 100,
          "width": 100,
          "x": 300,
          "y": 0,
        },
        "second": {
          "height": 100,
          "width": 100,
          "x": 100,
          "y": 0,
        },
        "third": {
          "height": 100,
          "width": 100,
          "x": 200,
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
