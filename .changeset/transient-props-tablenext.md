---
"@bigcommerce/big-design": patch
---

Continue migrating tag-target styled components to transient (`$`-prefixed) props ahead of styled-components 6 (LTRAC-1396, Stage 4, TableNext half — mirrors the `Table` PR). `$`-prefix the bespoke props read by `TableNext`'s `Row`, `DataCell`, `HeaderCell`, and `Body` styled components: `$isDragging`/`$isGrabbed`/`$isHidden`/`$isPhantom`/`$isSelected` (Row), `$align`/`$verticalAlign`/`$width`/`$withBorder`/`$isCheckbox`/`$isExpandable` plus transient padding props via the existing `toTransientPaddingProps()` helper (DataCell), `$isSortable`/`$stickyHeader`/`$stickyHeight`/`$width`/`$align`/`$hide` (HeaderCell), and `$withFirstRowBorder` (Body). Public `Props` interfaces are unchanged.

Also fixes the same `display` DOM leak found and fixed in the `Table` PR, but in `TableNext`'s own separate (byte-identical but independently-maintained) copy of the `withTableColumnDisplay()` helper. `Head`'s `hidden` prop is likewise left un-prefixed for the same reason as `Table`: an equivalent existing test relies on the leaked native `hidden` attribute for `jest-dom`'s `toBeVisible()` to resolve correctly.

All 182 snapshots pass; one snapshot updated to reflect the `display` leak removal (a `-`-only diff, no CSS change). This closes out Stage 4 (Table/TableNext dedupe) of LTRAC-1396.
