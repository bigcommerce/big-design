---
"@bigcommerce/big-design": patch
"@bigcommerce/big-design-icons": patch
"@bigcommerce/big-design-patterns": patch
"@bigcommerce/big-design-theme": patch
"@bigcommerce/docs": patch
---

Add a version support matrix to the README(s) and docs site: the current major requires React 19 + styled-components >= 6.1.14, the 4.0.0-era release (`big-design@4.0.0` / `icons@2.0.0` / `patterns@6.0.0` / `theme@2.0.0`) is deprecated and should not be used, and the 3.x-era majors remain on React 18 + styled-components 5 with case-by-case backports. Also fixes the quick-start install snippets, which still referenced `styled-components@5`.
