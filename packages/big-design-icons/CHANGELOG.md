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

- 86e3149: Fix a regression from the type-only-import fix (see the "ESM build shipping runtime imports for type-only names" changeset): using inline `type` modifiers (`import { type X }`) instead of the whole-statement form (`import type { X }`) still left a bare `require(...)` of the module behind, since Babel can't prove a plain import specifier has no side effects. In `utils/messagingHelpers.ts` and `utils/treeHelpers.ts`, that bare require created a real circular `require` chain back through `utils/index.ts` before its `typedMemo` export was assigned, crashing with `(0, _utils.typedMemo) is not a function` on `require('@bigcommerce/big-design')` — reproducible with no bundler involved, and present even under CommonJS/Node.js. `@typescript-eslint/consistent-type-imports`'s `fixStyle` is now `separate-type-imports`, which fully elides the runtime footprint whenever every binding from a specifier is type-only.
- 6bb03a2: Fix a long-standing bug where TypeScript-only type imports (e.g. `Border`, `ThemeOptions`, `Colors`) were compiled into the ESM build (`dist/es`) as runtime import specifiers for bindings that don't actually exist at runtime. Babel's default type-import elision wasn't catching these, since they were never marked `import type`. This was silently tolerated by CJS consumers and lenient/non-validating bundlers, but crashes any strict-ESM bundler that validates named exports (Vite/Rollup/Rolldown, or webpack with `strictExportPresence`) — found via the LTRAC-1370 packed-tarball smoke test against store-control-panel's Vite 8 build. All 4 packages' type-only imports are now explicitly marked, and `@typescript-eslint/consistent-type-imports` is enabled repo-wide to prevent this from regressing.
- 915f235: fix: mark type-only imports (`IconProps`, `PrivateIconProps`, `FlagIconProps`, `Colors`, `Spacing`, `ThemeInterface`) with the `type` modifier in `base/index.tsx`, `flags/base/index.tsx`, and all 361 generated icon components

  These names were imported as regular (value) specifiers even though they're only ever used in type position. Babel's per-file usage analysis failed to elide them, so the compiled `dist/es` output shipped `import` statements referencing names that don't exist at runtime. Classic Rollup silently tolerated the dangling references; Rolldown (Vite 8's new default bundler) treats them as fatal `MISSING_EXPORT` errors, which broke `@bigcommerce/examples`' production build. No public API or runtime behavior changes.

- 606e210: fix: restore layout defaults broken by styled-components v6 and fix `autoDismiss` DOM leak in `AlertsManager`

  `styled-components` v6 returns function components, and React 18/19 no longer applies `defaultProps` to function components. `Flex`, `FlexItem`, `Grid`, and icon components lost their layout defaults silently. Defaults are now applied at the call site rather than via `defaultProps`.

  `AlertsManager` also leaked the internal `autoDismiss` option onto the DOM: SC6 no longer strips unknown props before forwarding, so the option was reaching the DOM as an unrecognised attribute. It is now stripped before rendering.

- 00fed99: chore(ci): remove Commitlint

  Drops `@commitlint/cli` and `@commitlint/config-conventional` devDependencies, deletes `commitlint.config.js`, and removes the `commitlint` CircleCI job (and its workflow entry) since it's no longer useful.

- 18b4d51: build(deps): rewrite `scripts/build.js` off `camelcase` 6, upgrade to `camelcase` 9.0.0

  `camelcase` went ESM-only starting at v7, breaking the script's plain `require('camelcase')` with `ERR_REQUIRE_ESM` — a straight version bump wasn't possible. The script is renamed to `scripts/build.mjs` and rewritten as a native ES module (static `import`s, top-level `await`, `import.meta.dirname` in place of `__dirname`).

  The package's `lint` script now passes `--ext .js,.mjs` so the new `.mjs` file is covered by ESLint, and `.eslintrc.js` adds an override requiring file extensions on relative imports in `.mjs` files (native ESM needs them; the base config forbids them for `.js`). Dev-only icon build tooling; no shipped-artifact or consumer impact.

