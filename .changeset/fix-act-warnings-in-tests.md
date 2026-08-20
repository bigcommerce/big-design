---
'@bigcommerce/big-design': patch
'@bigcommerce/big-design-patterns': patch
---

Fix React `act(...)` warnings in tests for `Dropdown`, `Header`, `Table`, and `MultiSelect`.

Each of these components mounts a `@floating-ui/react` positioned element even while closed (to have a ref for positioning), which triggers an async state update right after mount. Tests that synchronously rendered and asserted without ever giving that update a chance to flush inside an `act(...)` boundary logged a `console.error`. Switched the affected assertions to `screen.findBy*` queries, which flush the pending update via Testing Library's own `act`-wrapped polling instead of adding a bare `act(() => Promise.resolve())` flush.
