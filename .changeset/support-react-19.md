---
"@bigcommerce/big-design": minor
"@bigcommerce/big-design-icons": minor
"@bigcommerce/big-design-patterns": minor
"@bigcommerce/big-design-theme": minor
---

Add React 19 compatibility by broadening React peer dependency ranges and removing runtime reliance on function-component `defaultProps`.

BigDesign components, icons, and patterns now preserve documented defaults with React 19-compatible parameter defaults and shared theme fallback helpers, including rendering without a `ThemeProvider` and with partial custom themes.

`@bigcommerce/big-design-icons` now intentionally types icon `size` as accepting spacing keys, numeric pixel values, or custom CSS length strings, matching the runtime support used by the React 19-compatible icon fallback.

`Alert`, `Message`, and `InlineMessage` now type `messages` as optional and default it to an empty array.
