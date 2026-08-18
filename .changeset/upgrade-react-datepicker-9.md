---
'@bigcommerce/big-design': patch
---

chore(deps): upgrade `react-datepicker` 7.6.0 → 9.1.0, used in `Datepicker`. No functional or public API changes.

The underlying library reworked the calendar's ARIA markup: day cells changed `role` from `option` to `gridcell` (now wrapped in `table`/`rowgroup`/`row`, matching the WAI-ARIA date picker pattern), and the day-name header row (Sun/Mon/Tue/...) now renders a visually-hidden full name alongside the visible abbreviation for screen readers. Since we don't import `react-datepicker`'s base stylesheet, that visually-hidden span had no CSS to hide it and rendered overlapping text in the header row; fixed by adding the missing `.react-datepicker__sr-only` visually-hidden rule to `Datepicker`'s styles. Test suite updated to match the new `gridcell` role.

Also replaces the pre-existing popper.js-v2-shaped custom `popperModifiers` object (a `{ name, fn }` pair that manually subtracted 10px from `y`) with `@floating-ui/react`'s built-in `offset(-10)` middleware, canceling out `react-datepicker`'s internal `offset(10)` to keep the calendar flush against the input, same as before. No visual change.
