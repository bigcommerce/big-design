# Change Log

## 3.0.0

### Major Changes

- 753478b: Bump peer dependencies to React 19. All packages now require `react` and `react-dom` `^19.0.0`. `@types/react` and `@types/react-dom` are updated to `^19.0.0` as well.

  Breaking changes driven by React 19 type updates:

  - `TableColumn.render` type narrowed from `ComponentType<T> | ((props: T) => ReactNode)` to `(props: T, context?: any) => ReactNode` — class-component render references are no longer typed (they remain callable at runtime via their call signature).
  - `RefObject<T>` is now `RefObject<T | null>` throughout the public prop API, matching React 19's revised `createRef`/`useRef` signatures.
  - `MutableRefObject` removed from public types; use `RefObject` instead.
  - `FormEvent` replaced with `SubmitEvent` for `onSubmit` handlers, matching React 19's new `SubmitEventHandler` type.

### Patch Changes

- 3e9c1e0: fix(ci): add `prettier` as a root devDependency to fix the Changesets release job

  `@changesets/cli` 3.0.0 (`@changesets/apply-release-plan` 8.0.0 → `@changesets/format` 0.1.2) added a new post-`version` step that auto-detects a formatter and runs it over the touched CHANGELOG.md files. It found the root `prettier.config.js` and picked `prettier`, then ran `pnpm exec prettier --write ...` — but `prettier` was only ever a devDependency of `packages/big-design-icons` and `packages/docs`, never the workspace root, so a clean `pnpm install --frozen-lockfile` (as CI does) never resolves a `prettier` bin at the root and `pnpm exec prettier` fails with `Command "prettier" not found`, breaking the `Changesets / Release` job on every push to `main`.

  Adding `prettier@^3.9.6` (matching the version already pinned elsewhere) as a root devDependency gives `pnpm exec prettier` something to resolve. Verified by reproducing the exact CI failure in an isolated worktree with a genuine `pnpm install --frozen-lockfile`, then confirming `pnpm exec changeset version` completes cleanly after the fix.

- b4e207d: chore(deps): batch ~20 dependency bumps, drop-in or effectively drop-in

  Patch/minor bumps and majors with no breaking API surface actually used in this repo: `styled-components` 6.5.0 → 6.5.3, `@testing-library/react` 16.3.0 → 16.3.2, `@testing-library/user-event` 14.6.1 → 14.6.5, `@testing-library/jest-dom` 6.9.1 → 7.0.1, `zustand` 5.0.11 → 5.0.15, `date-fns` 4.1.0 → 4.4.0, `downshift` 9.0.10 → 9.4.0, `@tanstack/react-virtual` 3.13.23 → 3.14.10, `focus-trap` 7.6.4 → 8.2.2, `react-intersection-observer` 10.0.0 → 11.0.0, `turbo` 2.6.1 → 2.10.11, `@swc/core` 1.15.3 → 1.16.0, `@swc/plugin-styled-components` 12.x → 13.0.0, `glob`/`fs-extra`/`rimraf` patch bumps, `@radix-ui/react-scroll-area` 1.2.9 → 1.2.18, `formik` 2.4.6 → 2.4.9, `@changesets/changelog-git` 0.2.1 → 1.0.0, `prettier` (big-design-icons devDependency) 2.x → 3.9.6, and `@types/node` bumped to the latest 24.x patch.

  Also aligns CI's pinned pnpm version (`.circleci/config.yml`) with the root `packageManager` field.

- 6bb03a2: Fix a long-standing bug where TypeScript-only type imports (e.g. `Border`, `ThemeOptions`, `Colors`) were compiled into the ESM build (`dist/es`) as runtime import specifiers for bindings that don't actually exist at runtime. Babel's default type-import elision wasn't catching these, since they were never marked `import type`. This was silently tolerated by CJS consumers and lenient/non-validating bundlers, but crashes any strict-ESM bundler that validates named exports (Vite/Rollup/Rolldown, or webpack with `strictExportPresence`) — found via the LTRAC-1370 packed-tarball smoke test against store-control-panel's Vite 8 build. All 4 packages' type-only imports are now explicitly marked, and `@typescript-eslint/consistent-type-imports` is enabled repo-wide to prevent this from regressing.
- 00fed99: chore(ci): remove Commitlint

  Drops `@commitlint/cli` and `@commitlint/config-conventional` devDependencies, deletes `commitlint.config.js`, and removes the `commitlint` CircleCI job (and its workflow entry) since it's no longer useful.

