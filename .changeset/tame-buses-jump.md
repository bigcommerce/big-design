---
"@bigcommerce/big-design": patch
---

Move `defaultProps` on `Button`, `Alert`, `Message`, and `InlineMessage` into destructuring defaults ahead of the React 19 upgrade, which silently ignores `defaultProps` on function components. Swap `act` imports in `AlertsManager` and `AnchorNav` specs from the removed `react-dom/test-utils` to `@testing-library/react`. No behavior change on React 18.
