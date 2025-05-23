---
'@bigcommerce/big-design': patch
---

Fix button group initial render flicker

Before: buttons would briefly appear in overflow and then disappear,
causing a flicker on mount.

After: overflowed buttons are hidden synchronously via `useLayoutEffect`, eliminating the flicker.