- 92aa841: Add a version support matrix to the README(s) and docs site: the current major requires React 19 + styled-components >= 6.1.14, the 4.0.0-era release (`big-design@4.0.0` / `icons@2.0.0` / `patterns@6.0.0` / `theme@2.0.0`) is deprecated and should not be used, and the 3.x-era majors remain on React 18 + styled-components 5 with case-by-case backports. Also fixes the quick-start install snippets, which still referenced `styled-components@5`.
- 78b0c8d: chore(deps): upgrade Babel toolchain 7 → 8 across `big-design`, `-icons`, `-theme`, `-patterns`, `docs`

  Bumps `@babel/core`, `-cli`, `-preset-env`, `-preset-react`, `-preset-typescript`, `-plugin-transform-runtime`, `-runtime`, and (docs) `-standalone` to their 8.x releases.

  - Dropped `useESModules` from `packages/configs/babel/babel.config.js`'s `@babel/plugin-transform-runtime` config; it's removed in Babel 8 (`@babel/runtime` now picks CJS/ESM via `package.json#exports` automatically).
  - The classic→automatic JSX runtime default flip changes build output (now imports `react/jsx-runtime` instead of calling `React.createElement`); verified fine for React 19 consumers.
  - `packages/docs/components/CodePreview/CodePreview.tsx`: `@babel/standalone`'s `transform()` no longer accepts `allExtensions`/`isTSX` on the `typescript` preset. Replaced with `ignoreExtensions: true` plus an explicit `syntax-jsx` plugin for the type-stripping-only pass (`getInitialCode`), and pinned `runtime: 'classic'` on the `react` preset for the live-eval pass (`transformCode`) since `react-live` evaluates transpiled code directly (no module resolution), so it can't handle the automatic runtime's `import ... from "react/jsx-runtime"`.
  - Kept `@types/babel__standalone` (root devDependency): `@babel/standalone@8.x` ships no bundled `.d.ts`/`types` field, so it's still required for typechecking `docs`.
  - `babel-plugin-styled-components` (even its latest release) still pins `@babel/plugin-syntax-jsx`, `@babel/helper-annotate-as-pure`, and `@babel/helper-module-imports` to `^7.x`, which fail Babel 8's `assertVersion` check at build time. Added a root `pnpm.overrides` block forcing those three transitive deps to their `^8.x` releases.
  - Babel 8's TypeScript parser now requires the trailing-comma disambiguator (`<T,>`) for single-type-param generic arrow functions in **all** `.ts`/`.tsx` files, not just `.tsx` (previously only `.tsx` needed it). Added the comma at the 18 affected call sites in `big-design`, each with a `// prettier-ignore` since Prettier's own formatter still treats the comma as redundant in `.ts` files and would otherwise strip it back out.

- a47cc5f: build(deps): upgrade `@changesets/cli` 2.29.7 → 3.0.0, `@changesets/assemble-release-plan` 6.0.9 → 7.0.0

  `@changesets/changelog-git` stays on `^1.0.0` (already current; cli 3.0.0 now hard-depends on it directly rather than pulling its own older copy). These three move together since cli 3.0.0 hard-depends on the other two.

  Dropped the local `patches/@changesets__assemble-release-plan@6.0.9.patch` and its `pnpm.patchedDependencies` entry in `pnpm-workspace.yaml`, along with the now-stale dependabot `ignore` rule blocking all updates to `@changesets/assemble-release-plan` in `.github/dependabot.yml`. The patch stopped a peer-only _minor_ bump on a dependency from forcing a _major_ bump on peer-dependents (`big-design-patterns`) that peer-depend on the versioned packages via `workspace:^`. Upstream 7.0.0 fixes this more broadly: peer-triggered dependent bumps are now capped at `patch` unconditionally, regardless of the dependency's own release type.

  Verified with `changeset status --verbose` against an isolated scratch changeset: a peer-only **major** bump on `@bigcommerce/big-design` now caps `@bigcommerce/big-design-patterns` and `@bigcommerce/docs` at `patch` instead of cascading to `major`.

  Process note: a genuinely breaking peer change no longer bumps dependents automatically — it now requires an explicit manual major changeset on each affected dependent.

