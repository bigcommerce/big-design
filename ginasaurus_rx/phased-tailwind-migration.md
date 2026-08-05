# Plan 1

**Internal refactor in 2.x, small v3 cut at end.**

**Strategy.** Migrate component internals to Tailwind one component at a time, on `main`, in the 2.x release line. Every port is a pure internal refactor: the component's public props and JSX shape stay identical; the `styled.tsx` file is replaced with Tailwind className composition. `styled-components` remains in `peerDependencies` throughout the 2.x line because consumers' own `styled(StyleableButton)` overrides must keep working. v3 is a small cut at the end that removes the peerDep, deletes the `Styleable<Name>` escape hatches, and removes `jest-styled-components`.

**Branching and release model.** All work on `main`. Standard Changesets workflow continues unchanged: each component port lands as a PR with a changeset and accumulates into the next 2.x minor on the normal cadence. No long-lived branch. v3 is a single Changeset-managed major bump near the end of the port.

**Component port mechanics.** Per component: replace `import styled from 'styled-components'` with Tailwind className composition (via cva or tailwind-variants, decided in Phase 0). Delete `styled.tsx`. Convert internal `styled(_StyleableButton)`-style variants (e.g. `MessagingButton`) to Tailwind-classed variants. Snapshot tests dropped; visual regression baseline added.

**Phase sequence.**

- Phase 0: Tooling foundation (Tailwind v4 + PostCSS, `@theme` block, visual regression, reference component on Badge). Lands as a 2.x minor.
- Phases 1 through 3: Primitives, leaf form controls, composites. Same component groupings as the big-bang plan. Each component or small batch lands as a changeset and ships in the next 2.x minor.
- Phase 4: `big-design-patterns` ported.
- Phase 5: Docs site migrated to consume the ported internals (largely invisible: same components, different rendered DOM classes).
- Phase 6: Codemods package authored for the upcoming v3 cut. Migration guide drafted.
- Phase 7: v3 cut. Single PR removes styled-components from peerDeps, deletes `Styleable<Name>` exports, drops `jest-styled-components`. Changeset is a major. Ship v3.0.0.

**Consumer experience during the port.** Largely invisible. Consumers see rendered DOM class names change (consumer snapshot tests against our output may break). `styled(StyleableButton)` continues to work because the public API is unchanged. Visual regression in `big-design`'s own CI catches any pixel drift before it ships.

**v3 cut content.** Remove `styled-components` from `peerDependencies` in `big-design` and `big-design-patterns`. Delete `Styleable<Name>` exports from `private.ts`. Drop `jest-styled-components` devDep. Publish codemods. That is the entire v3.

**Pros.**

- Lowest consumer-facing risk during the long port.
- One release line; no special branching workflow.
- Real users hit every port in production, so bugs surface earlier than they would in a long-baking alpha.
- v3 is small and reviewable.

**Cons.**

- styled-components peerDep is carried through the entire port. Consumers' lockfiles still install it.
- DOM class name changes in 2.x can surprise consumers who snapshot-test against our output. Each port is behavior-preserving but not markup-preserving.
- Snowflake-prevention improvements don't land until v3 GA. The "harder to escape" property is delayed to the very end.

**Effort tier.** L total. Phase 7 (the v3 cut) is S; everything before it is the same L as the big-bang plan, just spread across many small releases.

---

# Plan 2

**Parallel `/next` namespace, opt-in adoption.**

**Strategy.** Build Tailwind-native versions of each component under a new import path (e.g. `@bigcommerce/big-design/next/Button`). Original styled-components components stay at their current paths, unchanged. Consumers opt into the new versions per-component on their own timeline. Once every component has a `/next` counterpart, v3 promotes `/next` to the default export and deletes the originals.

**Branching and release model.** All work on `main`. Each `/next/<Component>` lands as a regular changeset and ships in the next 2.x minor. The `/next` namespace is a real exported subpath in the published package. No long-lived branch.

**Component port mechanics.** Per component: keep `components/<Name>/` exactly as-is. Add `components/<Name>/next/` (or equivalent location) containing a Tailwind-native implementation with an identical public prop interface. Wire it through a `next` subpath export in `package.json`. Existing tests stay; add a spec for the `/next` version.

**Phase sequence.**

