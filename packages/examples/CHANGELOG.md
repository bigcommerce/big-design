# Change Log

## 1.2.0

### Minor Changes

- 9789172: Move the docs site and examples app to React 19 and styled-components 6. The examples app keeps its `*` ranges on the BigDesign packages so standalone forks (CodeSandbox) resolve from the registry, with `linkWorkspacePackages: true` linking them to workspace source in-repo, and gains a Vite config with `resolve.dedupe` and `@vitejs/plugin-react` 5.

### Patch Changes

- 3e9c1e0: fix(ci): add `prettier` as a root devDependency to fix the Changesets release job

  `@changesets/cli` 3.0.0 (`@changesets/apply-release-plan` 8.0.0 → `@changesets/format` 0.1.2) added a new post-`version` step that auto-detects a formatter and runs it over the touched CHANGELOG.md files. It found the root `prettier.config.js` and picked `prettier`, then ran `pnpm exec prettier --write ...` — but `prettier` was only ever a devDependency of `packages/big-design-icons` and `packages/docs`, never the workspace root, so a clean `pnpm install --frozen-lockfile` (as CI does) never resolves a `prettier` bin at the root and `pnpm exec prettier` fails with `Command "prettier" not found`, breaking the `Changesets / Release` job on every push to `main`.

  Adding `prettier@^3.9.6` (matching the version already pinned elsewhere) as a root devDependency gives `pnpm exec prettier` something to resolve. Verified by reproducing the exact CI failure in an isolated worktree with a genuine `pnpm install --frozen-lockfile`, then confirming `pnpm exec changeset version` completes cleanly after the fix.

- b4e207d: chore(deps): batch ~20 dependency bumps, drop-in or effectively drop-in

  Patch/minor bumps and majors with no breaking API surface actually used in this repo: `styled-components` 6.5.0 → 6.5.3, `@testing-library/react` 16.3.0 → 16.3.2, `@testing-library/user-event` 14.6.1 → 14.6.5, `@testing-library/jest-dom` 6.9.1 → 7.0.1, `zustand` 5.0.11 → 5.0.15, `date-fns` 4.1.0 → 4.4.0, `downshift` 9.0.10 → 9.4.0, `@tanstack/react-virtual` 3.13.23 → 3.14.10, `focus-trap` 7.6.4 → 8.2.2, `react-intersection-observer` 10.0.0 → 11.0.0, `turbo` 2.6.1 → 2.10.11, `@swc/core` 1.15.3 → 1.16.0, `@swc/plugin-styled-components` 12.x → 13.0.0, `glob`/`fs-extra`/`rimraf` patch bumps, `@radix-ui/react-scroll-area` 1.2.9 → 1.2.18, `formik` 2.4.6 → 2.4.9, `@changesets/changelog-git` 0.2.1 → 1.0.0, `prettier` (big-design-icons devDependency) 2.x → 3.9.6, and `@types/node` bumped to the latest 24.x patch.

  Also aligns CI's pinned pnpm version (`.circleci/config.yml`) with the root `packageManager` field.

- 00fed99: chore(ci): remove Commitlint

  Drops `@commitlint/cli` and `@commitlint/config-conventional` devDependencies, deletes `commitlint.config.js`, and removes the `commitlint` CircleCI job (and its workflow entry) since it's no longer useful.

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

- 1710405: build(deps): upgrade `vite` 7.2.4 → 8.2.1 and `@vitejs/plugin-react` 5.2.0 → 6.0.5

  Vite 8's default production bundler moves from Rollup to Rolldown. No `vite.config.ts` changes were needed (no `build.rollupOptions` usage to rename to `build.rolldownOptions`), but Rolldown enforces stricter named-export validation than Rollup at build time. See the `@bigcommerce/big-design-icons` changeset in this same batch for a downstream fix that was required to keep `pnpm run build` passing under Rolldown's stricter checks.

