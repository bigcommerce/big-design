# @bigcommerce/big-design-patterns

## 7.0.0

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

- 38823b2: Fix React `act(...)` warnings in tests for `Dropdown`, `Header`, `Table`, and `MultiSelect`.

  Each of these components mounts a `@floating-ui/react` positioned element even while closed (to have a ref for positioning), which triggers an async state update right after mount. Tests that synchronously rendered and asserted without ever giving that update a chance to flush inside an `act(...)` boundary logged a `console.error`. Switched the affected assertions to `screen.findBy*` queries, which flush the pending update via Testing Library's own `act`-wrapped polling instead of adding a bare `act(() => Promise.resolve())` flush.

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

## 6.0.0

### Major Changes

- d737812: Require styled-components 6: the `styled-components` peer dependency range moves from `^5.3.5` to `^6.1.14` across all four packages. Consumers must upgrade to styled-components 6 to use this release (v6 supports both React 18 and, ahead of our upcoming React 19 flip, React 19 — while v5 does not support React 19). Along with the peer bump, the packages now build and test against styled-components `^6.4.0`, `@types/styled-components` is dropped (v6 ships its own types), and `jest-styled-components` moves to `^7.4.0` for v6 support (7.4.0 also fixes `toHaveStyleRule`'s `media` option against stylis v4's spaced media-query output). `createTheme()` now returns `keyframes` as a plain object copy rather than a frozen module-namespace object, since styled-components 6 deep-merges themes when folding `defaultProps` and a getter-only namespace object makes that merge throw; the shape and values of `theme.keyframes` are unchanged.

### Patch Changes

