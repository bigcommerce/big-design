---
'@bigcommerce/big-design': patch
'@bigcommerce/big-design-icons': patch
'@bigcommerce/big-design-patterns': patch
'@bigcommerce/big-design-theme': patch
'@bigcommerce/docs': patch
---

chore(deps): upgrade Babel toolchain 7 → 8 across `big-design`, `-icons`, `-theme`, `-patterns`, `docs`

Bumps `@babel/core`, `-cli`, `-preset-env`, `-preset-react`, `-preset-typescript`, `-plugin-transform-runtime`, `-runtime`, and (docs) `-standalone` to their 8.x releases.

- Dropped `useESModules` from `packages/configs/babel/babel.config.js`'s `@babel/plugin-transform-runtime` config; it's removed in Babel 8 (`@babel/runtime` now picks CJS/ESM via `package.json#exports` automatically).
- The classic→automatic JSX runtime default flip changes build output (now imports `react/jsx-runtime` instead of calling `React.createElement`); verified fine for React 19 consumers.
- `packages/docs/components/CodePreview/CodePreview.tsx`: `@babel/standalone`'s `transform()` no longer accepts `allExtensions`/`isTSX` on the `typescript` preset. Replaced with `ignoreExtensions: true` plus an explicit `syntax-jsx` plugin for the type-stripping-only pass (`getInitialCode`), and pinned `runtime: 'classic'` on the `react` preset for the live-eval pass (`transformCode`) since `react-live` evaluates transpiled code directly (no module resolution), so it can't handle the automatic runtime's `import ... from "react/jsx-runtime"`.
- Kept `@types/babel__standalone` (root devDependency): `@babel/standalone@8.x` ships no bundled `.d.ts`/`types` field, so it's still required for typechecking `docs`.
- `babel-plugin-styled-components` (even its latest release) still pins `@babel/plugin-syntax-jsx`, `@babel/helper-annotate-as-pure`, and `@babel/helper-module-imports` to `^7.x`, which fail Babel 8's `assertVersion` check at build time. Added a root `pnpm.overrides` block forcing those three transitive deps to their `^8.x` releases.
- Babel 8's TypeScript parser now requires the trailing-comma disambiguator (`<T,>`) for single-type-param generic arrow functions in **all** `.ts`/`.tsx` files, not just `.tsx` (previously only `.tsx` needed it). Added the comma at the 18 affected call sites in `big-design`, each with a `// prettier-ignore` since Prettier's own formatter still treats the comma as redundant in `.ts` files and would otherwise strip it back out.
