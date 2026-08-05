# Tailwind Migration Map

Last updated: 2026-05-15

This document is the high-level migration map. It spawns epics and tasks. Implementation detail lives in per-epic plans, not here.

## Goal

Convert `big-design` from styled-components to Tailwind, ending in `v3.0.0` with no `styled-components` peer dependency.

## Findings (codebase review)

- 54 components under `packages/big-design/src/components/`, each with its own `styled.tsx`.
- `styled-components@5` is declared in `peerDependencies` in `packages/big-design/package.json`. Removing it is a breaking change for every consumer.
- `@bigcommerce/big-design-theme` is a separately published package. Tokens are consumed as JavaScript objects today (`({ theme }) => theme.colors.primary40`), not as CSS variables. Theme is exposed via styled-components' `ThemeProvider` pattern.
- `@bigcommerce/big-design-patterns` ships its own styled-components on top of `big-design`. Migration cannot complete until patterns is ported.
- `@bigcommerce/docs` (Next.js docs site) is itself a consumer of `big-design`. It surfaces every breaking change before external consumers see it.
- `jest-styled-components` snapshots exist on most components (1 to 2 per spec). Asserting against generated class names is meaningless with Tailwind, so the test strategy changes.
- Open source repo on GitHub. External users exist; deprecation timeline and migration guide are required.
- Several components export `Styleable<Name>` from `private.ts` (e.g. `StyleableButton`) as an explicit escape hatch for consumers who do `styled(StyleableButton)\`...\``. These contracts go away in v3.

## Decisions

### D1: End state is full removal of styled-components

`styled-components` is removed from `peerDependencies`. Every component's `styled.tsx` is deleted. `big-design` ships `v3.0.0` with no styled-components anywhere in the public or private API.

Implication: this is a breaking change for every consumer. `Styleable<Name>` escape hatches in `private.ts` go away. Migration guide is mandatory.

### D2: Rollout is big-bang v3

All porting happens on a long-lived `v3` branch. `2.x` continues on `main` and receives bug fixes only. When every component is ported, theme is CSS-variable-based, patterns is migrated, and docs are updated, we cut `v3.0.0`. Consumers do one upgrade.

Implication: the plan must include a strategy for keeping the `v3` branch in sync with `main` over a long migration window. Backport workflow for security and critical fixes is defined in Phase 0.

### D3: Target Tailwind v4

Migration targets Tailwind CSS v4 (released January 2025). Tokens are defined via the CSS-first `@theme` directive as CSS custom properties. No `tailwind.config.js`; configuration lives in CSS.

Implication: `big-design-theme` tokens must be translated into a CSS `@theme` block. The current JS object surface (`({ theme }) => theme.colors.primary40`) becomes a read-only shim at best, and is gone entirely from `big-design`. Build tooling must support PostCSS with the Tailwind v4 plugin and CSS layering.

### D4: `big-design-theme` remains a separate published package

Post-migration, `big-design-theme` ships a CSS file containing the `@theme` block (all design tokens as CSS variables) plus the Tailwind v4 preset and imports needed to consume them. A read-only JS object shim is retained in `v3.0.0` of `big-design-theme` to ease migration of consumer code that references `theme.colors.primary40` directly. The JS shim is a deprecation candidate for `v3.1` or `v4`.

Implication: the "tokens vs implementation" package boundary is preserved. Consumers who use tokens without components (partner apps, custom CSS-in-JS) can still install only `@bigcommerce/big-design-theme`. Versioning between theme and components remains independent, so the migration guide documents a known-good version pair for `v3` GA.

### D5: Test strategy is RTL behavior plus targeted visual regression

`jest-styled-components` is removed from every spec. The unit-level test contract is React Testing Library behavior assertions only: roles, ARIA, focus order, disabled state, event handlers. Class-name assertions are rejected as too tightly coupled to Tailwind output.

Visual regression coverage is added at the design-system level as a Phase 0 deliverable. Visual regression must be in place before any component is ported.

Implication: visual regression needs a host for rendering components, and the tool choice is coupled to the host choice. Three viable host + tool combinations, decided in Phase 0: (a) introduce Storybook to the monorepo and use Chromatic against it, (b) keep the existing `packages/docs` Next.js site as the rendering surface and use Playwright screenshot diffing or Percy against it, (c) build a dedicated Playwright screenshot harness independent of the docs site. Choice affects monorepo structure, CI minutes, and ongoing maintenance cost.

### D6: Map scope ends at v3.0.0 GA

The migration map covers everything up to and including v3.0.0 published to npm with a migration guide and codemods. Consuming-app migrations (BC control panel microapps, partner apps, external OSS users) are explicitly out of scope. Each consuming team plans and runs its own migration on its own timeline.

External OSS communications (release candidates, deprecation notice on `2.x`, announcement post) are in scope as part of the release-prep phase. A published `@bigcommerce/big-design-codemods` package is part of the v3 release deliverable.

Implication: success criteria are v3.0.0 published, migration guide accepted, codemods package shipped, OSS comms sent. Not "X% of microapps on v3." Consumer adoption is a separate program, owned downstream.

