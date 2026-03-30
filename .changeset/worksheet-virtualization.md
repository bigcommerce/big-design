---
"@bigcommerce/big-design": minor
---

Add opt-in row virtualization to the Worksheet component via `@tanstack/react-virtual`.

- New `height` prop enables virtualization — when provided, only visible rows are rendered in the DOM, significantly improving performance for large datasets.
- Virtualization-aware scroll sync keeps the selected cell in view automatically (`VirtualScrollSync`).
- Collapsed expandable child rows are excluded from the virtual list so the virtualizer doesn't allocate space for hidden rows.
- Fix formatting function to correctly handle non-numeric values when copying (`Number(value)` guard).