- Phase 0: Tooling foundation. Tailwind v4 + PostCSS available alongside styled-components in the build. `@theme` block published in `big-design-theme`. Visual regression set up. Subpath export wiring proven on Badge.
- Phases 1 through 3: Ship `/next/<Component>` for each component group on the existing cadence.
- Phase 4: `/next` versions of `big-design-patterns` components.
- Phase 5: Migrate the docs site to consume `/next` everywhere. Docs becomes the canonical migration reference.
- Phase 6: Codemods package transforms `import { Button } from '@bigcommerce/big-design'` to the `/next` path for consumers ready to flip. Migration guide.
- Phase 7: v3 cut. Move `/next/*` to the default exports. Delete the old styled-components implementations. Drop styled-components peerDep. Drop `jest-styled-components`. Major version bump.

**Consumer experience during the port.** Highly visible and opt-in. Consumers can adopt the new components one at a time on their own schedule. They get the Tailwind story early. They can A/B their app's behavior against the old component during the migration.

**v3 cut content.** Significantly larger than Plan 1. The `/next` move-to-default plus removal of the old implementations is the breaking change. Codemods get a workout. peerDep removal is part of the cut.

**Pros.**

- Real consumer feedback on the Tailwind shape throughout the migration, not just at the end.
- Opt-in adoption avoids forcing the change on any team before they're ready.
- Docs site is a working migration reference.
- Aligns naturally with the team's existing 2.x minor cadence.

**Cons.**

- Dual maintenance burden during the entire port. Every bug fix is potentially two PRs (old + `/next`). Consumer bundles include both implementations until they migrate.
- Public API surface roughly doubles during the migration.
- Snowflake-prevention story is split: `/next` components can have a tighter contract, originals don't, and the team has to enforce both norms.
- v3 cut is bigger than Plan 1's; more risk concentrated in one major.

