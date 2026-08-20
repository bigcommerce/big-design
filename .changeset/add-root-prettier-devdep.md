---
'@bigcommerce/big-design': patch
'@bigcommerce/big-design-icons': patch
'@bigcommerce/big-design-patterns': patch
'@bigcommerce/big-design-theme': patch
'@bigcommerce/docs': patch
'@bigcommerce/examples': patch
---

fix(ci): add `prettier` as a root devDependency to fix the Changesets release job

`@changesets/cli` 3.0.0 (`@changesets/apply-release-plan` 8.0.0 → `@changesets/format` 0.1.2) added a new post-`version` step that auto-detects a formatter and runs it over the touched CHANGELOG.md files. It found the root `prettier.config.js` and picked `prettier`, then ran `pnpm exec prettier --write ...` — but `prettier` was only ever a devDependency of `packages/big-design-icons` and `packages/docs`, never the workspace root, so a clean `pnpm install --frozen-lockfile` (as CI does) never resolves a `prettier` bin at the root and `pnpm exec prettier` fails with `Command "prettier" not found`, breaking the `Changesets / Release` job on every push to `main`.

Adding `prettier@^3.9.6` (matching the version already pinned elsewhere) as a root devDependency gives `pnpm exec prettier` something to resolve. Verified by reproducing the exact CI failure in an isolated worktree with a genuine `pnpm install --frozen-lockfile`, then confirming `pnpm exec changeset version` completes cleanly after the fix.