## Phases

Sequenced strictly. All phases land on the `v3` branch. Each phase below is a candidate epic; the largest phases will spawn multiple epics inside them.

### Phase 0: Foundation

Goal: every piece of infrastructure that subsequent component-port epics depend on is in place and proven by porting one reference component.

Scope:
- Stand up Tailwind v4 + PostCSS in the monorepo build for `big-design`, `big-design-patterns`, and `docs`.
- Translate `big-design-theme` tokens into an `@theme` CSS block. Wire up the read-only JS shim.
- Decide visual regression host (Storybook / existing docs / Playwright harness) and stand it up in CI.
- Establish the "ported component" pattern: variant logic strategy (cva, tailwind-variants, or vanilla `cn()`), className composition, accessibility, file structure (does `styled.tsx` disappear entirely, or get replaced by a `classes.ts` of variant maps).
- Port one reference component end-to-end as the pattern exemplar. `Badge` is the recommended candidate: it has one prop axis (`variant`) with visual variants but no behavior complexity, so it exercises the variant-logic strategy without dragging in interaction logic. The reference component is ported in Phase 0 and does NOT get re-ported in its formal phase; it carries forward as-is. (If the reference choice changes, scope adjusts accordingly.)
- Cut the `v3` branch. Document backport workflow from `main` (cherry-pick policy, who owns merges, cadence).

Candidate epics:
- E0.1: Tailwind v4 + PostCSS build integration
- E0.2: `big-design-theme` `@theme` block + JS shim
- E0.3: Visual regression host decision and CI setup
- E0.4: Component port pattern + reference component
- E0.5: `v3` branch setup, backport process

Exit: reference component renders identically to its 2.x version, passes RTL + visual regression on CI. Pattern doc is reviewed. `v3` branch is set up with backport automation.

### Phase 1: Primitives

Goal: the foundational components that other components compose with are ported.

Scope:
- `Box`, `Flex`, `Grid`, `GlobalStyles`
- Typography components (Text, H0 through H4, Small) wherever they live
- System-prop helpers in `packages/big-design/src/helpers/` (margins, paddings, display, spacing, transitions) are reimplemented as Tailwind utility recipes or removed if redundant.

Candidate epics:
- E1.1: Port layout primitives (Box, Flex, Grid)
- E1.2: Port typography primitives
- E1.3: Migrate system-prop helpers to Tailwind utility recipes

Exit: all primitives ported. No `styled.tsx` files in their directories. Helpers migrated. Snapshot tests dropped.

### Phase 2: Leaf form controls

Goal: the atomic form-control surface is on Tailwind.

Scope:
- `Button`, `Checkbox`, `Radio`, `Switch`, `Toggle`, `Input`, `Textarea`, `Counter`, `Search`
- Containers that compose form controls: `Form`, `Fieldset`, `FileUploader`
- `Styleable<Name>` escape hatches in `private.ts` are removed. Captured in migration guide.

Candidate epics:
- E2.1: Port `Button` family (including `MessagingButton`, `ButtonGroup`)
- E2.2: Port input controls (`Input`, `Textarea`, `Counter`, `Search`)
- E2.3: Port selection controls (`Checkbox`, `Radio`, `Switch`, `Toggle`)
- E2.4: Port form composition (`Form`, `Fieldset`, `FileUploader`)

Exit: leaf form-control surface ported. Baseline visual regression for each. `Styleable*` removed.

### Phase 3: Composites and interactives

Goal: every remaining component in `packages/big-design/src/components/` is ported.

Scope:
- Overlays: `Modal`, `Popover`, `Tooltip`
- Selection: `Dropdown`, `Select`, `MultiSelect`, `Datepicker`, `Timepicker`
- Data display: `Table`, `TableNext`, `StatefulTable`, `StatefulTree`, `Worksheet`
- Navigation: `Tabs`, `AnchorNav`, `PillTabs`, `Stepper`, `OffsetPagination`, `StatelessPagination`
- Feedback: `Alert`, `Message`, `InlineMessage`, `StatusMessage`, `ProgressBar`, `ProgressCircle`, `Lozenge`, `Chip` (`Badge` already ported in Phase 0 as the reference component)
- Misc: `AccordionPanel`, `Collapse`, `FeatureSet`, `Panel`, `Link`, `List`

Candidate epics (one per category above, roughly):
- E3.1: Port overlays
- E3.2: Port selection components
- E3.3: Port data display
- E3.4: Port navigation
- E3.5: Port feedback
- E3.6: Port miscellaneous

Exit: zero `styled.tsx` files in `packages/big-design/src/components/`. `styled-components` is not imported from `packages/big-design`. All components have visual regression baselines.

### Phase 4: Patterns package

Goal: `big-design-patterns` no longer imports `styled-components`.

Scope:
- Port every component in `packages/big-design-patterns/src/components/` from styled-components to Tailwind.
- Depends on Phase 3 because patterns wrap core components.

