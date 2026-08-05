# Alternative Migration Exploration

Status: exploratory. Hypothetical. No commitment to migrate; the output of this doc is an options memo, not a plan.

## Goal

Move `big-design` off of styled-components.

## Context

BigDesign is a component library that is meant to limit customizations in order to have users follow our style guidelines. That's why historically we chose styled-components: we could make it harder for users to create arbitrary components, a.k.a snowflakes.

With that in mind, there are two options from past explorations:

1. Migrate to Tailwind with the caveat that we need to do some research on how to prevent people from creating their own components.
2. Keep styled-components and upgrade to styled-components@7.

The main technical reason for those two options was to support React Server Components, however we haven't really had a need on our platform to do/people were highly against it at the time.

Some time has passed since the team did that (light) exploration and new options may be available.

## Reframed problem (informal Staff meeting, 2026-05)

- **Driver is styled-components going into maintenance mode**, not RSC. The risk is ending up on an unmaintained foundation, not missing a feature.
- **This exploration is hypothetical.** The team wants to know what the options look like and what migration would cost per option. The output is an options memo, not a migration plan.
- **Snowflake prevention** is a known constraint from the original styled-components choice, but its weight is open: it may be a hard requirement, a nice-to-have, or something we accept losing depending on the option.
- **RSC compatibility** is a nice-to-have, not a driver.

## Relationship to `tailwind-migration-notes.md`

Tailwind v4 as a destination is already covered in depth in `tailwind-migration-notes.md` (decisions D1 through D6, eight-phase migration map). This memo evaluates the *other* candidate destinations. The Tailwind v4 option carries forward as one entry on the final shortlist; its analysis lives in the other file and is referenced, not duplicated, here.

## Output we want from this doc

For each candidate styling approach:

1. What it is, briefly.
2. Maintenance health and ownership.
3. Runtime model (runtime CSS injection vs build-time static CSS).
4. Snowflake prevention story.
5. Theming model and how `big-design-theme` survives.
6. Migration shape (incremental possible? big-bang required? estimated effort tier: S / M / L / XL).
7. Consumer impact (what breaks, what gets a codemod, what stays).
8. Notable risks.

Then a shortlist with a recommendation framing, not a recommendation.

## Candidate analyses

Five candidates evaluated below, plus Tailwind v4 carried by reference, plus a considered-and-dropped section. Effort tier is rough order-of-magnitude relative to current codebase scope (54 components + patterns + docs).

### Option A: styled-components@7 (stay baseline)

The "do nothing meaningful" option. Bump the major, run the v5-to-v6/v7 codemod, keep everything else the same.

- **Maintenance:** styled-components has slowed substantially since v6. Issue throughput is low, releases are infrequent, the original maintainer has publicly stepped back. Going to v7 does not change this trajectory; it defers the problem one upgrade cycle.
- **Runtime:** Same runtime CSS injection model. v6+ introduced CSS layers (`@layer`) and minor perf improvements but the architecture is unchanged.
- **Snowflake prevention:** Identical to today. Same `Styleable<Name>` escape hatches in `private.ts`. Same affordances (not forwarding `className`/`style`).
- **Theming + `big-design-theme`:** No change. `ThemeProvider` + JS object tokens.
- **Migration shape:** Codemod for breaking changes in v5 → v6 (babel plugin / SSR API). Snapshots may need regeneration if class hashing changed. Single coordinated bump. **S effort.**
- **Consumer impact:** Minor; codemods exist. No public API removal.
- **Risks:** Real risk is doing the work and finding ourselves back in this same conversation in two years when the project enters full hibernation. This option buys time, not direction.

### Option B: vanilla-extract

TypeScript-based zero-runtime CSS-in-JS. Styles written as TS objects in `<Name>.css.ts` files, extracted at build time to static CSS Modules. Type-safe theme contracts as first-class concept.

