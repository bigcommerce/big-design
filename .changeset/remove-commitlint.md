---
'@bigcommerce/big-design': patch
'@bigcommerce/big-design-icons': patch
'@bigcommerce/big-design-patterns': patch
'@bigcommerce/big-design-theme': patch
'@bigcommerce/docs': patch
'@bigcommerce/examples': patch
---

chore(ci): remove Commitlint

Drops `@commitlint/cli` and `@commitlint/config-conventional` devDependencies, deletes `commitlint.config.js`, and removes the `commitlint` CircleCI job (and its workflow entry) since it's no longer useful.
