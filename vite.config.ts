import { defineConfig } from "vite"
import { resolve } from "path"

export default defineConfig({
  resolve: {
    alias: {
      testcases: resolve(__dirname, "./testcases"),
      tests: resolve(__dirname, "./tests"),
      lib: resolve(__dirname, "./lib"),
    },
  },
})
