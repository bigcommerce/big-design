---
'@bigcommerce/big-design-icons': patch
---

build(deps): rewrite `scripts/downloader.js` off `inquirer` 8, upgrade to `inquirer` 14.0.2

`inquirer` went ESM-only at v9 and was rearchitected around `@inquirer/prompts`, breaking the `require()` + `inquirer.registerPrompt('autocomplete', ...)` pattern the old script relied on. The script is renamed to `scripts/downloader.mjs` and rewritten as a native ES module (static `import`s, top-level `await`, `import.meta.dirname` in place of `__dirname`).

`inquirer-autocomplete-prompt` is dropped entirely rather than bumped to 3.0.1: that version still peer-depends on `inquirer@^9` and deep-imports internals (e.g. `inquirer/lib/prompts/base.js`) that no longer exist in `inquirer` 14's exports map, so it cannot actually run against the upgraded `inquirer`. Its autocomplete UX is replaced with `inquirer` 14's built-in `search` prompt type, which provides the same async `source`-driven, type-to-filter behavior with no extra dependency.

The package's `lint` script now passes `--ext .js,.mjs` so the new `.mjs` file is covered by ESLint. Dev-only, no consumer or build-output impact.
