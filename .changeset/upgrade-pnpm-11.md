---
'@bigcommerce/big-design': patch
'@bigcommerce/big-design-icons': patch
'@bigcommerce/big-design-patterns': patch
'@bigcommerce/big-design-theme': patch
'@bigcommerce/docs': patch
'@bigcommerce/examples': patch
---

build(deps): upgrade pnpm 10 → 11

Bumps the root `packageManager` pin from `pnpm@10.26.2` to `pnpm@11.22.0` and aligns CI's pinned pnpm version (`.circleci/config.yml`) with it. Node 24 already satisfies v11's Node 22+ requirement.

Ran pnpm's official `pnpm-v10-to-v11` codemod to migrate the root `package.json#pnpm` field (`patchedDependencies`, `overrides`) into `pnpm-workspace.yaml`, since v11 no longer reads settings from `package.json#pnpm`.

v11 also turns previously-silent "ignored build scripts" into a hard install failure unless explicitly decided. `@swc/core`, `esbuild`, `sharp`, and `unrs-resolver` were already having their build scripts skipped under v10 with no ill effect, so `pnpm-workspace.yaml` now sets `allowBuilds: false` for each to preserve that behavior explicitly rather than newly opting them in.

Be aware v11's new `minimumReleaseAge: 1440` default blocks installing packages published less than 24h ago, which is good for CI reliability but can transiently block installs right after a fresh dependency bump.
