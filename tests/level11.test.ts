import { expect, test } from "bun:test"
import level11 from "testcases/level11"
import browserResult from "testcases/level11.browser-result.json"
import { testGrid } from "./fixtures/testGrid"

test("level11", () => {
  const { laidOutResult, outputViz, layout } = testGrid(level11, browserResult)

  expect(browserResult).toMatchInlineSnapshot(`
    {
      "another-item": {
        "height": 25,
        "width": 30,
        "x": 135,
        "y": 37.5,
      },
      "center-item": {
        "height": 25,
        "width": 30,
        "x": 35,
        "y": 37.5,
      },
    }
  `)
  expect(laidOutResult).toMatchInlineSnapshot(`
    {
      "another-item": {
        "height": 25,
        "width": 30,
        "x": 135,
        "y": 37.5,
      },
      "center-item": {
        "height": 25,
        "width": 30,
        "x": 35,
        "y": 37.5,
      },
    }
  `)

  expect(layout).toMatchInlineSnapshot(`
    {
      "cells": [
        {
          "column": 0,
          "columnSpan": 1,
          "height": 25,
          "key": "center-item",
          "row": 0,
          "rowSpan": 1,
          "width": 30,
          "x": 35,
          "y": 37.5,
        },
        {
          "column": 1,
          "columnSpan": 1,
          "height": 25,
          "key": "another-item",
          "row": 0,
          "rowSpan": 1,
          "width": 30,
          "x": 135,
          "y": 37.5,
        },
      ],
      "columnGap": 0,
      "columnSizes": [
        100,
        100,
      ],
      "itemCoordinates": {
        "another-item": {
          "height": 25,
          "width": 30,
          "x": 135,
          "y": 37.5,
        },
        "center-item": {
          "height": 25,
          "width": 30,
          "x": 35,
          "y": 37.5,
        },
      },
      "rowGap": 0,
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