**Effort tier.** L plus. The dual-maintenance tax makes this materially more expensive than Plan 1 even though each per-port unit of work is smaller (the old code doesn't move).

---

# Plan 3

**Continuous alpha channel from a `v3` branch.**

**Strategy.** Take the big-bang plan as the structural model (long-lived `v3` branch, all components ported there, peerDep removed there) but cut publishable pre-release versions throughout the migration so early-adopter consumers can opt into the alpha and report bugs against the real v3 API. `main` continues 2.x bug fixes. Each phase exit cuts a new `3.0.0-alpha.N` or `3.0.0-beta.N`.

**Branching and release model.** Long-lived `v3` branch. `main` is 2.x bug-fix only. Periodic merges of `main` into `v3`. Publishes from `v3` use the npm `alpha` and `beta` dist tags so they never appear as auto-upgrades for consumers on 2.x. Once `v3` is feature-complete: graduate to `rc.0`, bake, cut `v3.0.0` with the `latest` dist tag.

**Component port mechanics.** Identical to the big-bang plan in `tailwind-migration-notes.md`: per component, replace `styled.tsx` with Tailwind className composition + variant maps. The difference is purely organizational: ports land on the `v3` branch, not on `main`.

**Phase sequence.** Same eight phases (0 through 7) as the big-bang plan. The difference is the release boundary at each phase exit:

- Phase 0 exit: `3.0.0-alpha.0`. Foundation + reference component only.
- Phase 1 exit: `3.0.0-alpha.1`. Primitives ported.
- Phase 2 exit: `3.0.0-alpha.2`. Leaf form controls ported.
- Phase 3 exit: `3.0.0-alpha.3`. Composites ported.
- Phase 4 exit: `3.0.0-beta.0`. Patterns ported.
- Phase 5 exit: `3.0.0-beta.1`. Docs site migrated.
- Phase 6 exit: `3.0.0-rc.0`. Codemods and migration guide done.
- Phase 7 exit: `3.0.0`. peerDep removal already done on the branch; RC bake, OSS announcement, GA.

**Consumer experience during the port.** Invisible to default consumers on 2.x. Early adopters who explicitly install the `alpha` or `beta` dist tag get the v3 API to test against. Their bug reports feed back into the `v3` branch directly.

**v3 cut content.** Identical to the big-bang plan. The "cut" is effectively the moment the `rc` graduates to `latest`. The peerDep removal happens early in the `v3` branch's lifetime, not at GA.

**Pros.**

- Real-world testing on the actual v3 API throughout the migration, not just at GA.
- Default consumers see zero churn during the long port.
- v3 GA arrives with significant pre-release exposure already absorbed.
- Migration guide can be authored and validated against real adopters before GA.

**Cons.**

- Two release lines (2.x on `main`, v3 alpha/beta on `v3`). Double CI cost. Bug fixes need to be backported.
- Long-lived branch invites merge debt; periodic sync from `main` is non-trivial.
- Alpha consumers need support; the team takes on a partial support burden well before GA.
- Snowflake-prevention story doesn't materialize for default consumers until GA.

**Effort tier.** L total core work, plus a Medium ongoing tax for branch maintenance and alpha support across the migration window.

---

## Invariants (carried forward from `tailwind-migration-notes.md`)

These hold across all three plans. See the big-bang notes for full reasoning.

- **D1, end state.** styled-components removed from peerDependencies eventually; every `styled.tsx` deleted; v3.0.0 ships without styled-components anywhere.
- **D3, Tailwind v4.** CSS-first `@theme` directive. No `tailwind.config.js`.
- **D4, `big-design-theme` stays separate.** Ships `@theme` CSS plus a read-only JS shim retained for one major.
- **D5, test strategy.** Drop `jest-styled-components`. RTL behavior assertions for unit-level. Visual regression as a Phase 0 deliverable.
- **D6, scope ends at v3.0.0 GA.** Consumer-app migrations are not in any of these plans. Codemods and migration guide are deliverables.

Only **D2 (rollout shape)** varies across these three plans.

## Axes that will decide between these

Not a recommendation. These are the axes a team conversation would weigh.

- **Tolerance for DOM churn in 2.x.** Plan 1 changes rendered DOM class names on every 2.x release during the port. Consumers who snapshot-test against our output see noise. Plans 2 and 3 don't have this problem.
- **Tolerance for dual maintenance.** Plan 2 doubles the surface during the port. Plan 3 splits across two branches. Plan 1 has neither.
- **Value of early consumer signal.** If real apps need to test the Tailwind shape during the port (not just at GA), Plan 2 or 3 wins.
- **Snowflake-prevention timing.** If the tighter contract needs to land before v3 (e.g. a policy goal in 2.x), only Plan 2 can deliver it incrementally via the `/next` contract.
- **Release engineering capacity.** Plan 3 requires running two release lines competently for many quarters. Plan 2 requires maintaining dual implementations. Plan 1 is the simplest from a release-engineering perspective.
- **Reversibility.** Plan 1 is the most reversible; each port is a small, isolated PR. Plan 2 is reversible per-component until the v3 promotion. Plan 3 is reversible at any point pre-RC but the branch divergence makes rollback heavier.

## Open questions if any plan becomes the chosen path

- Variant logic strategy (cva vs tailwind-variants vs vanilla `cn()`). Phase 0 deliverable.
- Visual regression host (Storybook vs existing docs vs Playwright harness). Phase 0 deliverable.
- For Plan 1 specifically: at what point during the port does the team publicly commit to the v3 cut, so codemod work isn't speculative?
- For Plan 2 specifically: what's the exact import path? `@bigcommerce/big-design/next`, `@bigcommerce/big-design-next` (separate package), or another shape?
- For Plan 3 specifically: who owns alpha-consumer support during the long migration? Big-design team, or a rotating volunteer?

## At-a-glance comparison

| Aspect | Plan 1 (in-2.x refactor) | Plan 2 (`/next` namespace) | Plan 3 (alpha channel) |
|---|---|---|---|
| Where work lives | `main` (2.x line) | `main` (2.x line) | Long-lived `v3` branch |
| When peerDep is removed | End, in a single v3 PR | End, when `/next` is promoted | Early in the `v3` branch |
| Default-consumer visibility during port | Low (DOM classes change) | Low (must opt into `/next`) | None (alpha tag only) |
| Opt-in adoption mid-flight | No | Yes, per-component | Yes, all-or-nothing via alpha |
| Dual maintenance burden | None | High (two implementations) | Medium (two branches) |
| v3 cut size | Smallest | Largest | Medium |
| Real-user testing of new internals | Continuous, all 2.x consumers | Continuous, opt-in only | Continuous, alpha-tag only |
| Branch maintenance cost | None | None | Ongoing |
| Earliest consumer feedback on Tailwind shape | Late (at v3 cut) | Per-component, immediate | Per-phase, immediate |
| Release engineering complexity | Lowest (one release line) | Medium (subpath exports, dual surface) | Highest (two release lines) |
| Reversibility | Highest | High, per-component | Medium |
| Snowflake-prevention timing | At v3 GA | Per-component, in 2.x | At v3 GA |
| Effort tier (relative to big-bang baseline) | L (same total work, spread over time) | L plus (dual-maintenance tax) | L plus ongoing M (two release lines) |




<!-- claude --resume "Big-Design Styles" -->