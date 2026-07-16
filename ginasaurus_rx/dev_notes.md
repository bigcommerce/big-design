# Dev Notes

## Tailwind Migration

| | |
|--|--|
| PR | https://github.com/bigcommerce/big-design/pull/1865 |
| Branch | ginasaurus-rx-tailwind |pnpm run start


Approach: **Plan 1-lite.** Internal refactor in 2.x, one component per PR, ship via Changesets, never cut v3 (defer indefinitely). See `tailwind-migration-comparison.md` for why.

## Phase 0 (do once, before any component ports)

- [x] Install Tailwind v4 + PostCSS in the monorepo build. Verify `pnpm build` works end-to-end with Tailwind processing CSS. *(PR0a)*
- [x] Add the Tailwind `@theme static` CSS block to `big-design-theme` (`src/theme.css` → `dist/theme.css`). Translate colors, spacing, typography, radius, breakpoints, shadows, z-index, line-height. *(PR0a)*
- [x] Keep the JS object exports in `big-design-theme` working unchanged. Consumers still depend on them and the migration is internal. *(PR0a)*
- [x] Pick a variant lib. Lean `clsx` + handwritten variant maps. Add `cva` only if a real component proves the handwritten approach insufficient. *(clsx added in PR0a)*
- [x] Decide on visual regression. Skip automated VR for now (overrides D5 in `tailwind-migration-notes.md`). Reassess after 5 components.
- [x] Decide how published `big-design` emits Tailwind CSS: PostCSS → `dist/styles.css`, loaded via `<GlobalStyles />` side-effect import + runtime CSS var injection from live theme (`htmlFontSize` preserved). *(PR0a)*
- [ ] Port one reference component (recommend Badge: small, has variants, no behavior). Ship it. This validates the toolchain works in production before any further investment. *(PR0b)*
- [ ] Manual verification + start `ginasaurus_rx/phase-0-verification.md` after Badge ships.

Exit Phase 0 when Badge ships in a 2.x minor on npm, rendering identically to its prior version.

## Per-port checklist

For each component port, in order:

- [ ] Branch from `main`. Name: `tailwind-<component-name>`.
- [ ] Open `components/<Name>/styled.tsx`. Read every styled rule.
- [ ] Translate each styled rule into Tailwind class composition. Reference the `@theme` tokens by their CSS variable name (e.g. `bg-[var(--colors-primary40)]` or the named utility if Tailwind generated one from the `@theme` block).
- [ ] Replace `<StyledX>` usage in `<Name>.tsx` with a plain `<x>` element + `className={cn(...)}`.
- [ ] Delete `styled.tsx`.
- [ ] If the component had `Styleable<Name>` in `private.ts` (today only Button, Checkbox, Input, Radio, Typography), keep the export but change the body so it no longer relies on styled-components internally. Consumer-facing API of `Styleable<Name>` must stay identical (still accepts className, still forwards refs).
- [ ] If the component had internal `styled(_StyleableName)` variants (e.g. `MessagingButton`), reimplement them as a Tailwind-classed variant.
- [ ] Update `spec.tsx`: drop `import 'jest-styled-components'`. Remove `toMatchSnapshot()` calls that asserted on styled output. Keep RTL behavior assertions. Add a couple if coverage thinned out.
- [ ] Open the docs site (`pnpm run start`) and visually check every example for the component.
- [ ] Add a changeset (`pnpm changeset`). Scope: `component`. Body: "internal: port `<Name>` to Tailwind, no public API change."
- [ ] Open PR. Self-review after at least one day's gap.
- [ ] Merge. Changeset bot rolls the next 2.x minor automatically.
- [ ] Add a one-paragraph "what I learned" note below in the [Per-port learnings](#per-port-learnings) section.

## Component port order

Pick freely within a layer. Move to the next layer only when the prior layer is done. Layer ordering matters because higher layers compose lower ones.

Inventory source of truth: `packages/big-design/src/components/index.ts` (public surface), not the directory listing. "54" in older notes is approximate.

**Layer 0 (reference, done in Phase 0):**
- Badge

**Layer 1 (primitives, no internal dependencies):**
- Box, Flex, Grid
- Text and typography (H0 through H4, Small) wherever they live
- GlobalStyles

**Layer 2 (atomic interactives):**
- Button, ButtonGroup
- Checkbox, Radio, Switch, Toggle
- Input, Textarea, Counter, Search
- Link

**Layer 3 (form composition):**
- Form, Fieldset, FileUploader

**Layer 4 (feedback, lightweight composites):**
- Alert, Message, InlineMessage, StatusMessage
- ProgressBar, ProgressCircle
- Lozenge, Chip
- AccordionPanel, Collapse
- FeatureSet, Panel, InfoCard
- List

**Layer 5 (heavy composites):**
- Modal, Popover, Tooltip
- Dropdown, Select, MultiSelect
- Datepicker, Timepicker
- Tabs, AnchorNav, PillTabs, Stepper
- OffsetPagination, StatelessPagination

**Layer 6 (data display):**
- Table, TableNext (confirm public vs internal before porting; not in `components/index.ts` today)
- StatefulTable, StatefulTree
- Worksheet
- Note: `Tree/` exists on disk but is not a public export; port only as needed by StatefulTree internals, not as its own checklist item.

**Deferred indefinitely:**
- `big-design-patterns` (separate package, port only if motivated)
- v3 cut (peerDep removal, Styleable* deletion, codemods, migration guide)

## Cadence and "done"

- Realistic cadence: one to two ports per month. Roughly 2 to 4 years to finish all six layers.
- "Done" for any given session: a single port shipped in a 2.x minor. Never leave a port half-finished in a stash.
- "Done" for the project: never formally declared. If layers 1 through 5 are complete, the value is captured even without a v3 cut. If life gets in the way at any port count, what's shipped is shipped and the work in progress can be abandoned cleanly.

## Per-port learnings

(One paragraph per port. Future-you reads these to avoid re-deriving the pattern.)

- _(empty so far; add the first entry after the Badge reference port)_




---

<!-- claude --resume "Tailwind" -->