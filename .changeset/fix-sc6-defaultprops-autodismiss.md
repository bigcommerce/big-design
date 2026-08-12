---
'@bigcommerce/big-design': patch
'@bigcommerce/big-design-icons': patch
---

fix: restore layout defaults broken by styled-components v6 and fix `autoDismiss` DOM leak in `AlertsManager`

`styled-components` v6 returns function components, and React 18/19 no longer applies `defaultProps` to function components. `Flex`, `FlexItem`, `Grid`, and icon components lost their layout defaults silently. Defaults are now applied at the call site rather than via `defaultProps`.

`AlertsManager` also leaked the internal `autoDismiss` option onto the DOM: SC6 no longer strips unknown props before forwarding, so the option was reaching the DOM as an unrecognised attribute. It is now stripped before rendering.
