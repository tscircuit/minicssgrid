# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Testing

- `bun test` - Run all tests
- `bun test <pattern>` - Run tests matching pattern
- `bun test path/to/test` - Run specific test

### Formatting & Linting

- `bun run format` - Format code with Biome
- `bun run format:check` - Check formatting without making changes

### Package Management

Use `bun` instead of npm/yarn/pnpm for all package management operations:

- `bun install` - Install dependencies
- `bun add <package>` - Add dependency
- `bun remove <package>` - Remove dependency

## Architecture

This is a TypeScript library (`@tscircuit/minigrid`) that implements a CSS Grid layout engine.

### Core Structure

- `lib/CssGrid.ts` - Main CssGrid class with layout computation and HTML conversion
- `lib/types.ts` - TypeScript interfaces and type definitions for grid configuration
- `lib/index.ts` - Main export file

### Key Classes & Types

- `CssGrid` class - Core grid implementation with `layout()`, `convertToHtml()`, and `visualize()` methods
- `CssGridOptions` interface - Configuration for grid container and items
- `GridItem` interface - Individual grid item configuration with positioning
- `GridCell` interface - Final computed position of grid items

### Testing Structure

- Test files use Bun's built-in test runner
- Tests are in `tests/` directory with corresponding testcases in `testcases/`
- Import pattern: `import { expect, test } from "bun:test"`

### Configuration

- Uses Biome for formatting and linting (configured in `biome.json`)
- TypeScript configuration in `tsconfig.json` with strict mode enabled
- Path aliases configured: `lib/*`, `tests/*`, `testcases/*`