- a1ac68f: Finish the transient-props migration for prop leaks that only surface under styled-components 6 and that `jest-fail-on-console` cannot catch (React only warns on camelCase or boolean-valued unknown props, so all-lowercase string/object props leak silently): `$`-prefix `variant` (Lozenge, Modal, StatusMessage), `percent` (ProgressBar), `isInvalid`/`isSelected` (Worksheet RowStatus), `isValid` (FileUploader's `StyledFile`), and bare `ellipsis` passes to Typography internals (FeatureSet Tag, Tree TreeNode); destructure `actions` (Message, InlineMessage) and `text` (the `<StyledLink {...link}>` sites in Alert/Message/InlineMessage/Form Description, and Panel's action button) out of blind spreads; and replace `.attrs({ theme: defaultTheme })` with the repo-standard `defaultProps` assignment (FeatureSet, StatelessPagination, patterns' Page/Header/ActionBar) — on v6 the attrs object leaks `theme="[object Object]"` onto the DOM, and unlike `defaultProps` it also overrode `ThemeProvider` for those components. `Link` now also binds its forwarded ref, which v5's attribute filtering silently dropped, so `<Link ref>` attaches for the first time. Fixing the bare `ellipsis` passes also restores text truncation on Tree node labels and FeatureSet tags, which broke when Typography's styled internals moved to `$ellipsis` (the two internal call sites were missed, so the truncation CSS silently stopped applying). No public API change; aside from that restored truncation styling, DOM and CSS output on styled-components 5 are unchanged.
- 9107fa6: `$`-prefix `StyledPageBackground`'s `background` prop ahead of styled-components 6 (LTRAC-1396 follow-up). Public `PageProps.background` is unchanged.
- Updated dependencies [5d5322c]
- Updated dependencies [9d91895]
- Updated dependencies [20e27ac]
- Updated dependencies [6639ca2]
- Updated dependencies [a1ac68f]
- Updated dependencies [d737812]
- Updated dependencies [0608331]
- Updated dependencies [39f59f4]
- Updated dependencies [0aa3c04]
- Updated dependencies [15d44ac]
- Updated dependencies [e639408]
- Updated dependencies [a565ce3]
- Updated dependencies [c1b0390]
- Updated dependencies [4a7a8e7]
- Updated dependencies [9633080]
- Updated dependencies [8885756]
- Updated dependencies [a3d820e]
- Updated dependencies [3b92abf]
- Updated dependencies [f3c77e0]
- Updated dependencies [1c41421]
- Updated dependencies [847e43a]
- Updated dependencies [99f5684]
- Updated dependencies [5a45204]
- Updated dependencies [08002ed]
  - @bigcommerce/big-design@4.0.0
  - @bigcommerce/big-design-icons@2.0.0
  - @bigcommerce/big-design-theme@2.0.0

## 5.0.0

### Patch Changes

- Updated dependencies [de269fd]
- Updated dependencies [54b9cec]
  - @bigcommerce/big-design@3.0.0

## 4.0.0

### Patch Changes

- Updated dependencies [758f850]
- Updated dependencies [26a1dd0]
- Updated dependencies [a109a17]
  - @bigcommerce/big-design@2.1.0

## 3.0.1

### Patch Changes

- Updated dependencies [5a5c9b7]
  - @bigcommerce/big-design-icons@1.4.0
  - @bigcommerce/big-design@2.0.1

## 3.0.0

### Patch Changes

- Updated dependencies [9d73348]
- Updated dependencies [0d23a03]
- Updated dependencies [75fe92a]
- Updated dependencies [b78ce1b]
- Updated dependencies [a7bdf12]
  - @bigcommerce/big-design@2.0.0

## 2.1.0

### Minor Changes

- 775df8a: Created lozenge component to indicate feature lifecycle status

### Patch Changes

- 3ff3c7b: Overrides the consecutive button margins within the page header component. The flex wrapper should handle the gap between the buttons.
- Updated dependencies [775df8a]
- Updated dependencies [0c11db0]
  - @bigcommerce/big-design@1.8.0
  - @bigcommerce/big-design-icons@1.3.0

## 2.0.6

### Patch Changes

- Updated dependencies [98fbd46]
  - @bigcommerce/big-design-icons@1.2.2
  - @bigcommerce/big-design@1.7.1

## 2.0.5

### Patch Changes

- Updated dependencies [65f1431]
- Updated dependencies [5e0589f]
  - @bigcommerce/big-design@1.7.0

## 2.0.4

### Patch Changes

- Updated dependencies [69e7772]
  - @bigcommerce/big-design-icons@1.2.1
  - @bigcommerce/big-design@1.6.2

## 2.0.3

### Patch Changes

- cb84b19: Prevent the Header component from unnecessary re-renders and avoiding redundant updates
- Updated dependencies [0f8cf34]
  - @bigcommerce/big-design-icons@1.2.0
  - @bigcommerce/big-design@1.6.1

## 2.0.2

### Patch Changes

- Updated dependencies [1d0d843]
- Updated dependencies [1d0d843]
- Updated dependencies [14f3183]
  - @bigcommerce/big-design@1.6.0

## 2.0.1

### Patch Changes

- Updated dependencies [e860150]
  - @bigcommerce/big-design@1.5.0

## 2.0.0

### Patch Changes

- Updated dependencies [01a5b20]
  - @bigcommerce/big-design-icons@1.1.0
  - @bigcommerce/big-design@1.4.2

## 1.1.1

### Patch Changes

- eef4d38: Fix header wrapping on smaller screens
- 66bc0c8: Fixed page width definition to expand to the available area

## 1.1.0

### Minor Changes

- fd0ab6e: Added ActionBar component to complement the overall Page pattern

### Patch Changes

- a3e0fda: Updates the `Page` and `ActionBar` components to work outside of iframes. In the context of our Control Panel, we may have pages that are directly rendered. This allows a "fixed" position item to float only within the page context.
- 14ddc22: Removes unused PropsWithChildren type.
- Updated dependencies [8e09cdf]
  - @bigcommerce/big-design@1.4.1

## 1.0.0

### Major Changes

- cc19989: Releases `@bigcommerce/big-design-pattern`, a collections of useful patterns for BigDesign.

  ### New components:

  #### `Header`

  A header component that can be used to display a title, description, and actions.

  ```tsx
  import { Text, Link } from '@bigcommerce/big-design';
  import { AddIcon. ArrowDropDownIcon } from '@bigcommerce/big-design-icons';
  import { Header } from '@bigcommerce/big-design-patterns';

  export const Component = () => {
    return (
      <Header
        actions={[
          {
            text: 'Main action',
            variant: 'primary',
            iconLeft: <AddIcon />,
          },
          {
            items: [],
            toggle: {
              text: 'Secondary',
              variant: 'secondary',
              iconRight: <ArrowDropDownIcon />,
            },
          },
        ]}
        backLink={{
          text: 'Back link',
          href: '#',
          onClick: () => {
            window.alert('Back button clicked');
          },
        }}
        badge={{
          variant: 'primary',
          label: 'Beta',
        }}
        description={
          <Text>
            Main description of the page. It provides a comprehensive overview, accurately capturing
            the essence of the topic in a concise manner.{' '}
            <Link external={true} href="#" target="_blank">
              Learn more
            </Link>
          </Text>
        }
        icon={<img alt="" height={40} src="logo.svg" width={40} />}
        title="Page Title"
      />
    );
  };
  ```

  #### `Page`

  A page component that can be used to display a header and main content.

  ```tsx
  import { Panel } from '@bigcommerce/big-design';
  import { Page, Header } from '@bigcommerce/big-design-patterns';

  export const Component = () => {
    return (
      <Page
        background={{
          src: 'background.jpg',
        }}
        header={<Header {...} />}
        message={{
          header: 'Optional headline',
          type: 'info',
          messages: [
            { text: 'Required description copy.', link: { text: 'Optional link', href: '#' } },
          ],
        }}
      >
        <Panel header="Main content">
          ...
        </Panel>
      </Page>
    );
  };
  ```