- **Maintenance:** Active, backed by Seek (product company with real internal use). Regular releases, healthy issue throughput.
- **Runtime:** Zero runtime. Pure static CSS in the output bundle. Smaller bundle and better runtime perf than styled-components.
- **Snowflake prevention:** Tool-neutral. Prevention strategy is the same as today: don't forward `className`/`style`, expose only component props. The `.css.ts` files are an authoring detail consumers never see if we don't expose them.
- **Theming + `big-design-theme`:** Excellent fit. `createTheme` and `createThemeContract` produce typed CSS variable bindings. `big-design-theme` can publish a contract + a default theme; alternate themes (dark, partner-branded) become typed objects against the contract. CSS variables under the hood.
- **Migration shape:** Per-component port: replace `styled.tsx` with `<Name>.css.ts` + class composition in the component. Mechanical and incremental (mix styled-components and vanilla-extract during the transition is supported). **M to L effort.**
- **Consumer impact:** `styled(BigDesignComponent)` no longer works. Codemod-able for token references; harder for consumers who used styled-components against our `Styleable*` exports. Public component API can stay unchanged.
- **Risks:** Smaller community than Tailwind. Build setup adds a Vite or Webpack plugin (current setup is babel-based). DX is "write CSS in TypeScript files" which is a real shift from template literals.

### Option C: Panda CSS

Style-prop API with atomic CSS output. Tokens, recipes (variant logic), and conditional values are first-class. From the Chakra UI team.

- **Maintenance:** Active. Backed by the Chakra team which has a track record. Younger project than vanilla-extract; less proven at OSS-library-author scale (most users are app authors).
- **Runtime:** Zero runtime in optimized mode. Atomic CSS classes generated at build via a codegen step.
- **Snowflake prevention:** Weakest of the candidates. Style props (`<Box bg="primary40" />`) are an escape hatch by design. Token typing can constrain values but the surface area for ad-hoc styling is larger than the others.
- **Theming + `big-design-theme`:** Strongest fit conceptually. Panda has tokens, semantic tokens, and conditional themes built in. `big-design-theme` essentially becomes a Panda preset.
- **Migration shape:** Components rewrite `styled.tsx` to `cva`-style recipes + style-prop usage. Recipes API is close conceptually to what `styled.tsx` already does. Codegen step in the build. Incremental possible. **M effort.**
- **Consumer impact:** Public API can stay roughly component-shaped. Style props would either be exposed (consumers learn Panda) or hidden (consumers see only component props, similar to today).
- **Risks:** Newest of the candidates. Codegen complexity (debugging build issues is non-trivial). Style-prop API can polarize teams. Lock-in is high once tokens and recipes are spread through the codebase.

### Option D: CSS Modules + class-variance-authority (cva)

The boring option. Plain CSS in `.module.css` files, scoped class names via the bundler, cva to map variant props to class compositions.