Candidate epics:
- E4.1: Audit and triage `big-design-patterns` components
- E4.2: Port `big-design-patterns` components

Exit: `big-design-patterns` has no `styled-components` import. Visual regression baselines for patterns.

### Phase 5: Docs site

Goal: `packages/docs` is rebuilt against v3 `big-design` and serves as the first proof of the migration guide.

Scope:
- Update `packages/docs` imports and live code examples to v3 APIs.
- Update PropTables and MethodLists where API surfaces changed.
- Migrate any docs-internal styled-components usage to Tailwind.
- Track every change required as a candidate codemod input for Phase 6.

Candidate epics:
- E5.1: Migrate docs site to v3 big-design
- E5.2: Update live code examples and prop tables

Exit: docs site builds clean, examples visually equivalent to 2.x where unchanged. List of consumer-facing transformations is handed off to Phase 6.

### Phase 6: Codemods and migration guide

Goal: consumers have automated assistance and written guidance for migrating from 2.x to v3.

Scope:
- Stand up `@bigcommerce/big-design-codemods` (jscodeshift).
- Cover the high-frequency transformations identified during Phase 5: `styled(BigDesignComponent)\`...\`` recipes, `theme.colors.foo` references to CSS variables, `ThemeProvider` removal, removal of `Styleable<Name>` imports.
- Author `MIGRATING.md` in the repo and a migration guide page in the docs site.
- Migration guide is reviewed by a non-author.

Candidate epics:
- E6.1: Build `@bigcommerce/big-design-codemods` package and transforms
- E6.2: Author migration guide

Exit: codemods package published as alpha. Migration guide reviewed and published.

### Phase 7: Release prep and OSS comms

Goal: `v3.0.0` is on npm and the world knows.

Scope:
- Remove `styled-components` from `peerDependencies` in `big-design` and `big-design-patterns`. Drop `jest-styled-components` devDep.
- Cut release candidates via Changesets (`v3.0.0-rc.0`, then `.1` as needed). Bake-time on RC for at least one release window.
- GitHub release notes. Deprecation notice on `2.x`. External announcement (BC blog / Slack and GitHub Discussions).
- Final docs deploy.

Candidate epics:
- E7.1: peerDep removal and Changeset preparation
- E7.2: RC cycle and bake-time
- E7.3: OSS comms (release notes, deprecation notice, announcement)

Exit: `v3.0.0` and `@bigcommerce/big-design-codemods@1.0.0` on npm. Migration guide live on docs site. Announcement posted. Map complete.

## Cross-cutting workstreams

These run alongside the phases, not as separate phases.

- `v3` <- `main` periodic merges. Cadence and ownership defined in Phase 0 (E0.5).
- 2.x bug-fix-only on `main`. Bug fixes land on `main`, then get merged into `v3` on the next sync.
- CI: visual regression budget per PR. Baselines reviewed in PR.
- Accessibility: every ported component is re-checked against WCAG 2.2 AA before its phase exits. Not a separate phase, embedded in each port.
- Performance: spot-check bundle size after Phase 3 and Phase 4. If Tailwind purging is misconfigured the regression will show up here, not later.

## Out of scope

- Migrating BigCommerce control panel microapps from 2.x to v3 (D6).
- Migrating external OSS consumers (D6).
- Redesigning components. The migration is a like-for-like port. Visual and API changes that are not forced by removing styled-components are deferred to post-v3 work.
- Replacing the existing component documentation site framework (Next.js stays unless Phase 0 picks "Storybook" as the visual regression host and that decision pulls docs along with it).
- Migrating `big-design-icons` to anything new. Icons are SVG components and unaffected by this migration.

## Open questions for phase-level resolution

The following are deliberately not decided at the map level. Each is resolved inside the named phase as an explicit deliverable.

- Variant logic strategy: cva vs tailwind-variants vs vanilla `cn()`. (Phase 0)
- Visual regression host: Storybook vs existing docs vs Playwright harness. (Phase 0)
- Whether `styled.tsx` files are deleted entirely or replaced by `classes.ts` files holding variant maps. (Phase 0)
- Backport cadence and ownership from `main` to `v3`. (Phase 0)
- Codemod coverage targets: which transforms ship in v1 vs later. (Phase 6)
- Length of 2.x maintenance window after v3 GA. (Phase 7)

## Constraints

- Cannot drop React 18 support (current `peerDependency`).
- `pnpm`, Turborepo, Changesets, commitlint workflows are non-negotiable.
- Build order constraint: `big-design-icons` must build before everything else.
- CircleCI is the CI system; any new tooling must be CI-compatible.

## References

- `README.md`, `AGENTS.md`, `CLAUDE.md` at repo root.
- `packages/big-design/src/components/Button/` as the canonical "current shape of a component" reference (`Button.tsx`, `styled.tsx`, `index.ts`, `private.ts`, `spec.tsx`).
- `packages/big-design-theme/src/` for the current theme structure.
- Tailwind v4 release notes for `@theme`, CSS-first config, PostCSS plugin requirements.

<!-- claude --resume "Big-Design Styles" -->