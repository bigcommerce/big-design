---
"@bigcommerce/big-design": patch
---

Continue migrating tag-target styled components to transient (`$`-prefixed) props ahead of styled-components 6 (LTRAC-1396, Stage 3). `Input` blind-spread `error`/`focus`/`chips`/`iconLeft`/`iconRight` across its four styled tag targets (`StyledInputWrapper`, `StyledInput`, `StyledIconWrapper`, `StyledInputContent`); destructure them out and route them as explicit `$`-prefixed JSX props, plus route `StyledIconWrapper`'s padding through the existing `toTransientPaddingProps()`-backed `withPaddings()` helper.

`Flex/Item` blind-spread its Flex-specific bespoke props (`alignSelf`, `flexBasis`, `flexGrow`, `flexOrder`, `flexShrink`) with zero destructuring onto `StyledFlexItem` (`styled(Box)`). Added a new `toTransientFlexedItemProps()` utility (`Flex/withFlex.ts`) and `TransientFlexedItemProps` type (`Flex/types.ts`), mirroring the shared margin/padding/display helpers; since `withFlexedItems()` has a single consumer, no dual-read shim was needed for a straight rename. `Flex`'s own container props (`backgroundColor`, `margin`, etc.) continue to flow through unchanged, since `Box` — already migrated — intercepts and converts them at its own layer regardless of how many `styled(Component)` wrapper layers sit above it.

A required knock-on fix outside this stage's own target list: `Counter` wraps `Input`'s `StyledInputWrapper`/`StyledInput` directly (via `Counter/styled.ts`) and passed bare `error`/`focus`; updated those call sites to `$error`/`$focus` (and dropped a redundant `error` prop pass to `StyledCounterInput`/`StyledInput`, which never read it internally in either component).

Also flagging, not fixing: `Flex` (the container, not `Flex/Item`) has the identical blind-spread pattern via `withFlexedContainer()` but isn't on this stage's explicit target list; it needs the same treatment in a follow-up.

Public `InputProps`/`FlexItemProps`/`CounterProps` and CSS output are unchanged; all 182 snapshots pass with zero diffs.
