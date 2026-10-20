import { CssGrid, type CssGridOptions } from "../lib"

export interface BenchmarkScenarioResult {
  name: string
  iterations: number
  totalMs: number
  avgUs: number
  opsPerSec: number
}

export interface BenchmarkScenario {
  name: string
  options: CssGridOptions
}

export const BENCHMARK_SCENARIOS: BenchmarkScenario[] = [
  {
    name: "Simple 2x2 Grid (4 items)",
    options: {
      containerWidth: 200,
      containerHeight: 200,
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "1fr 1fr",
      children: [
        { key: "item1" },
        { key: "item2" },
        { key: "item3" },
        { key: "item4" },
      ],
    },
  },
  {
    name: "3x3 Grid with Gaps & Spans (6 items)",
    options: {
      containerWidth: 300,
      containerHeight: 300,
      gridTemplateColumns: "1fr 2fr 1fr",
      gridTemplateRows: "50px 1fr 50px",
      gap: [10, 20],
      children: [
        { key: "header", columnSpan: 3 },
        { key: "sidebar" },
        { key: "content" },
        { key: "aside" },
        { key: "footer", columnSpan: 3 },
      ],
    },
  },
  {
    name: "Dashboard 4x3 Explicit Placement (5 items)",
    options: {
      containerWidth: 400,
      containerHeight: 300,
      gridTemplateColumns: "repeat(4, 1fr)",
      gridTemplateRows: "repeat(3, 1fr)",
      gap: 12,
      children: [
        { key: "header", columnStart: 1, columnEnd: 5, row: 1 },
        { key: "sidebar", column: 1, rowStart: 2, rowEnd: 4 },
        { key: "main", columnStart: 2, columnEnd: 4, rowStart: 2, rowEnd: 4 },
        { key: "panel1", column: 4, row: 2 },
        { key: "panel2", column: 4, row: 3 },
      ],
    },
  },
  {
    name: "Dense 8x8 Auto-Placed Grid (64 items)",
    options: {
      containerWidth: 800,
      containerHeight: 800,
      gridTemplateColumns: "repeat(8, 1fr)",
      gridTemplateRows: "repeat(8, 1fr)",
      gap: 8,
      children: Array.from({ length: 64 }, (_, i) => ({
        key: `cell_${i + 1}`,
        contentWidth: 40,
        contentHeight: 40,
      })),
    },
  },
]

export function runBenchmarks(iterations = 5000): BenchmarkScenarioResult[] {
  const results: BenchmarkScenarioResult[] = []

  for (const scenario of BENCHMARK_SCENARIOS) {
    // Warmup
    for (let i = 0; i < 100; i++) {
      new CssGrid(scenario.options).layout()
    }

    const start = performance.now()
    for (let i = 0; i < iterations; i++) {
      new CssGrid(scenario.options).layout()
    }
    const totalMs = performance.now() - start
    const avgUs = (totalMs * 1000) / iterations
    const opsPerSec = Math.round((iterations / totalMs) * 1000)

    results.push({
      name: scenario.name,
      iterations,
      totalMs: Number(totalMs.toFixed(2)),
      avgUs: Number(avgUs.toFixed(2)),
      opsPerSec,
    })
  }

  return results
}

export function formatBenchmarkTable(
  results: BenchmarkScenarioResult[],
): string {
  const header =
    "| Scenario | Avg Time (μs) | Throughput (ops/sec) |\n| :--- | ---: | ---: |"
  const rows = results.map(
    (r) =>
      `| ${r.name} | ${r.avgUs.toFixed(2)} μs | ${r.opsPerSec.toLocaleString("en-US")} ops/s |`,
  )
  return [header, ...rows].join("\n")
}

if (import.meta.main) {
  const results = runBenchmarks(5000)
  console.log("## minicssgrid Benchmark Results\n")
  console.log(formatBenchmarkTable(results))
}
