---
"@bigcommerce/big-design": minor
---

Migrate Dropdown, Popover, Select, and MultiSelect positioning from `react-popper` to `@floating-ui/react`. Placement, offsets, flipping, and overflow behavior are unchanged, and the `placement` props keep accepting the same values (including `auto*` placements, now handled via floating-ui's `autoPlacement` middleware). Tooltip still uses `react-popper` and is migrated separately.