- 62bed89: build(deps): upgrade pnpm 10 → 11

  Bumps the root `packageManager` pin from `pnpm@10.26.2` to `pnpm@11.22.0` and aligns CI's pinned pnpm version (`.circleci/config.yml`) with it. Node 24 already satisfies v11's Node 22+ requirement.

  Ran pnpm's official `pnpm-v10-to-v11` codemod to migrate the root `package.json#pnpm` field (`patchedDependencies`, `overrides`) into `pnpm-workspace.yaml`, since v11 no longer reads settings from `package.json#pnpm`.

  v11 also turns previously-silent "ignored build scripts" into a hard install failure unless explicitly decided. `@swc/core`, `esbuild`, `sharp`, and `unrs-resolver` were already having their build scripts skipped under v10 with no ill effect, so `pnpm-workspace.yaml` now sets `allowBuilds: false` for each to preserve that behavior explicitly rather than newly opting them in.

  Be aware v11's new `minimumReleaseAge: 1440` default blocks installing packages published less than 24h ago, which is good for CI reliability but can transiently block installs right after a fresh dependency bump.

## 2.0.0

### Major Changes

- d737812: Require styled-components 6: the `styled-components` peer dependency range moves from `^5.3.5` to `^6.1.14` across all four packages. Consumers must upgrade to styled-components 6 to use this release (v6 supports both React 18 and, ahead of our upcoming React 19 flip, React 19 — while v5 does not support React 19). Along with the peer bump, the packages now build and test against styled-components `^6.4.0`, `@types/styled-components` is dropped (v6 ships its own types), and `jest-styled-components` moves to `^7.4.0` for v6 support (7.4.0 also fixes `toHaveStyleRule`'s `media` option against stylis v4's spaced media-query output). `createTheme()` now returns `keyframes` as a plain object copy rather than a frozen module-namespace object, since styled-components 6 deep-merges themes when folding `defaultProps` and a getter-only namespace object makes that merge throw; the shape and values of `theme.keyframes` are unchanged.

## 1.3.1

### Patch Changes

- 9fc1f98: Replace `FlattenSimpleInterpolation` with a version-agnostic `CSSRules` alias (`ReturnType<typeof css>`) and drop the explicit `styled<StyledComponent<...>>(...)` generics in favor of inferred typing, so published `.d.ts` files no longer reference type names that only exist in styled-components v5's types. No runtime change; public prop shapes are unchanged for v5 consumers.

## 1.3.0

### Minor Changes

- 042d470: Change the documentation and code to use Source Sans 3 instead of Source Sans Pro. Source Sans Pro is licensed by Adobe now which means we need to the utilize the open license with Source Sans 3.

## 1.2.0

### Minor Changes

- e323932: added negative values to spacing definitions

## 1.1.0

### Minor Changes

- f8665f3: Added wide breakpoint to theme definition to best adapt responsive features to wide screens

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.0.2](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-theme@1.0.1...@bigcommerce/big-design-theme@1.0.2) (2024-08-06)

**Note:** Version bump only for package @bigcommerce/big-design-theme

## [1.0.1](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-theme@1.0.0...@bigcommerce/big-design-theme@1.0.1) (2024-06-11)

**Note:** Version bump only for package @bigcommerce/big-design-theme

# [1.0.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-theme@0.21.1...@bigcommerce/big-design-theme@1.0.0) (2024-04-17)

