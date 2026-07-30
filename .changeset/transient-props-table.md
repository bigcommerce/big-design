---
"@bigcommerce/big-design": patch
---

Continue migrating tag-target styled components to transient (`$`-prefixed) props ahead of styled-components 6 (LTRAC-1396, Stage 4, Table half). `$`-prefix the bespoke props read by `Table`'s `Row`, `DataCell`, `HeaderCell`, `Head`, and `Body` styled components: `$isDragging`/`$isGrabbed`/`$isHidden`/`$isPhantom`/`$isSelected` (Row), `$align`/`$verticalAlign`/`$width`/`$withBorder`/`$withPadding`/`$isCheckbox` (DataCell), `$isSortable`/`$stickyHeader`/`$stickyHeight`/`$width`/`$align`/`$hide` (HeaderCell), and `$withFirstRowBorder` (Body). Public `Props` interfaces are unchanged.

Also fixes a genuine DOM leak in `Table`'s own `withTableColumnDisplay()` helper: `display` was forwarded as a literal DOM attribute (e.g. `display="[object Object]"` for responsive breakpoint objects), the same category of bug fixed for `Box` in Stage 0. Introduces an internal `TransientTableColumnDisplayProps` type (`$display`) so the public `display` prop is untouched.

`Head`'s `hidden` prop is deliberately left un-prefixed: it's a real DOM attribute, and an existing test relies on the native `hidden` attribute leaking through for `jest-dom`'s `toBeVisible()` assertion to resolve correctly (`hideVisually()` CSS alone doesn't satisfy it). Prefixing it would silently change tested behavior.

All 182 snapshots pass; one snapshot updated to reflect the `display` leak removal (a `-`-only diff, no CSS change). `TableNext`'s near-duplicate sub-files are addressed in a follow-up PR.