- Updated dependencies [3e9c1e0]
- Updated dependencies [b4e207d]
- Updated dependencies [38823b2]
- Updated dependencies [86e3149]
- Updated dependencies [6bb03a2]
- Updated dependencies [915f235]
- Updated dependencies [606e210]
- Updated dependencies [753478b]
- Updated dependencies [00fed99]
- Updated dependencies [18b4d51]
- Updated dependencies [48ff345]
- Updated dependencies [92aa841]
- Updated dependencies [78b0c8d]
- Updated dependencies [a47cc5f]
- Updated dependencies [62bed89]
- Updated dependencies [a915f36]
- Updated dependencies [856d6a7]
  - @bigcommerce/big-design@5.0.0
  - @bigcommerce/big-design-icons@3.0.0
  - @bigcommerce/big-design-theme@3.0.0

## 1.1.0

### Minor Changes

- 042d470: Change the documentation and code to use Source Sans 3 instead of Source Sans Pro. Source Sans Pro is licensed by Adobe now which means we need to the utilize the open license with Source Sans 3.

### Patch Changes

- Updated dependencies [042d470]
  - @bigcommerce/big-design-theme@1.3.0
  - @bigcommerce/big-design@2.3.0

## 1.0.6

### Patch Changes

- d9afaaf: Fix codesandbox link and update deps for examples.
- Updated dependencies [01a5b20]
  - @bigcommerce/big-design-icons@1.1.0
  - @bigcommerce/big-design@1.4.2

## 1.0.5

### Patch Changes

- Updated dependencies [8e09cdf]
  - @bigcommerce/big-design@1.4.1

## 1.0.4

### Patch Changes

