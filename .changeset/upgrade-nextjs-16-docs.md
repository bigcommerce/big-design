---
'@bigcommerce/docs': patch
---

build(deps): upgrade `next` 15.5.21 → 16.3.1 (docs site)

No middleware file or sync dynamic-API usage (`params`/`searchParams`/`cookies()`/`headers()`) exists in this Pages Router, static-export (`output: 'export'`) site, so neither of v16's headline breaking changes applied here.

Turbopack is now the default bundler. `next.config.js`'s custom `webpack()` hook added the unmaintained `jsx-to-string-loader` package to render component source as live code examples; vendored that loader's logic in-repo as `build/jsx-to-string-loader.js` and wired it into `turbopack.rules` instead, dropping the npm dependency entirely. Contained to the internal docs site; no consumer-facing impact.
