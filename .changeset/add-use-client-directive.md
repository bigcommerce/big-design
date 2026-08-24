---
'@bigcommerce/big-design': patch
'@bigcommerce/big-design-icons': patch
'@bigcommerce/big-design-patterns': patch
---

fix: mark `big-design`, `big-design-icons`, and `big-design-patterns` as React Server Components client boundaries

All three packages export components built on `styled-components`, which reads theme context and holds internal state via hooks (`useContext`, `useState`, `useMemo`) at render time — none of that is supported when a component is rendered as a true Server Component. Apps that re-export BigDesign into a React Server Components tree (e.g. Next.js App Router) without an intervening `'use client'` boundary hit a hard runtime error.

Since each package's build emits a per-file compile (not a single bundle), `'use client'` only needs to live on the root `src/index.ts` entry point — the directive on the module a consumer's import resolves to is what establishes the client boundary; files the entry re-exports don't need it themselves.

Babel's CommonJS module transform unconditionally injects `"use strict"` ahead of any existing directive, which would otherwise push `'use client'` out of first position in the `cjs` build. Each package's `babel.config.js` now adds a build override, scoped to `src/index.ts` in the `cjs` build only, that runs an explicit `@babel/plugin-transform-modules-commonjs` with `strictMode: false` for that one file so `'use client'` stays the literal first line. The `es` build is unaffected since it already preserves source directives as-is.

`@bigcommerce/big-design-theme` is untouched — it only exports plain theme tokens and helper functions, no components or hooks, so it has no client/server distinction and works unmodified inside Server Components.
