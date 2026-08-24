---
'@bigcommerce/docs': patch
---

No-op release to verify the `changesets/action` v2 upgrade (TRAC-1573) fixes the GitHub Pages docs deploy. No code changes; only merge this after TRAC-1573 (PR #1931) has landed, otherwise the release will run on the old v1 action and reproduce the same bug it's meant to test.
