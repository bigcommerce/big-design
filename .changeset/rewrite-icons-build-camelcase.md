---
'@bigcommerce/big-design-icons': patch
---

build(deps): rewrite `scripts/build.js` off `camelcase` 6, upgrade to `camelcase` 9.0.0

`camelcase` went ESM-only starting at v7, breaking the script's plain `require('camelcase')` with `ERR_REQUIRE_ESM` — a straight version bump wasn't possible. The script is renamed to `scripts/build.mjs` and rewritten as a native ES module (static `import`s, top-level `await`, `import.meta.dirname` in place of `__dirname`).

The package's `lint` script now passes `--ext .js,.mjs` so the new `.mjs` file is covered by ESLint, and `.eslintrc.js` adds an override requiring file extensions on relative imports in `.mjs` files (native ESM needs them; the base config forbids them for `.js`). Dev-only icon build tooling; no shipped-artifact or consumer impact.
