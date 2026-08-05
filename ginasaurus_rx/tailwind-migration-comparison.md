# Tailwind Migration: Plan Comparison for Solo Execution

Last updated: 2026-05-27

Companion to:
- `tailwind-migration-notes.md` (the big-bang v3 plan)
- `phased-tailwind-migration.md` (three phased plans)
- `migration-options-notes.md` (destination options memo, which closed with the team picking Tailwind)
- `dev_notes.md` (the actual solo plan derived from this analysis)

This doc captures the decision rationale: why the existing plans don't fit solo side-project execution, and how Plan 1 adapted into "Plan 1-lite" became the chosen approach.

## Constraints that change when going solo

The big-bang plan and the three phased plans all assumed team execution. Going solo on a side project changes the constraint set materially.

- **Context-switching cost dominates.** Coming back to the work after a week or a month means re-orienting. Plans with high state (long-lived branches, dual implementations, release coordination) penalize this hard.
- **No backstop if you stall.** If a hard component takes three weeks, nothing keeps the work moving. Plans that depend on a *finishing* event are riskier than plans that accrue value continuously.
- **No release engineering capacity.** Running two release lines or maintaining a long-lived branch is full-time work, not side-project work.
- **Maintenance burden multiplies your hours.** Anything that doubles the surface area (dual implementations, dual tests) doubles your hours per port.
- **Motivation comes from visible progress.** Solo work survives on small wins shipping regularly. A single big-bang release at the end is demotivating.
- **Reversibility matters more.** If you get six months in and life changes, the plan should be exitable without leaving the codebase in a half-state.

## The four plans against those constraints

| Plan | Solo fit | Why |
|---|---|---|
| Big-bang v3 | Bad | One massive deliverable, long-lived branch, no interim shipping. If you stall, the branch rots and the work to date is invisible to consumers. |
| Phased Plan 1 (in-2.x refactor) | Best | Each component is a self-contained PR with a changeset. Lands in the next 2.x minor automatically. No branch coordination. If you stop, everything you shipped is already production. Resume from anywhere. |
| Phased Plan 2 (`/next` namespace) | Bad | Dual maintenance doubles your hours per component. Public API design decisions per port. Codemods plus implementation plus two test surfaces. |
| Phased Plan 3 (alpha channel) | Bad | Two release lines as one person is untenable. Branch merge debt accumulates with no co-maintainer to absorb it. Alpha consumer support is solo on-call. |

Plan 1 is the only realistic solo fit. The others were designed for team capacity that isn't available here.

## "Plan 1-lite": defer the v3 cut indefinitely

The big-bang plan ended at v3.0.0 cut (peerDep removed). For a solo side project, ask whether you need to cut v3 at all.

If you finish all 54 internal ports but never cut v3:

- `big-design` does not use styled-components internally anymore (maintenance-mode driver: addressed).
- Consumers' `styled(StyleableButton)` still works (peerDep stays).
- You never have to coordinate a major release, write a migration guide, or build codemods.
- v3 becomes a someday-maybe, possibly when the team picks the work up.

For solo work this is the most realistic finish line. You ship value continuously and never commit to a hard ending. If you stop at port 30 or port 54, what you shipped is fully valuable on its own.

## Sub-decisions inside Plan 1 that matter more solo

These were Phase 0 deliverables in the big-bang plan. The solo answers are different.

### Visual regression infrastructure

Storybook + Chromatic is great for teams; it is heavy for solo work. Three realistic options:

- **Storybook + Chromatic.** Best safety net. Initial setup is a few days of yak-shaving and Chromatic has a cost story (free tier may suffice; otherwise paid).
- **Playwright screenshot diffing against the existing `packages/docs` Next.js examples.** Free, works with existing infra. Initial setup is moderate.
- **No automated visual regression.** Rely on the docs site as live preview during dev, careful self-review per PR, and accept that users will catch some drift. Lowest infra cost.

For solo side-project work, lean Playwright against the docs site, or start with no automated visual regression and add it later if drift becomes a problem. Do not let infra setup block the actual work for two weekends.

### Codemods

The big-bang plan made codemods a Phase 6 deliverable. If you go Plan 1-lite (no v3 cut), you may not need them at all because the public API does not break in 2.x. Skip codemods entirely until or unless v3 actually happens.

### Patterns package

`big-design-patterns` was Phase 4 in the big-bang plan. For solo work, defer indefinitely. If you finish core component ports and never touch patterns, that is fine. Patterns still imports styled-components; consumers who use patterns still get styled-components transitively. That is a constraint, not a blocker.

### Variant logic strategy

All three options (cva, tailwind-variants, vanilla `cn()`) work for solo. Pick the lightest one you can live with: vanilla `cn()` (e.g. `clsx`) is the lowest learning curve and the easiest to walk away from later. cva is a one-line dependency, also fine. Save tailwind-variants for if you find yourself reinventing it.

## Pragmatic cadence

54 components at one component per week is roughly a year of evenings. Realistic side-project cadence is probably one or two ports per month, putting this at 2 to 4 years. That is not a failure mode; that is the actual shape of side-project work. Plan for it by:

- Picking components in any order within their dependency layer. Pick the ones that look interesting on a given weekend.
- Keeping per-port PRs small enough that you can review your own work after a week away.
- Writing a one-paragraph "what I learned" note per port (in `dev_notes.md`) so you do not re-derive the pattern each time.
- Letting the Changeset bot ship minors on its own cadence. You do not have to be there for releases.

## Conclusion

The chosen approach is **Plan 1-lite**: phased Plan 1 with the v3 cut deferred indefinitely. See `dev_notes.md` for the working plan and per-port checklist.