- **Maintenance:** CSS Modules is a build-tool standard supported by every major bundler. Cannot enter maintenance mode in the same sense. cva is a small, focused, actively maintained library.
- **Runtime:** Zero runtime. Browser-native CSS handling.
- **Snowflake prevention:** Same as today; identical lever (don't forward `className`/`style`).
- **Theming + `big-design-theme`:** Hand-rolled via CSS variables in `:root` and `[data-theme="..."]` selectors. Less ergonomic than vanilla-extract or Panda; no typed theme contracts out of the box.
- **Migration shape:** Per-component, replace `styled.tsx` with `<Name>.module.css` plus a cva variant map in the `.tsx`. Most mechanical port of any candidate. Lowest learning curve for new contributors. **M effort.**
- **Consumer impact:** Same `styled(BigDesignComponent)` removal as the others. Less ceremony to learn.
- **Risks:** Theming dynamism is more limited than vanilla-extract or Panda (e.g. runtime consumer-defined themes are harder). Verbosity in variant logic without cva (mitigated by including it). No type safety on theme references unless we hand-roll it.

### Option E: StyleX

Meta's atomic CSS-in-JS. `stylex.create()` blocks compiled to atomic CSS with deduplicated hash-based class names.

- **Maintenance:** Backed by Meta, used at Facebook scale internally. OSS community outside Meta is still building; ecosystem maturity (third-party tooling, examples) is the smallest of the candidates.
- **Runtime:** Zero runtime in the optimized path. Excellent CSS deduplication at scale.
- **Snowflake prevention:** Strongest opinionated story of the candidates. The `stylex.create()` API is constrained by design; tokens enforced via TS types.
- **Theming + `big-design-theme`:** `stylex.defineVars` + theme objects, typed. CSS variables under the hood for runtime switching. Similar power profile to vanilla-extract.
- **Migration shape:** Per-component, rewrite `styled.tsx` into `stylex.create()` blocks. API is unfamiliar; learning curve is real. **M to L effort.**
- **Consumer impact:** Same `styled(BigDesignComponent)` removal. Consumers learning a Meta-specific API for one library in their stack is friction.
- **Risks:** Smallest community of the candidates. Meta's commitment to OSS ergonomics lags Meta's internal tooling. Babel plugin maturity outside Meta's build stack is the practical question to validate. Bus factor.

### Option F: Tailwind v4 (by reference)

See `tailwind-migration-notes.md` for full analysis (decisions D1 through D6, eight-phase migration map). Carried on the shortlist for completeness in the comparison below.

### Considered and dropped

- **Emotion** — same family as styled-components, same runtime model, same maintenance risk profile. Migrating to Emotion does not address the driver (foundation maintenance health), so it has no place on this list.
- **Linaria** — overlaps strongly with vanilla-extract (zero-runtime, CSS-in-JS template literals). vanilla-extract has stronger TypeScript ergonomics and a larger community; no reason to evaluate both.
- **UnoCSS** — too close to Tailwind v4 to be a meaningfully separate entry for this evaluation. If Tailwind is on the shortlist, UnoCSS is its variant, not its alternative.

## At-a-glance comparison

| Option | Maintenance health | Runtime | Snowflake story | Theming fit | Effort tier | Project ownership risk |
|---|---|---|---|---|---|---|
| A. sc@7 | Declining | Runtime injection | Same as today | Same as today | S | Medium (community-maintained, slowing) |
| B. vanilla-extract | Active | Zero | Same as today | Excellent (typed contracts) | M to L | Medium (Seek-sponsored) |
| C. Panda CSS | Active | Zero (atomic) | Weakest (style props) | Excellent (built-in) | M | Medium (Chakra team) |
| D. CSS Modules + cva | Standard | Zero | Same as today | Hand-rolled, weakest | M | Low (CSS Modules is a bundler standard; cva is one small library) |
| E. StyleX | Active (Meta) | Zero (atomic) | Strongest (constrained API) | Good | M to L | High (Meta-dependent for OSS direction) |
| F. Tailwind v4 | Active | Zero (atomic) | Hardest (utilities are public) | Excellent (CSS-first) | L | Low (Tailwind Labs, large user base) |

Lower in "Project ownership risk" is better; the column flags how exposed each option is to a single sponsor walking away.

## Axes that will decide this

Not a recommendation. These are the axes a team conversation would weigh.

- **Foundation longevity over feature set.** The driver is maintenance mode. Options D (CSS Modules) and F (Tailwind) score best on this axis because they're standards or near-standards. B, C, and E are projects with sponsors. A is the negative case.
- **Snowflake prevention weight.** If preserving the current "consumers can't easily snowflake" property is a hard requirement, options A, B, D rank higher (no new escape hatch); E ranks highest (constrained API by design); C ranks lowest (style props are an escape hatch). F is awkward here unless we layer policy on top.
- **Theming ambition.** If we want consumer-defined runtime themes (multi-brand, partner skins), B, C, E, F all support typed contracts well. D requires hand-rolling. A is the same as today.
- **DX continuity for contributors.** A keeps the current mental model. D is the lowest learning curve. B and C are familiar idioms in slightly different shapes. E is the most unfamiliar.
- **Migration cost.** A is S. C and D are M. B and E are M to L. F is L (per the existing map).
- **Reversibility.** D is the most reversible (CSS Modules is universally supported; you can always migrate off later). B and C and E are progressively harder to leave once tokens and recipes are spread through the code. F is on par with B once committed.

## Open questions if any option becomes a real plan

These don't need to be answered for the memo, only for whichever option gets picked.

- Is `big-design-theme` published as a runtime token contract (vanilla-extract / Panda / StyleX style) or a static CSS variable file (CSS Modules / Tailwind style)? This is the fork that defines the theme package's future shape.
- What's the codemod strategy for consumers who use `styled(BigDesignComponent)` or reference `theme.colors.foo` directly? Same shape per option, different transforms.
- What's the test strategy? `jest-styled-components` snapshots go away in every option except A. The Tailwind notes file already lands on RTL + visual regression; that decision is likely portable across options.
- Does big-design-patterns migrate in lockstep or follow? Same question as in the Tailwind notes; same answer likely.
- Single big-bang release (the Tailwind notes assumption) or per-component incremental ships within 2.x followed by a smaller v3 (the option-2 framing in the Tailwind notes)? Options B, C, D, E all support incremental ports more cleanly than the Tailwind plan does.


<!-- claude --resume "Big-Design Styles" -->