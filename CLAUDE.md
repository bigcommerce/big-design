# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

BigDesign is BigCommerce's React component library / design system. See `AGENTS.md` for additional agent-facing conventions; this file focuses on the architecture and commands you need to be productive.

## Commands

Run all commands from the repository root unless noted. The workspace is orchestrated by **Turborepo** + **pnpm workspaces**, and the package manager is pinned (`pnpm@10.26.2`).

```bash
# First-time setup — icons MUST be built before other packages
pnpm install
pnpm run build:icons

# Develop the docs site against live big-design source (watch mode)
pnpm run start                    # runs turbo start --filter @bigcommerce/docs

# Build everything
pnpm run build

# Tests
pnpm run test                                    # all packages
pnpm -F @bigcommerce/big-design run test         # single package
pnpm -F @bigcommerce/big-design run test:watch   # watch mode
pnpm -F @bigcommerce/big-design exec jest path/to/file.spec.tsx   # single file
pnpm -F @bigcommerce/big-design exec jest -t 'render default button'  # by test name
pnpm run ci:test                                 # coverage (CI mode)

# Updating jest-styled-components snapshots after style changes
cd packages/big-design && pnpm run test --update-snapshot

# Lint + typecheck
pnpm run lint
pnpm run typecheck

# Changesets — required for any user-facing change in a published package
pnpm changeset                    # author a changeset (follow prompts)
```

Releases are automated: maintainers merge the open "Changesets" PR and packages publish to npm + docs deploy.

## Monorepo Layout

Packages live under `packages/`. Each is independently versioned via Changesets.

| Package | Published | Purpose |
|---|---|---|
| `big-design` | `@bigcommerce/big-design` | React component library (54 components). Source of truth for the design system. |
| `big-design-theme` | `@bigcommerce/big-design-theme` | Default theme tokens (colors, spacing, typography, borders, breakpoints) + styled-system helpers. |
| `big-design-icons` | `@bigcommerce/big-design-icons` | SVG icon components generated from `svgs/` and `flags/` via scripts. **Must be built first** — other packages consume the generated dist. |
| `big-design-patterns` | `@bigcommerce/big-design-patterns` | Higher-level composed patterns built on top of `big-design`. |
| `docs` | `@bigcommerce/docs` (private) | Next.js documentation site at bigcommerce.github.io/big-design. Live code examples in `packages/docs/pages/<component>.tsx`. |
| `configs` | `@bigcommerce/configs` (private) | Shared babel / eslint / jest / ts configs consumed by other packages via `workspace:^`. |
| `pack` | `@bigcommerce/pack` (private) | `big-design-prepack` / `big-design-postpack` scripts run during npm publish. |
| `examples` | — | Example apps consuming BigDesign. |

Inter-package deps use the `workspace:^` protocol. Turbo's `build` task declares `dependsOn: ["^build"]`, so build order is resolved automatically — but if you run a sub-package build directly, ensure `big-design-icons` is built first.

## Component Architecture (`packages/big-design/src/`)

```
components/<Name>/
  <Name>.tsx          # implementation; exports the component + props interface
  styled.tsx          # all styled-components live here; uses theme tokens
  index.ts            # public exports (often re-exports type ComponentProps)
  private.ts          # optional — escape hatch exports for advanced consumers (e.g. StyleableButton)
  spec.tsx            # Jest + React Testing Library + jest-styled-components
  __snapshots__/      # 1–2 snapshots per spec, not exhaustive
helpers/              # margin/padding/spacing/display/transitions system props
hooks/                # shared hooks (useComponentSize, useDidUpdate, useEventCallback, etc.)
managers/             # imperative APIs (e.g. alerts manager) exported alongside components
types/, utils/        # cross-component primitives
```

The top-level `src/index.ts` re-exports `components`, `managers`, and `helpers` — these are the public surface.

### Conventions worth knowing before editing components

- **Public components strip `className` and `style`.** See `Button.tsx`: `Button` wraps `StyleableButton`, dropping both props by default. `StyleableButton` (exposed via `private.ts`) is the escape hatch for consumers who need to style with `styled(...)`. Do not start forwarding `className`/`style` on a public component without an explicit reason.
- **All styling goes through `@bigcommerce/big-design-theme` tokens** (`theme.colors`, `theme.spacing`, `theme.typography`, `theme.border`, etc.) inside `styled.tsx`. Never hard-code colors or pixel values.
- **Spacing/layout via system props, not directional CSS.** Components accept logical `margin`/`padding` props through the helpers (`withMargins`, `withPaddings`) rather than receiving raw CSS.
- **Snapshot tests are minimal** — 1–2 per spec for representative styled output; behavior is asserted with RTL queries (`getByRole`, etc.).
- `peerDependencies`: React 18 and **styled-components 5.x**. Do not introduce styled-components v6 APIs.

### Adding a new component

1. Open a GitHub issue first (per `CONTRIBUTING.md`) so the API can be discussed before implementation.
2. Scaffold the `components/<Name>/` directory matching the structure above.
3. Add a page in `packages/docs/pages/<name>.tsx` with live examples; add a prop table under `packages/docs/PropTables/` if applicable.
4. Author a changeset (`pnpm changeset`) describing the change and selecting the affected package(s).

## Commit Conventions

Commitlint (`commitlint.config.js`) enforces conventional commits with a restricted scope enum:

```
all | ci | component | configs | deps | deps-dev | docs | examples | icons | pack | patterns | release | theme
```

Body lines are capped at 180 chars. Use the scope that matches the package you're touching (`component` for `big-design`, `theme`, `icons`, `patterns`, `docs`, `configs`, etc.).

## CI

CircleCI (`.circleci/config.yml`) runs build-icons → build → lint + typecheck + tests in parallel. Node 24.11.0 in CI; repo `.nvmrc` may differ for local dev — check before assuming.
