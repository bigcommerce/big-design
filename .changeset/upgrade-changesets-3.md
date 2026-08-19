---
'@bigcommerce/big-design': patch
'@bigcommerce/big-design-icons': patch
'@bigcommerce/big-design-patterns': patch
'@bigcommerce/big-design-theme': patch
'@bigcommerce/docs': patch
'@bigcommerce/examples': patch
---

build(deps): upgrade `@changesets/cli` 2.29.7 → 3.0.0, `@changesets/assemble-release-plan` 6.0.9 → 7.0.0

`@changesets/changelog-git` stays on `^1.0.0` (already current; cli 3.0.0 now hard-depends on it directly rather than pulling its own older copy). These three move together since cli 3.0.0 hard-depends on the other two.

Dropped the local `patches/@changesets__assemble-release-plan@6.0.9.patch` and its `pnpm.patchedDependencies` entry in `pnpm-workspace.yaml`, along with the now-stale dependabot `ignore` rule blocking all updates to `@changesets/assemble-release-plan` in `.github/dependabot.yml`. The patch stopped a peer-only *minor* bump on a dependency from forcing a *major* bump on peer-dependents (`big-design-patterns`) that peer-depend on the versioned packages via `workspace:^`. Upstream 7.0.0 fixes this more broadly: peer-triggered dependent bumps are now capped at `patch` unconditionally, regardless of the dependency's own release type.

Verified with `changeset status --verbose` against an isolated scratch changeset: a peer-only **major** bump on `@bigcommerce/big-design` now caps `@bigcommerce/big-design-patterns` and `@bigcommerce/docs` at `patch` instead of cascading to `major`.

Process note: a genuinely breaking peer change no longer bumps dependents automatically — it now requires an explicit manual major changeset on each affected dependent.