**Note:** Version bump only for package @bigcommerce/big-design-theme

## [0.21.1](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-theme@0.21.0...@bigcommerce/big-design-theme@0.21.1) (2024-04-09)

### Bug Fixes

- typescript build output with wrong imports ([a812497](https://github.com/bigcommerce/big-design/commit/a81249798e20c10754c938b2b3d3dcc95d81aa0c))

# [0.21.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-theme@0.20.1...@bigcommerce/big-design-theme@0.21.0) (2024-04-02)

**Note:** Version bump only for package @bigcommerce/big-design-theme

## [0.20.1](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-theme@0.20.0...@bigcommerce/big-design-theme@0.20.1) (2024-01-23)

**Note:** Version bump only for package @bigcommerce/big-design-theme

# [0.20.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-theme@0.19.2...@bigcommerce/big-design-theme@0.20.0) (2023-10-09)

**Note:** Version bump only for package @bigcommerce/big-design-theme

## [0.19.2](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-theme@0.19.1...@bigcommerce/big-design-theme@0.19.2) (2023-06-14)

### Bug Fixes

- declaration tsconfig for theme publishing ([4789b8b](https://github.com/bigcommerce/big-design/commit/4789b8b35d3fbfbd42d0312de66cd1b48bef0f39))

## [0.19.1](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-theme@0.19.0...@bigcommerce/big-design-theme@0.19.1) (2023-06-09)

**Note:** Version bump only for package @bigcommerce/big-design-theme

# [0.19.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-theme@0.18.0...@bigcommerce/big-design-theme@0.19.0) (2023-04-05)

**Note:** Version bump only for package @bigcommerce/big-design-theme

# [0.18.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-theme@0.17.0...@bigcommerce/big-design-theme@0.18.0) (2023-01-09)

### Features

- convert to react@18 only ([#1044](https://github.com/bigcommerce/big-design/issues/1044)) ([06c4697](https://github.com/bigcommerce/big-design/commit/06c469721bc06d1f872bed6bf5a46e6b568644e5))

### BREAKING CHANGES

- Requires `react@18` or higher.

# [0.17.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-theme@0.16.1...@bigcommerce/big-design-theme@0.17.0) (2022-09-27)

### Features

- **deps:** react@18 support ([51c688b](https://github.com/bigcommerce/big-design/commit/51c688b282277964eb01c1ed67c5c27cc0bc4c3e))

## [0.16.1](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-theme@0.16.0...@bigcommerce/big-design-theme@0.16.1) (2022-09-27)

**Note:** Version bump only for package @bigcommerce/big-design-theme

# [0.16.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-theme@0.15.1-alpha.0...@bigcommerce/big-design-theme@0.16.0) (2022-08-17)

**Note:** Version bump only for package @bigcommerce/big-design-theme

## [0.15.1-alpha.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-theme@0.15.0...@bigcommerce/big-design-theme@0.15.1-alpha.0) (2022-08-10)

**Note:** Version bump only for package @bigcommerce/big-design-theme

# [0.15.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-theme@0.14.1...@bigcommerce/big-design-theme@0.15.0) (2022-07-06)

**Note:** Version bump only for package @bigcommerce/big-design-theme

## [0.14.1](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-theme@0.14.0...@bigcommerce/big-design-theme@0.14.1) (2022-06-10)

### Features

- **theme:** re-export hideVisually from polished ([e102e6d](https://github.com/bigcommerce/big-design/commit/e102e6dfc6d28b311556946d3e90d2323885713f))

# [0.14.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-theme@0.13.2-alpha.1...@bigcommerce/big-design-theme@0.14.0) (2022-05-11)

**Note:** Version bump only for package @bigcommerce/big-design-theme

## [0.13.2-alpha.1](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-theme@0.13.2-alpha.0...@bigcommerce/big-design-theme@0.13.2-alpha.1) (2022-03-22)

**Note:** Version bump only for package @bigcommerce/big-design-theme

## [0.13.2-alpha.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-theme@0.13.1...@bigcommerce/big-design-theme@0.13.2-alpha.0) (2021-10-28)

**Note:** Version bump only for package @bigcommerce/big-design-theme

## [0.13.1](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-theme@0.13.0...@bigcommerce/big-design-theme@0.13.1) (2021-09-03)

**Note:** Version bump only for package @bigcommerce/big-design-theme

# [0.13.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-theme@0.13.0-alpha.2...@bigcommerce/big-design-theme@0.13.0) (2021-08-04)

**Note:** Version bump only for package @bigcommerce/big-design-theme

# [0.13.0-alpha.2](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-theme@0.13.0-alpha.1...@bigcommerce/big-design-theme@0.13.0-alpha.2) (2021-08-02)

### chore

- **deps:** upgrade to styled-components v5 ([#566](https://github.com/bigcommerce/big-design/issues/566)) ([dd83711](https://github.com/bigcommerce/big-design/commit/dd83711797eb8aaa7a8406eebf1383116bff2420))

### Features

- **theme:** add listReset helper ([#570](https://github.com/bigcommerce/big-design/issues/570)) ([385b142](https://github.com/bigcommerce/big-design/commit/385b1426ee39171343070f9b31ad4e31d834b272))

### BREAKING CHANGES

- **deps:** You will need to update to styled-components v5. In addition,
  you will need to import the base fonts in your <head> element.
  See the "Getting Started" page or README.md for an example.

# [0.13.0-alpha.1](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-theme@0.13.0-alpha.0...@bigcommerce/big-design-theme@0.13.0-alpha.1) (2021-07-06)

**Note:** Version bump only for package @bigcommerce/big-design-theme

# [0.13.0-alpha.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-theme@0.12.1...@bigcommerce/big-design-theme@0.13.0-alpha.0) (2021-06-10)

**Note:** Version bump only for package @bigcommerce/big-design-theme

## [0.12.1](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-theme@0.12.0...@bigcommerce/big-design-theme@0.12.1) (2021-03-29)

**Note:** Version bump only for package @bigcommerce/big-design-theme

# [0.12.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-theme@0.11.0...@bigcommerce/big-design-theme@0.12.0) (2021-03-08)

### Bug Fixes

- **docs:** Specify styled-components version in the README ([#490](https://github.com/bigcommerce/big-design/issues/490)) ([c92403e](https://github.com/bigcommerce/big-design/commit/c92403edf8e29bf1afd3c9c163c37be6ffe17a6c))

### Features

- **theme:** add currentColor, inherit, and transparent props to colors ([#504](https://github.com/bigcommerce/big-design/issues/504)) ([3ef9b18](https://github.com/bigcommerce/big-design/commit/3ef9b1899ccef4c282f2f293e8fdd34d204e0420))

# [0.11.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-theme@0.10.1...@bigcommerce/big-design-theme@0.11.0) (2020-11-12)

### Bug Fixes

- webpack 5 compatibility ([#466](https://github.com/bigcommerce/big-design/issues/466)) ([7e66238](https://github.com/bigcommerce/big-design/commit/7e66238ca42cb27d91b1a80cc9e1c8014808e27b))
- **component:** updates progress circle to use em instead of rem due to error in Safari 14 ([#472](https://github.com/bigcommerce/big-design/issues/472)) ([3bedcc1](https://github.com/bigcommerce/big-design/commit/3bedcc1be8e5f5a8c9c63d634a1c567dd3016002))

## [0.10.1](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-theme@0.10.0...@bigcommerce/big-design-theme@0.10.1) (2020-08-31)

### Features

- **theme:** add DefaultTheme extension types ([cdfeb49](https://github.com/bigcommerce/big-design/commit/cdfeb493973cce48ed92e30951be2b8bc87ed194))

# [0.10.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-theme@0.9.0...@bigcommerce/big-design-theme@0.10.0) (2020-06-16)

**Note:** Version bump only for package @bigcommerce/big-design-theme

# [0.9.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-theme@0.8.0...@bigcommerce/big-design-theme@0.9.0) (2020-04-29)

**Note:** Version bump only for package @bigcommerce/big-design-theme

# [0.8.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-theme@0.7.0...@bigcommerce/big-design-theme@0.8.0) (2020-04-20)

**Note:** Version bump only for package @bigcommerce/big-design-theme

# [0.7.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-theme@0.6.0...@bigcommerce/big-design-theme@0.7.0) (2020-03-25)

**Note:** Version bump only for package @bigcommerce/big-design-theme

# [0.6.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-theme@0.5.0...@bigcommerce/big-design-theme@0.6.0) (2020-02-21)

### Features

- **component:** add Alerts, InlineAlerts, and Message components ([#340](https://github.com/bigcommerce/big-design/issues/340)) ([d541276](https://github.com/bigcommerce/big-design/commit/d54127603fba47b46cb35c3db4caf53ab24bafc3))

# [0.5.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-theme@0.4.0...@bigcommerce/big-design-theme@0.5.0) (2020-02-06)

### Bug Fixes

- add react-hooks eslint and fix missing deps/issues ([#330](https://github.com/bigcommerce/big-design/issues/330)) ([da3fbd6](https://github.com/bigcommerce/big-design/commit/da3fbd68181e98e43a95de7fce9956be91afc9b8))

# [0.4.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-theme@0.3.1...@bigcommerce/big-design-theme@0.4.0) (2019-12-09)

### Features

- **component:** add tab trap for modals and dialogs ([dcacbf9](https://github.com/bigcommerce/big-design/commit/dcacbf96a38bef1134e2a8dcbd986f6362e0e2b7))

## [0.3.1](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-theme@0.3.0...@bigcommerce/big-design-theme@0.3.1) (2019-11-12)

### Features

- **all:** better tree shaking ([c0998a7](https://github.com/bigcommerce/big-design/commit/c0998a7))

# [0.3.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-theme@0.2.0...@bigcommerce/big-design-theme@0.3.0) (2019-11-11)

### Features

- **all:** bump styled-components peerDependency version ([fd89fa3](https://github.com/bigcommerce/big-design/commit/fd89fa3))
- **component:** tooltip for dropdown item ([#228](https://github.com/bigcommerce/big-design/issues/228)) ([4e5fc50](https://github.com/bigcommerce/big-design/commit/4e5fc50))

### BREAKING CHANGES

- **all:** bumped peer dependency of styled-components to `^4.3.0`

# [0.2.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-theme@0.1.2...@bigcommerce/big-design-theme@0.2.0) (2019-10-29)

**Note:** Version bump only for package @bigcommerce/big-design-theme

## [0.1.2](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-theme@0.1.1...@bigcommerce/big-design-theme@0.1.2) (2019-08-19)

### Bug Fixes

- **component:** add missing z-index to components ([#176](https://github.com/bigcommerce/big-design/issues/176)) ([800d2fc](https://github.com/bigcommerce/big-design/commit/800d2fc))

### BREAKING CHANGES

- **component:** `theme.zIndex` no longer has `theme.zIndex.dropdown`

## [0.1.1](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-theme@0.1.0...@bigcommerce/big-design-theme@0.1.1) (2019-08-15)

**Note:** Version bump only for package @bigcommerce/big-design-theme

# 0.1.0 (2019-08-13)

### Bug Fixes

- **theme:** export missing properties ([f439df0](https://github.com/bigcommerce/big-design/commit/f439df0))
- **theme:** issue with font sizes in createTheme ([#135](https://github.com/bigcommerce/big-design/issues/135)) ([313ff46](https://github.com/bigcommerce/big-design/commit/313ff46))

### Features

- **theme:** initial package setup ([f734dfb](https://github.com/bigcommerce/big-design/commit/f734dfb))
- **theme:** rename elevation to shadow ([659c6ad](https://github.com/bigcommerce/big-design/commit/659c6ad))

### BREAKING CHANGES

- **theme:** `elevation` is now called `shadow`
