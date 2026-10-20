import { expect, test } from "bun:test"
import {
  BENCHMARK_SCENARIOS,
  formatBenchmarkTable,
  runBenchmarks,
} from "../benchmarks/benchmark"

test("benchmark suite runs all scenarios and formats markdown table", () => {
  const results = runBenchmarks(200)
  expect(results).toHaveLength(BENCHMARK_SCENARIOS.length)

  for (const res of results) {
    expect(res.iterations).toBe(200)
    expect(res.avgUs).toBeGreaterThan(0)
    expect(res.opsPerSec).toBeGreaterThan(1000)
  }

  const table = formatBenchmarkTable(results)
  expect(table).toContain("Simple 2x2 Grid (4 items)")
  expect(table).toContain("ops/s")
})
