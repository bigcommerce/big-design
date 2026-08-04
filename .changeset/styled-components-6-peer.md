---
'@bigcommerce/big-design': major
'@bigcommerce/big-design-icons': major
'@bigcommerce/big-design-patterns': major
'@bigcommerce/big-design-theme': major
---

Require styled-components 6: the `styled-components` peer dependency range moves from `^5.3.5` to `^6.1.14` across all four packages. Consumers must upgrade to styled-components 6 to use this release (v6 supports both React 18 and, ahead of our upcoming React 19 flip, React 19 — while v5 does not support React 19). Along with the peer bump, the packages now build and test against styled-components `^6.4.0`, `@types/styled-components` is dropped (v6 ships its own types), and `jest-styled-components` moves to `^7.4.0` for v6 support (7.4.0 also fixes `toHaveStyleRule`'s `media` option against stylis v4's spaced media-query output). `createTheme()` now returns `keyframes` as a plain object copy rather than a frozen module-namespace object, since styled-components 6 deep-merges themes when folding `defaultProps` and a getter-only namespace object makes that merge throw; the shape and values of `theme.keyframes` are unchanged.
