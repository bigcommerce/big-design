---
"@bigcommerce/big-design": patch
"@bigcommerce/big-design-icons": patch
"@bigcommerce/big-design-patterns": patch
"@bigcommerce/big-design-theme": patch
"@bigcommerce/docs": patch
---

Fix a long-standing bug where TypeScript-only type imports (e.g. `Border`, `ThemeOptions`, `Colors`) were compiled into the ESM build (`dist/es`) as runtime import specifiers for bindings that don't actually exist at runtime. Babel's default type-import elision wasn't catching these, since they were never marked `import type`. This was silently tolerated by CJS consumers and lenient/non-validating bundlers, but crashes any strict-ESM bundler that validates named exports (Vite/Rollup/Rolldown, or webpack with `strictExportPresence`) — found via the LTRAC-1370 packed-tarball smoke test against store-control-panel's Vite 8 build. All 4 packages' type-only imports are now explicitly marked, and `@typescript-eslint/consistent-type-imports` is enabled repo-wide to prevent this from regressing.
