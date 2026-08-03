---
"@bigcommerce/big-design": patch
---

Complete the transient-props migration (LTRAC-1396) by removing the temporary dual-read shim from the three shared helpers, `withMargins()`, `withPaddings()`, and `withDisplay()`. They previously read both the public (`margin`) and transient (`$margin`) prop names (`$margin ?? margin`) so components could migrate one PR at a time; now that every consumer in this repo passes `$`-prefixed props, they read only the transient name.

This also converts the last few remaining consumers found by an audit of every `withMargins()`/`withPaddings()`/`withDisplay()` call site, none of which were on the original stage list:
- `Table`'s and `TableNext`'s `TableFigure`/`TableFigureNext` (margin)
- `Typography`'s `Text`, `Small`, `HR`, `H0`–`H4` (margin) — plus three forced fixes at cross-file call sites that bypass the public wrapper and use the internal `Styleable*` exports directly: `Tree/TreeNode.tsx`, `Panel.tsx`, `FileUploader/File.tsx`, `FeatureSet/Tag.tsx`, and `InfoCard.tsx`
- `Flex` and `Grid` (display) — previously flagged in Stage 3 as follow-up work, now required since they call `withDisplay()` directly on their own `styled(Box)` wrapper layer, independent of `Box`'s own (already-converted) internal handling

`withPaddings()` had no outstanding non-converted consumers.

**Note for reviewers:** `withMargins()`/`withPaddings()`/`withDisplay()`, and their `Transient*Props`/`toTransient*Props()` counterparts, are exported from `@bigcommerce/big-design`'s public API via `helpers/index.ts`'s wildcard re-export (contrary to earlier assumptions in this migration that they weren't). Their exported return-type signatures narrow slightly (`css<MarginProps & TransientMarginProps>` → `css<TransientMarginProps>`, etc.). Within this monorepo, the only consumer using these utilities outside `packages/big-design`'s own source was `docs/MethodBadge`, already converted here. Any *external* consumer of the published package calling these directly with bare (non-`$`) props would need to update — an unlikely usage pattern for what are effectively internal-only utilities, but worth flagging explicitly.

All 182 snapshots pass; one snapshot updated (`helpers/display/spec.tsx`'s own test) reflecting a `display` leak removal, the same category of fix as Stage 0's `Box` and Stage 4's `Table`/`TableNext`. No public component `Props` interface changed.
