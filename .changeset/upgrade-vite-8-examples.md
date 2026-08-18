---
'@bigcommerce/examples': patch
---

build(deps): upgrade `vite` 7.2.4 → 8.2.1 and `@vitejs/plugin-react` 5.2.0 → 6.0.5

Vite 8's default production bundler moves from Rollup to Rolldown. No `vite.config.ts` changes were needed (no `build.rollupOptions` usage to rename to `build.rolldownOptions`), but Rolldown enforces stricter named-export validation than Rollup at build time. See the `@bigcommerce/big-design-icons` changeset in this same batch for a downstream fix that was required to keep `pnpm run build` passing under Rolldown's stricter checks.