- 48ff345: build(deps): rewrite `scripts/downloader.js` off `inquirer` 8, upgrade to `inquirer` 14.0.2

  `inquirer` went ESM-only at v9 and was rearchitected around `@inquirer/prompts`, breaking the `require()` + `inquirer.registerPrompt('autocomplete', ...)` pattern the old script relied on. The script is renamed to `scripts/downloader.mjs` and rewritten as a native ES module (static `import`s, top-level `await`, `import.meta.dirname` in place of `__dirname`).

  `inquirer-autocomplete-prompt` is dropped entirely rather than bumped to 3.0.1: that version still peer-depends on `inquirer@^9` and deep-imports internals (e.g. `inquirer/lib/prompts/base.js`) that no longer exist in `inquirer` 14's exports map, so it cannot actually run against the upgraded `inquirer`. Its autocomplete UX is replaced with `inquirer` 14's built-in `search` prompt type, which provides the same async `source`-driven, type-to-filter behavior with no extra dependency.

  The package's `lint` script now passes `--ext .js,.mjs` so the new `.mjs` file is covered by ESLint. Dev-only, no consumer or build-output impact.

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

- Updated dependencies [3e9c1e0]
- Updated dependencies [b4e207d]
- Updated dependencies [6bb03a2]
- Updated dependencies [753478b]
- Updated dependencies [00fed99]
- Updated dependencies [92aa841]
- Updated dependencies [78b0c8d]
- Updated dependencies [a47cc5f]
- Updated dependencies [62bed89]
  - @bigcommerce/big-design-theme@3.0.0

## 2.0.0

### Major Changes

- d737812: Require styled-components 6: the `styled-components` peer dependency range moves from `^5.3.5` to `^6.1.14` across all four packages. Consumers must upgrade to styled-components 6 to use this release (v6 supports both React 18 and, ahead of our upcoming React 19 flip, React 19 — while v5 does not support React 19). Along with the peer bump, the packages now build and test against styled-components `^6.4.0`, `@types/styled-components` is dropped (v6 ships its own types), and `jest-styled-components` moves to `^7.4.0` for v6 support (7.4.0 also fixes `toHaveStyleRule`'s `media` option against stylis v4's spaced media-query output). `createTheme()` now returns `keyframes` as a plain object copy rather than a frozen module-namespace object, since styled-components 6 deep-merges themes when folding `defaultProps` and a getter-only namespace object makes that merge throw; the shape and values of `theme.keyframes` are unchanged.

### Patch Changes

- 9d91895: Fix `color` and `size` leaking onto the rendered `<svg>` DOM element for every icon. Each generated icon component (e.g. `ErrorIcon`) spread the remaining props directly onto a plain, non-styled `<svg>` without destructuring these two out first, so consumers passing `color`/`size` (via `createStyledIcon`/`createStyledFlagIcon`'s wrapper, which reads them separately to compute CSS) saw them show up as literal, invalid DOM attributes as well. This was independent of the v5→v6 styled-components/transient-props migration, since `createStyledIcon`/`createStyledFlagIcon` compose over the `Icon` component rather than a DOM tag, so styled-components' own prop filtering never applied here. `color`/`size` are now destructured out of the icon's own props alongside `svgRef`/`title`/`theme`, matching how `excludeMarginProps()`/`excludePaddingProps()` scope other non-DOM props elsewhere in this repo.
- Updated dependencies [d737812]
  - @bigcommerce/big-design-theme@2.0.0

## 1.10.0

### Minor Changes

- ba53ac2: added chart and ai sparkle icons

## 1.9.0

### Minor Changes

- 9a7e558: Added Play and Stop icons needed for chatbot interfaces

## 1.8.0

### Minor Changes

- a1b0b0b: Adding missing chat icons

## 1.7.0

### Minor Changes

- 1f83e7e: added circle_dashed, flare, Products and RadioButton icons

## 1.6.0

### Minor Changes

- 3dd3178: added refresh icon to set

## 1.5.0

### Minor Changes

- a1306f6: added icons for lozenges

### Patch Changes

- Updated dependencies [e323932]
  - @bigcommerce/big-design-theme@1.2.0

## 1.4.0

### Minor Changes

- 5a5c9b7: Added Category Search Icon

## 1.3.0

### Minor Changes

- 0c11db0: add lightbulb icon

## 1.2.2

### Patch Changes

- 98fbd46: feat(component): Add an action prop for columns whose type is number or text

## 1.2.1

### Patch Changes

- 69e7772: Remove Pin icon hardcoded fill colour

## 1.2.0

### Minor Changes

- 0f8cf34: Added Pin icon

## 1.1.0

### Minor Changes

- 01a5b20: Added AutoAwesome icon from Material Icons library

## 1.0.3

### Patch Changes

- Updated dependencies [f8665f3]
  - @bigcommerce/big-design-theme@1.1.0

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.0.2](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@1.0.1...@bigcommerce/big-design-icons@1.0.2) (2024-08-06)