- Updated dependencies [f8665f3]
- Updated dependencies [d2f010d]
  - @bigcommerce/big-design-theme@1.1.0
  - @bigcommerce/big-design@1.4.0
  - @bigcommerce/big-design-icons@1.0.3

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.0.3](https://github.com/bigcommerce/big-design/compare/@bigcommerce/examples@1.0.2...@bigcommerce/examples@1.0.3) (2024-08-06)

**Note:** Version bump only for package @bigcommerce/examples

## [1.0.2](https://github.com/bigcommerce/big-design/compare/@bigcommerce/examples@1.0.1...@bigcommerce/examples@1.0.2) (2024-07-11)

**Note:** Version bump only for package @bigcommerce/examples

## [1.0.1](https://github.com/bigcommerce/big-design/compare/@bigcommerce/examples@1.0.0...@bigcommerce/examples@1.0.1) (2024-06-11)

**Note:** Version bump only for package @bigcommerce/examples

# [1.0.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/examples@0.26.1...@bigcommerce/examples@1.0.0) (2024-04-17)

**Note:** Version bump only for package @bigcommerce/examples

## [0.26.1](https://github.com/bigcommerce/big-design/compare/@bigcommerce/examples@0.26.0...@bigcommerce/examples@0.26.1) (2024-04-09)

### Bug Fixes

- typescript build output with wrong imports ([a812497](https://github.com/bigcommerce/big-design/commit/a81249798e20c10754c938b2b3d3dcc95d81aa0c))

# [0.26.0](https://github.com/bigcommerce/big-design/compare/@bigcommerce/examples@0.25.2...@bigcommerce/examples@0.26.0) (2024-04-02)

**Note:** Version bump only for package @bigcommerce/examples

## [0.25.2](https://github.com/chanceaclark/big-design/compare/@bigcommerce/examples@0.25.1...@bigcommerce/examples@0.25.2) (2024-01-23)

**Note:** Version bump only for package @bigcommerce/examples

## [0.25.1](https://github.com/chanceaclark/big-design/compare/@bigcommerce/examples@0.25.0...@bigcommerce/examples@0.25.1) (2024-01-02)

**Note:** Version bump only for package @bigcommerce/examples

# [0.25.0](https://github.com/deini/big-design/compare/@bigcommerce/examples@0.24.0...@bigcommerce/examples@0.25.0) (2023-10-09)

**Note:** Version bump only for package @bigcommerce/examples

# [0.24.0](https://github.com/jorgemoya/big-design/compare/@bigcommerce/examples@0.23.2...@bigcommerce/examples@0.24.0) (2023-07-26)

**Note:** Version bump only for package @bigcommerce/examples

## [0.23.2](https://github.com/chanceaclark/big-design/compare/@bigcommerce/examples@0.23.1...@bigcommerce/examples@0.23.2) (2023-06-14)

**Note:** Version bump only for package @bigcommerce/examples

## [0.23.1](https://github.com/bigcommerce/big-design/compare/@bigcommerce/examples@0.23.0...@bigcommerce/examples@0.23.1) (2023-06-09)

**Note:** Version bump only for package @bigcommerce/examples

# [0.23.0](https://github.com/deini/big-design/compare/@bigcommerce/examples@0.22.0...@bigcommerce/examples@0.23.0) (2023-04-05)

**Note:** Version bump only for package @bigcommerce/examples

# [0.22.0](https://github.com/chanceaclark/big-design/compare/@bigcommerce/examples@0.21.3...@bigcommerce/examples@0.22.0) (2023-01-09)

**Note:** Version bump only for package @bigcommerce/examples

## [0.21.3](https://github.com/chanceaclark/big-design/compare/@bigcommerce/examples@0.21.2...@bigcommerce/examples@0.21.3) (2022-11-03)

**Note:** Version bump only for package @bigcommerce/examples

## [0.21.2](https://github.com/chanceaclark/big-design/compare/@bigcommerce/examples@0.21.1...@bigcommerce/examples@0.21.2) (2022-10-27)

**Note:** Version bump only for package @bigcommerce/examples

## [0.21.1](https://github.com/chanceaclark/big-design/compare/@bigcommerce/examples@0.21.0...@bigcommerce/examples@0.21.1) (2022-10-06)

**Note:** Version bump only for package @bigcommerce/examples

# [0.21.0](https://github.com/chanceaclark/big-design/compare/@bigcommerce/examples@0.20.1...@bigcommerce/examples@0.21.0) (2022-09-27)

### Features

- **deps:** react@18 support ([51c688b](https://github.com/chanceaclark/big-design/commit/51c688b282277964eb01c1ed67c5c27cc0bc4c3e))

## [0.20.1](https://github.com/chanceaclark/big-design/compare/@bigcommerce/examples@0.20.0...@bigcommerce/examples@0.20.1) (2022-09-27)

**Note:** Version bump only for package @bigcommerce/examples

# [0.20.0](/compare/@bigcommerce/examples@0.19.2-alpha.0...@bigcommerce/examples@0.20.0) (2022-08-17)

**Note:** Version bump only for package @bigcommerce/examples

## [0.19.2-alpha.0](https://github.com/chanceaclark/big-design/compare/@bigcommerce/examples@0.19.1...@bigcommerce/examples@0.19.2-alpha.0) (2022-08-10)

**Note:** Version bump only for package @bigcommerce/examples

## [0.19.1](https://github.com/deini/big-design/compare/@bigcommerce/examples@0.19.0...@bigcommerce/examples@0.19.1) (2022-07-12)

**Note:** Version bump only for package @bigcommerce/examples

# [0.19.0](https://github.com/chanceaclark/big-design/compare/@bigcommerce/examples@0.18.1...@bigcommerce/examples@0.19.0) (2022-07-06)

**Note:** Version bump only for package @bigcommerce/examples

## [0.18.1](https://github.com/chanceaclark/big-design/compare/@bigcommerce/examples@0.18.0...@bigcommerce/examples@0.18.1) (2022-06-10)

**Note:** Version bump only for package @bigcommerce/examples

# [0.18.0](https://github.com/chanceaclark/big-design/compare/@bigcommerce/examples@0.17.3-alpha.2...@bigcommerce/examples@0.18.0) (2022-05-11)

**Note:** Version bump only for package @bigcommerce/examples

## [0.17.3-alpha.2](https://github.com/rtalvarez/big-design/compare/@bigcommerce/examples@0.17.3-alpha.1...@bigcommerce/examples@0.17.3-alpha.2) (2022-03-22)

### Bug Fixes

- upgrade yup from 0.28.5 to 0.32.11 ([2441def](https://github.com/rtalvarez/big-design/commit/2441def54a9ecd4adbc33e0f968f0e93e6044645))

## [0.17.3-alpha.1](https://github.com/rtalvarez/big-design/compare/@bigcommerce/examples@0.17.3-alpha.0...@bigcommerce/examples@0.17.3-alpha.1) (2022-01-14)

**Note:** Version bump only for package @bigcommerce/examples

## [0.17.3-alpha.0](https://github.com/rtalvarez/big-design/compare/@bigcommerce/examples@0.17.2...@bigcommerce/examples@0.17.3-alpha.0) (2021-10-28)

**Note:** Version bump only for package @bigcommerce/examples

## [0.17.2](https://github.com/chanceaclark/big-design/compare/@bigcommerce/examples@0.17.1...@bigcommerce/examples@0.17.2) (2021-09-03)

**Note:** Version bump only for package @bigcommerce/examples

## [0.17.1](https://github.com/chanceaclark/big-design/compare/@bigcommerce/examples@0.17.0...@bigcommerce/examples@0.17.1) (2021-08-23)

**Note:** Version bump only for package @bigcommerce/examples

# [0.17.0](https://github.com/chanceaclark/big-design/compare/@bigcommerce/examples@0.17.0-alpha.4...@bigcommerce/examples@0.17.0) (2021-08-04)

**Note:** Version bump only for package @bigcommerce/examples

# [0.17.0-alpha.4](https://github.com/chanceaclark/big-design/compare/@bigcommerce/examples@0.17.0-alpha.3...@bigcommerce/examples@0.17.0-alpha.4) (2021-08-02)

### chore

- **deps:** upgrade to styled-components v5 ([#566](https://github.com/chanceaclark/big-design/issues/566)) ([dd83711](https://github.com/chanceaclark/big-design/commit/dd83711797eb8aaa7a8406eebf1383116bff2420))

### BREAKING CHANGES

- **deps:** You will need to update to styled-components v5. In addition,
  you will need to import the base fonts in your <head> element.
  See the "Getting Started" page or README.md for an example.

# [0.17.0-alpha.3](https://github.com/chanceaclark/big-design/compare/@bigcommerce/examples@0.17.0-alpha.2...@bigcommerce/examples@0.17.0-alpha.3) (2021-07-13)

**Note:** Version bump only for package @bigcommerce/examples

# [0.17.0-alpha.2](https://github.com/chanceaclark/big-design/compare/@bigcommerce/examples@0.17.0-alpha.1...@bigcommerce/examples@0.17.0-alpha.2) (2021-07-08)

**Note:** Version bump only for package @bigcommerce/examples

# [0.17.0-alpha.1](https://github.com/chanceaclark/big-design/compare/@bigcommerce/examples@0.17.0-alpha.0...@bigcommerce/examples@0.17.0-alpha.1) (2021-07-06)

**Note:** Version bump only for package @bigcommerce/examples

# [0.17.0-alpha.0](https://github.com/chanceaclark/big-design/compare/@bigcommerce/examples@0.16.2...@bigcommerce/examples@0.17.0-alpha.0) (2021-06-10)

**Note:** Version bump only for package @bigcommerce/examples

## [0.16.2](https://github.com/chanceaclark/big-design/compare/@bigcommerce/examples@0.16.1...@bigcommerce/examples@0.16.2) (2021-04-14)

**Note:** Version bump only for package @bigcommerce/examples

## [0.16.1](https://github.com/chanceaclark/big-design/compare/@bigcommerce/examples@0.16.0...@bigcommerce/examples@0.16.1) (2021-03-29)

**Note:** Version bump only for package @bigcommerce/examples

# [0.16.0](https://github.com/chanceaclark/big-design/compare/@bigcommerce/examples@0.15.0...@bigcommerce/examples@0.16.0) (2021-03-08)

**Note:** Version bump only for package @bigcommerce/examples

# [0.15.0](https://github.com/deini/big-design/compare/@bigcommerce/examples@0.14.0...@bigcommerce/examples@0.15.0) (2021-02-11)

**Note:** Version bump only for package @bigcommerce/examples

# [0.14.0](https://github.com/deini/big-design/compare/@bigcommerce/examples@0.13.2...@bigcommerce/examples@0.14.0) (2021-01-13)

**Note:** Version bump only for package @bigcommerce/examples

## [0.13.2](https://github.com/chanceaclark/big-design/compare/@bigcommerce/examples@0.13.1...@bigcommerce/examples@0.13.2) (2020-12-28)

**Note:** Version bump only for package @bigcommerce/examples

## [0.13.1](https://github.com/chanceaclark/big-design/compare/@bigcommerce/examples@0.13.0...@bigcommerce/examples@0.13.1) (2020-12-21)

**Note:** Version bump only for package @bigcommerce/examples

# [0.13.0](https://github.com/chanceaclark/big-design/compare/@bigcommerce/examples@0.13.0-alpha.1...@bigcommerce/examples@0.13.0) (2020-12-17)

**Note:** Version bump only for package @bigcommerce/examples

# [0.13.0-alpha.1](https://github.com/chanceaclark/big-design/compare/@bigcommerce/examples@0.13.0-alpha.0...@bigcommerce/examples@0.13.0-alpha.1) (2020-12-15)

**Note:** Version bump only for package @bigcommerce/examples

# [0.13.0-alpha.0](https://github.com/deini/big-design/compare/@bigcommerce/examples@0.12.0...@bigcommerce/examples@0.13.0-alpha.0) (2020-12-09)

**Note:** Version bump only for package @bigcommerce/examples

# [0.12.0](https://github.com/chanceaclark/big-design/compare/@bigcommerce/examples@0.11.0...@bigcommerce/examples@0.12.0) (2020-11-12)

**Note:** Version bump only for package @bigcommerce/examples

# [0.11.0](https://github.com/deini/big-design/compare/@bigcommerce/examples@0.10.8...@bigcommerce/examples@0.11.0) (2020-10-16)

**Note:** Version bump only for package @bigcommerce/examples

## [0.10.8](https://github.com/deini/big-design/compare/@bigcommerce/examples@0.10.7...@bigcommerce/examples@0.10.8) (2020-10-14)

**Note:** Version bump only for package @bigcommerce/examples

## [0.10.7](https://github.com/deini/big-design/compare/@bigcommerce/examples@0.10.6...@bigcommerce/examples@0.10.7) (2020-10-07)

**Note:** Version bump only for package @bigcommerce/examples

## [0.10.6](https://github.com/chanceaclark/big-design/compare/@bigcommerce/examples@0.10.5...@bigcommerce/examples@0.10.6) (2020-10-02)

**Note:** Version bump only for package @bigcommerce/examples

## [0.10.5](https://github.com/chanceaclark/big-design/compare/@bigcommerce/examples@0.10.4...@bigcommerce/examples@0.10.5) (2020-09-25)

**Note:** Version bump only for package @bigcommerce/examples

## [0.10.4](https://github.com/deini/big-design/compare/@bigcommerce/examples@0.10.3...@bigcommerce/examples@0.10.4) (2020-09-16)

**Note:** Version bump only for package @bigcommerce/examples

## [0.10.3](https://github.com/chanceaclark/big-design/compare/@bigcommerce/examples@0.10.2...@bigcommerce/examples@0.10.3) (2020-09-09)

**Note:** Version bump only for package @bigcommerce/examples

## [0.10.2](https://github.com/deini/big-design/compare/@bigcommerce/examples@0.10.1...@bigcommerce/examples@0.10.2) (2020-09-03)

**Note:** Version bump only for package @bigcommerce/examples

## [0.10.1](https://github.com/deini/big-design/compare/@bigcommerce/examples@0.10.0...@bigcommerce/examples@0.10.1) (2020-08-31)

**Note:** Version bump only for package @bigcommerce/examples

# [0.10.0](https://github.com/deini/big-design/compare/@bigcommerce/examples@0.9.0...@bigcommerce/examples@0.10.0) (2020-08-25)

**Note:** Version bump only for package @bigcommerce/examples

# [0.9.0](https://github.com/chanceaclark/big-design/compare/@bigcommerce/examples@0.8.2...@bigcommerce/examples@0.9.0) (2020-08-13)

**Note:** Version bump only for package @bigcommerce/examples

## [0.8.2](https://github.com/chanceaclark/big-design/compare/@bigcommerce/examples@0.8.1...@bigcommerce/examples@0.8.2) (2020-07-31)

**Note:** Version bump only for package @bigcommerce/examples

## [0.8.1](https://github.com/deini/big-design/compare/@bigcommerce/examples@0.8.0...@bigcommerce/examples@0.8.1) (2020-07-14)

**Note:** Version bump only for package @bigcommerce/examples

# [0.8.0](https://github.com/deini/big-design/compare/@bigcommerce/examples@0.7.0...@bigcommerce/examples@0.8.0) (2020-07-14)

**Note:** Version bump only for package @bigcommerce/examples

# [0.7.0](https://github.com/chanceaclark/big-design/compare/@bigcommerce/examples@0.6.2...@bigcommerce/examples@0.7.0) (2020-06-16)

**Note:** Version bump only for package @bigcommerce/examples

## [0.6.2](https://github.com/deini/big-design/compare/@bigcommerce/examples@0.6.1...@bigcommerce/examples@0.6.2) (2020-05-07)

**Note:** Version bump only for package @bigcommerce/examples

## [0.6.1](https://github.com/deini/big-design/compare/@bigcommerce/examples@0.6.0...@bigcommerce/examples@0.6.1) (2020-04-30)

**Note:** Version bump only for package @bigcommerce/examples

# [0.6.0](https://github.com/deini/big-design/compare/@bigcommerce/examples@0.5.0...@bigcommerce/examples@0.6.0) (2020-04-29)

**Note:** Version bump only for package @bigcommerce/examples

# [0.5.0](https://github.com/deini/big-design/compare/@bigcommerce/examples@0.4.2...@bigcommerce/examples@0.5.0) (2020-04-20)

**Note:** Version bump only for package @bigcommerce/examples

## [0.4.2](https://github.com/deini/big-design/compare/@bigcommerce/examples@0.4.1...@bigcommerce/examples@0.4.2) (2020-04-13)

**Note:** Version bump only for package @bigcommerce/examples

## [0.4.1](https://github.com/deini/big-design/compare/@bigcommerce/examples@0.4.0...@bigcommerce/examples@0.4.1) (2020-03-25)

**Note:** Version bump only for package @bigcommerce/examples

# [0.4.0](https://github.com/deini/big-design/compare/@bigcommerce/examples@0.3.0...@bigcommerce/examples@0.4.0) (2020-03-25)

**Note:** Version bump only for package @bigcommerce/examples

# [0.3.0](https://github.com/chanceaclark/big-design/compare/@bigcommerce/examples@0.2.0...@bigcommerce/examples@0.3.0) (2020-02-21)

### Bug Fixes

- **examples:** fix usage and add ci step ([#337](https://github.com/chanceaclark/big-design/issues/337)) ([9ade663](https://github.com/chanceaclark/big-design/commit/9ade663ad9f4d56ed10ebaf12beaed9b9c0a480d))
- **examples:** remove danling comma ([#338](https://github.com/chanceaclark/big-design/issues/338)) ([e136b7f](https://github.com/chanceaclark/big-design/commit/e136b7fe328ec73bcf9ea6e5a34bc2ce5218b512))

### Features

- **component:** convert Dropdown/Select to FC and add MultiSelect ([#303](https://github.com/chanceaclark/big-design/issues/303)) ([0ab0e50](https://github.com/chanceaclark/big-design/commit/0ab0e50878405e3da18fbf4e6dc934539a0d6446))

### BREAKING CHANGES

- **component:** `Selects` and `Multiselects` have been split into its own component. Props changed for `Dropdowns` & `Selects`.

** Dropdown **

Old:

```jsx
<Dropdown
  maxHeight={250}
  options={[
    { content: 'Edit', onClick: (item) => item, icon: <EditIcon />, value: 'edit' },
    {
      content: 'Duplicate',
      onClick: (item) => item,
      value: 'duplicate',
      icon: <FileCopyIcon />,
    },
    {
      content: 'Copy',
      onClick: (item) => item,
      value: 'copy',
      icon: <AssignmentIcon />,
      disabled: true,
      tooltip: 'You cannot copy this item...',
    },
    {
      content: 'Delete',
      onClick: (item) => item,
      value: 'delete',
      icon: <DeleteIcon />,
      actionType: 'destructive',
    },
    {
      content: 'Link',
      icon: <OpenInNewIcon />,
      type: 'link',
      url: '#',
    },
  ]}
  placement="bottom-start"
  trigger={<Button>Open Menu</Button>}
/>
```

New:

```jsx
<Dropdown
  maxHeight={250}
  items={[
    { content: 'Edit', onItemClick: (item) => item, hash: 'edit', icon: <EditIcon /> },
    {
      content: 'Duplicate',
      onItemClick: (item) => item,
      hash: 'duplicate',
      icon: <FileCopyIcon />,
    },
    {
      content: 'Copy',
      onItemClick: (item) => item,
      hash: 'copy',
      icon: <AssignmentIcon />,
      disabled: true,
      tooltip: 'You cannot copy this item...',
    },
    {
      content: 'Delete',
      onItemClick: (item) => item,
      hash: 'delete',
      icon: <DeleteIcon />,
      actionType: 'destructive',
    },
    {
      content: 'Link',
      icon: <OpenInNewIcon />,
      type: 'link',
      url: '#',
    },
  ]}
  placement="bottom-start"
  toggle={<Button>Open Menu</Button>}
/>
```

** Select **

Old:

```jsx
<Select
  action={{
    actionType: 'destructive',
    content: 'Remove Country',
    icon: <DeleteIcon />,
    onClick: () => null,
  }}
  label="Countries"
  maxHeight={300}
  onChange={handleChange}
  options={[
    { value: 'us', content: 'United States' },
    { value: 'mx', content: 'Mexico' },
    { value: 'ca', content: 'Canada' },
    { value: 'ru', content: 'Russia', disabled: true },
  ]}
  placeholder={'Choose country'}
  placement={'bottom-start'}
  required
  value={value}
/>
```

New:

```jsx
<Select
  action={{
    actionType: 'destructive',
    content: 'Remove Country',
    icon: <DeleteIcon />,
    onActionClick: () => null,
  }}
  label="Countries"
  maxHeight={300}
  onOptionChange={handleChange}
  options={[
    { value: 'us', content: 'United States' },
    { value: 'mx', content: 'Mexico' },
    { value: 'ca', content: 'Canada' },
    { value: 'ru', content: 'Russia', disabled: true },
  ]}
  placeholder={'Choose country'}
  placement={'bottom-start'}
  required
  value={value}
/>
```

** MultiSelect **

Old:

```jsx
<Select
  action={{
    actionType: 'destructive',
    content: 'Remove Country',
    icon: <DeleteIcon />,
    onClick: () => null,
  }}
  label="Countries"
  maxHeight={300}
  multi={true}
  onChange={handleChange}
  options={[
    { value: 'us', content: 'United States' },
    { value: 'mx', content: 'Mexico' },
    { value: 'ca', content: 'Canada' },
    { value: 'ru', content: 'Russia', disabled: true },
  ]}
  placeholder={'Choose country'}
  placement={'bottom-start'}
  required
  value={value}
/>
```

New:

```jsx
<MultiSelect
    action={{
        actionType: 'destructive' as 'destructive',
        content: 'Remove Country',
        icon: <DeleteIcon />,
        onActionClick: () => null,
    }}
    filterable={true}
    label="Countries"
    maxHeight={300}
    onOptionsChange={handleChange}
    options={[
        { value: 'us', content: 'United States' },
        { value: 'mx', content: 'Mexico' },
        { value: 'ca', content: 'Canada' },
        { value: 'ru', content: 'England' },
    ]}
    placeholder={'Choose country'}
    placement={'bottom-start'}
    required
    value={value}
/>
```

# [0.2.0](https://github.com/chanceaclark/big-design/compare/@bigcommerce/examples@0.1.0...@bigcommerce/examples@0.2.0) (2020-02-06)

### Bug Fixes

- **examples:** use destructive actionType for buttons ([#302](https://github.com/chanceaclark/big-design/issues/302)) ([1bf028d](https://github.com/chanceaclark/big-design/commit/1bf028d618069f62077014cb27b364bbdafd34c7))

# 0.1.0 (2019-12-09)

### Bug Fixes

- **examples:** pin to correct version of bd ([8486325](https://github.com/deini/big-design/commit/8486325d46cf544283ee4b19dc8bbc24dac117d1))

### Features

- **example:** setup CodeSandbox example ([#281](https://github.com/deini/big-design/issues/281)) ([7e36d99](https://github.com/deini/big-design/commit/7e36d99c63a9544c5a02db933276d9990a8d1e1b))
