---
'@bigcommerce/docs': patch
---

build(deps): upgrade `prettier` 2.8.8 → 3.9.6 (docs site)

`CodePreview.tsx` used `prettier/standalone` to format live code samples synchronously. Prettier 3 removes `prettier/parser-babel` in favor of separately loaded `prettier/plugins/babel` (parser) and `prettier/plugins/estree` (printer), and `format()` is now async. Restructured the initial-code computation into an effect that awaits `format()` and sets state, rather than calling it inline during render. `react-live` itself has no prettier dependency (it uses `sucrase`), so the change is contained to this one file.

Dropped `@types/prettier`, which npm already flags as deprecated since Prettier 3 ships its own types.