**Note:** Version bump only for package @bigcommerce/big-design-icons

## [1.0.1](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@1.0.0...@bigcommerce/big-design-icons@1.0.1) (2024-06-11)

**Note:** Version bump only for package @bigcommerce/big-design-icons

# [1.0.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.26.1...@bigcommerce/big-design-icons@1.0.0) (2024-04-17)

### Features

- export types without reassignment ([9bf2244](https://github.com/bigcommerce/big-design/commit/9bf224417433e54680794f97d30a01fb77b24d69))

## [0.26.1](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.26.0...@bigcommerce/big-design-icons@0.26.1) (2024-04-09)

### Bug Fixes

- typescript build output with wrong imports ([a812497](https://github.com/bigcommerce/big-design/commit/a81249798e20c10754c938b2b3d3dcc95d81aa0c))

# [0.26.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.25.1...@bigcommerce/big-design-icons@0.26.0) (2024-04-02)

### chore

- **deps-dev:** bump flag-icons from 6.11.0 to 7.1.0 ([#1345](https://github.com/bigcommerce/big-design/issues/1345)) ([54572b6](https://github.com/bigcommerce/big-design/commit/54572b64e54cb5bb33d28c41a5cfe74844040d40))

### BREAKING CHANGES

- **deps-dev:** This upgrade removes a few flag icons. See the commit diff to check which
  ones were removed and ensure you are not using them in your application code.

## [0.25.1](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.25.0...@bigcommerce/big-design-icons@0.25.1) (2024-01-23)

**Note:** Version bump only for package @bigcommerce/big-design-icons

# [0.25.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.24.0...@bigcommerce/big-design-icons@0.25.0) (2023-10-09)

### Bug Fixes

- **icons:** downgrade 'camelcase' to 6.3.0 ([#1284](https://github.com/bigcommerce/big-design/issues/1284)) ([1004097](https://github.com/bigcommerce/big-design/commit/100409789ab0beb9095eea3580aed7b5b3fc8776))

### Features

- **icons:** add Draft icon ([#1302](https://github.com/bigcommerce/big-design/issues/1302)) ([3ae2423](https://github.com/bigcommerce/big-design/commit/3ae2423ccaf2b53f282790218dcb80d622954241))
- **icons:** add FileDownloadIcon ([#1286](https://github.com/bigcommerce/big-design/issues/1286)) ([7d73767](https://github.com/bigcommerce/big-design/commit/7d737670533c45ab09a66556b1d4b2316331ff03))
- **icons:** add window expand and minimize icons ([997400b](https://github.com/bigcommerce/big-design/commit/997400b4ba5dc8d4c484cb690ee335a112de6c32))

# [0.24.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.23.2...@bigcommerce/big-design-icons@0.24.0) (2023-07-26)

**Note:** Version bump only for package @bigcommerce/big-design-icons

## [0.23.2](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.23.1...@bigcommerce/big-design-icons@0.23.2) (2023-06-14)

**Note:** Version bump only for package @bigcommerce/big-design-icons

## [0.23.1](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.23.0...@bigcommerce/big-design-icons@0.23.1) (2023-06-09)

**Note:** Version bump only for package @bigcommerce/big-design-icons

# [0.23.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.22.0...@bigcommerce/big-design-icons@0.23.0) (2023-04-05)

**Note:** Version bump only for package @bigcommerce/big-design-icons

# [0.22.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.21.0...@bigcommerce/big-design-icons@0.22.0) (2023-01-09)

### Features

- convert to react@18 only ([#1044](https://github.com/bigcommerce/big-design/issues/1044)) ([06c4697](https://github.com/bigcommerce/big-design/commit/06c469721bc06d1f872bed6bf5a46e6b568644e5))

### BREAKING CHANGES

- Requires `react@18` or higher.

# [0.21.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.20.1...@bigcommerce/big-design-icons@0.21.0) (2022-09-27)

### Features

- **deps:** react@18 support ([51c688b](https://github.com/bigcommerce/big-design/commit/51c688b282277964eb01c1ed67c5c27cc0bc4c3e))

## [0.20.1](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.20.0...@bigcommerce/big-design-icons@0.20.1) (2022-09-27)

### Features

- **deps:** unfork from flag-icons dependency ([ac723e3](https://github.com/bigcommerce/big-design/commit/ac723e384ec3c482d78107558cd31e7793a515f1))

# [0.20.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.19.2-alpha.0...@bigcommerce/big-design-icons@0.20.0) (2022-08-17)

**Note:** Version bump only for package @bigcommerce/big-design-icons

## [0.19.2-alpha.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.19.1...@bigcommerce/big-design-icons@0.19.2-alpha.0) (2022-08-10)

**Note:** Version bump only for package @bigcommerce/big-design-icons

## [0.19.1](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.19.0...@bigcommerce/big-design-icons@0.19.1) (2022-07-12)

**Note:** Version bump only for package @bigcommerce/big-design-icons

# [0.19.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.18.1...@bigcommerce/big-design-icons@0.19.0) (2022-07-06)

**Note:** Version bump only for package @bigcommerce/big-design-icons

## [0.18.1](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.18.0...@bigcommerce/big-design-icons@0.18.1) (2022-06-10)

**Note:** Version bump only for package @bigcommerce/big-design-icons

# [0.18.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.17.2-alpha.1...@bigcommerce/big-design-icons@0.18.0) (2022-05-11)

### Bug Fixes

- tiny-async-pool api changes ([b4c04ba](https://github.com/bigcommerce/big-design/commit/b4c04bac3556b084ac1d39d2f0fde57efd7d8f43))

## [0.17.2-alpha.1](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.17.2-alpha.0...@bigcommerce/big-design-icons@0.17.2-alpha.1) (2022-03-22)

**Note:** Version bump only for package @bigcommerce/big-design-icons

## [0.17.2-alpha.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.17.1...@bigcommerce/big-design-icons@0.17.2-alpha.0) (2021-10-28)

### Bug Fixes

- **icons:** add `aria-hidden=true` if an icon doesn't have a title ([e3bb896](https://github.com/bigcommerce/big-design/commit/e3bb896fed2d7b1afb30f0134f161cfae5a00398))
- **icons:** Ensure aira-hidden is correctly set in flags ([9f49a2d](https://github.com/bigcommerce/big-design/commit/9f49a2dfd19734e797945483cb99efe8ea1503f1))

## [0.17.1](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.17.0...@bigcommerce/big-design-icons@0.17.1) (2021-09-03)

### Features

- **icons:** Add Home/KeyboardDoubleArrowLeftIcon/SwapHoriz icons ([#583](https://github.com/bigcommerce/big-design/issues/583)) ([519655f](https://github.com/bigcommerce/big-design/commit/519655fe8ee3d619d1b85937e86635332fb77301))

# [0.17.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.17.0-alpha.2...@bigcommerce/big-design-icons@0.17.0) (2021-08-04)

### Features

- **icons:** add content copy icon ([#572](https://github.com/bigcommerce/big-design/issues/572)) ([4ca0b76](https://github.com/bigcommerce/big-design/commit/4ca0b76d12cc5a9d2e1dd0b90d90bc2cfb6a1294))

# [0.17.0-alpha.2](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.17.0-alpha.1...@bigcommerce/big-design-icons@0.17.0-alpha.2) (2021-08-02)

### chore

- **deps:** upgrade to styled-components v5 ([#566](https://github.com/bigcommerce/big-design/issues/566)) ([dd83711](https://github.com/bigcommerce/big-design/commit/dd83711797eb8aaa7a8406eebf1383116bff2420))

### BREAKING CHANGES

- **deps:** You will need to update to styled-components v5. In addition,
  you will need to import the base fonts in your <head> element.
  See the "Getting Started" page or README.md for an example.

# [0.17.0-alpha.1](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.17.0-alpha.0...@bigcommerce/big-design-icons@0.17.0-alpha.1) (2021-07-06)

**Note:** Version bump only for package @bigcommerce/big-design-icons

# [0.17.0-alpha.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.16.1...@bigcommerce/big-design-icons@0.17.0-alpha.0) (2021-06-10)

**Note:** Version bump only for package @bigcommerce/big-design-icons

## [0.16.1](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.16.0...@bigcommerce/big-design-icons@0.16.1) (2021-03-29)

**Note:** Version bump only for package @bigcommerce/big-design-icons

# [0.16.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.15.0...@bigcommerce/big-design-icons@0.16.0) (2021-03-08)

**Note:** Version bump only for package @bigcommerce/big-design-icons

# [0.15.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.14.1...@bigcommerce/big-design-icons@0.15.0) (2021-02-11)

### Bug Fixes

- **docs:** Specify styled-components version in the README ([#490](https://github.com/bigcommerce/big-design/issues/490)) ([c92403e](https://github.com/bigcommerce/big-design/commit/c92403edf8e29bf1afd3c9c163c37be6ffe17a6c))

### Features

- **icons:** add cloud upload icon ([#501](https://github.com/bigcommerce/big-design/issues/501)) ([aeb9aee](https://github.com/bigcommerce/big-design/commit/aeb9aeeb18a93064c61497fc439e7e82957c1a2e))
- **icons:** add flag icons ([#493](https://github.com/bigcommerce/big-design/issues/493)) ([0519c8a](https://github.com/bigcommerce/big-design/commit/0519c8aa131461e52ffe40f40b1e45771f749c0f))

## [0.14.1](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.14.0...@bigcommerce/big-design-icons@0.14.1) (2020-12-21)

### Features

- **icons:** add insert_drive_file icon ([#486](https://github.com/bigcommerce/big-design/issues/486)) ([b07d9c6](https://github.com/bigcommerce/big-design/commit/b07d9c6f6416854212eb447d216117a40edb6b8e))

# [0.14.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.13.1...@bigcommerce/big-design-icons@0.14.0) (2020-11-12)

### Bug Fixes

- webpack 5 compatibility ([#466](https://github.com/bigcommerce/big-design/issues/466)) ([7e66238](https://github.com/bigcommerce/big-design/commit/7e66238ca42cb27d91b1a80cc9e1c8014808e27b))

## [0.13.1](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.13.0...@bigcommerce/big-design-icons@0.13.1) (2020-08-31)

**Note:** Version bump only for package @bigcommerce/big-design-icons

# [0.13.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.12.0...@bigcommerce/big-design-icons@0.13.0) (2020-08-13)

### Features

- **icons:** add code, brush and get_app icons ([#433](https://github.com/bigcommerce/big-design/issues/433)) ([bb48f2d](https://github.com/bigcommerce/big-design/commit/bb48f2d6aefa627f35137f6043b582268ac76ef4))

# [0.12.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.11.1...@bigcommerce/big-design-icons@0.12.0) (2020-06-16)

### Features

- **component:** add Tree component ([#406](https://github.com/bigcommerce/big-design/issues/406)) ([c67643c](https://github.com/bigcommerce/big-design/commit/c67643cfdf425d078a1ea09bce12575e35f442e7))

## [0.11.1](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.11.0...@bigcommerce/big-design-icons@0.11.1) (2020-04-30)

### Bug Fixes

- type regression for ts < 3.8 ([#395](https://github.com/bigcommerce/big-design/issues/395)) ([f476f9b](https://github.com/bigcommerce/big-design/commit/f476f9b3c2a950bb3bd3353a4ce180e994e465c0))

# [0.11.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.10.0...@bigcommerce/big-design-icons@0.11.0) (2020-04-29)

**Note:** Version bump only for package @bigcommerce/big-design-icons

# [0.10.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.9.0...@bigcommerce/big-design-icons@0.10.0) (2020-04-20)

### Bug Fixes

- **icons:** contained aria-labelledby when title prop was undefined ([#374](https://github.com/bigcommerce/big-design/issues/374)) ([f0d4df7](https://github.com/bigcommerce/big-design/commit/f0d4df70894b364ec932dfc5c62cebda5dd10bda))

# [0.9.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.8.0...@bigcommerce/big-design-icons@0.9.0) (2020-03-25)

**Note:** Version bump only for package @bigcommerce/big-design-icons

# [0.8.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.7.0...@bigcommerce/big-design-icons@0.8.0) (2020-02-21)

### Features

- **component:** add Alerts, InlineAlerts, and Message components ([#340](https://github.com/bigcommerce/big-design/issues/340)) ([d541276](https://github.com/bigcommerce/big-design/commit/d54127603fba47b46cb35c3db4caf53ab24bafc3))

# [0.7.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.6.0...@bigcommerce/big-design-icons@0.7.0) (2020-02-06)

### Bug Fixes

- add react-hooks eslint and fix missing deps/issues ([#330](https://github.com/bigcommerce/big-design/issues/330)) ([da3fbd6](https://github.com/bigcommerce/big-design/commit/da3fbd68181e98e43a95de7fce9956be91afc9b8))

### Features

- **icons:** forwardRef to svg ([#312](https://github.com/bigcommerce/big-design/issues/312)) ([0088444](https://github.com/bigcommerce/big-design/commit/0088444015df4f6538d97e657f800f5718c2706e))

# [0.6.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.5.2...@bigcommerce/big-design-icons@0.6.0) (2019-12-09)

### Bug Fixes

- **icons:** only add title when available ([b2cf7f7](https://github.com/bigcommerce/big-design/commit/b2cf7f7a00a0d158c01485ee6978c2e13404c048))

### Features

- **component:** add tab trap for modals and dialogs ([dcacbf9](https://github.com/bigcommerce/big-design/commit/dcacbf96a38bef1134e2a8dcbd986f6362e0e2b7))
- **component:** ignore theme prop overrides ([24b92f9](https://github.com/bigcommerce/big-design/commit/24b92f9873fe4f51975b7bd00300c8ce73484ea3))

### BREAKING CHANGES

- **component:** `theme` prop override is no longer supported.

## [0.5.2](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.5.1...@bigcommerce/big-design-icons@0.5.2) (2019-11-14)

### Bug Fixes

- **icons:** show proper displayName for icons ([#268](https://github.com/bigcommerce/big-design/issues/268)) ([539a02a](https://github.com/bigcommerce/big-design/commit/539a02a))

## [0.5.1](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.5.0...@bigcommerce/big-design-icons@0.5.1) (2019-11-12)

### Features

- **all:** better tree shaking ([c0998a7](https://github.com/bigcommerce/big-design/commit/c0998a7))

# [0.5.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.4.0...@bigcommerce/big-design-icons@0.5.0) (2019-11-11)

### Features

- **all:** bump styled-components peerDependency version ([fd89fa3](https://github.com/bigcommerce/big-design/commit/fd89fa3))

### BREAKING CHANGES

- **all:** bumped peer dependency of styled-components to `^4.3.0`

# [0.4.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.3.0...@bigcommerce/big-design-icons@0.4.0) (2019-10-29)

### Features

- **icons:** add ArrowDownward and ArrowUpward icons ([c34203f](https://github.com/bigcommerce/big-design/commit/c34203f))

# [0.3.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.2.1...@bigcommerce/big-design-icons@0.3.0) (2019-09-23)

### Features

- **component:** add indeterminate state to checkboxes ([#197](https://github.com/bigcommerce/big-design/issues/197)) ([5146fdb](https://github.com/bigcommerce/big-design/commit/5146fdb))

## [0.2.1](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.2.0...@bigcommerce/big-design-icons@0.2.1) (2019-09-17)

### Bug Fixes

- **icons:** use new api on icon downloader ([#195](https://github.com/bigcommerce/big-design/issues/195)) ([6bae4ae](https://github.com/bigcommerce/big-design/commit/6bae4ae))

# [0.2.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.1.2...@bigcommerce/big-design-icons@0.2.0) (2019-08-20)

### Features

- **icons:** add BaselineHelpIcon ([#180](https://github.com/bigcommerce/big-design/issues/180)) ([e2387cf](https://github.com/bigcommerce/big-design/commit/e2387cf))

## [0.1.2](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.1.1...@bigcommerce/big-design-icons@0.1.2) (2019-08-19)

### Bug Fixes

- **icons:** now treeshakeable ([#178](https://github.com/bigcommerce/big-design/issues/178)) ([fb3773d](https://github.com/bigcommerce/big-design/commit/fb3773d))

## [0.1.1](https://github.com/bigcommerce/big-design/compare/@bigcommerce/big-design-icons@0.1.0...@bigcommerce/big-design-icons@0.1.1) (2019-08-15)

### Features

- **docs:** add responsive mobile header ([#165](https://github.com/bigcommerce/big-design/issues/165)) ([dca031a](https://github.com/bigcommerce/big-design/commit/dca031a))

# 0.1.0 (2019-08-13)

### Bug Fixes

- **icons:** point to the correct type definitions ([f6ffb48](https://github.com/bigcommerce/big-design/commit/f6ffb48))
- **icons:** star icon now displays a star and not a square ([331e71b](https://github.com/bigcommerce/big-design/commit/331e71b))
- **icons:** use object style notation for icon base ([41a2638](https://github.com/bigcommerce/big-design/commit/41a2638))
- **theme:** issue with font sizes in createTheme ([#135](https://github.com/bigcommerce/big-design/issues/135)) ([313ff46](https://github.com/bigcommerce/big-design/commit/313ff46))

### Features

- **icons:** add color and size props ([ba07b38](https://github.com/bigcommerce/big-design/commit/ba07b38))
- **icons:** add initial batch of icons ([243d1a2](https://github.com/bigcommerce/big-design/commit/243d1a2))
- **icons:** add Notifications and FileCopy icons ([#103](https://github.com/bigcommerce/big-design/issues/103)) ([e385b9b](https://github.com/bigcommerce/big-design/commit/e385b9b))
- **icons:** initial package setup ([#89](https://github.com/bigcommerce/big-design/issues/89)) ([acfe8fe](https://github.com/bigcommerce/big-design/commit/acfe8fe))
- **icons:** use Icon postfix ([#97](https://github.com/bigcommerce/big-design/issues/97)) ([03772fb](https://github.com/bigcommerce/big-design/commit/03772fb))
