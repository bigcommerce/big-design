---
'@bigcommerce/big-design': patch
'@bigcommerce/big-design-icons': patch
'@bigcommerce/big-design-patterns': patch
'@bigcommerce/big-design-theme': patch
'@bigcommerce/docs': patch
'@bigcommerce/examples': patch
---

chore(deps): batch ~20 dependency bumps, drop-in or effectively drop-in

Patch/minor bumps and majors with no breaking API surface actually used in this repo: `styled-components` 6.5.0 → 6.5.3, `@testing-library/react` 16.3.0 → 16.3.2, `@testing-library/user-event` 14.6.1 → 14.6.5, `@testing-library/jest-dom` 6.9.1 → 7.0.1, `zustand` 5.0.11 → 5.0.15, `date-fns` 4.1.0 → 4.4.0, `downshift` 9.0.10 → 9.4.0, `@tanstack/react-virtual` 3.13.23 → 3.14.10, `focus-trap` 7.6.4 → 8.2.2, `react-intersection-observer` 10.0.0 → 11.0.0, `turbo` 2.6.1 → 2.10.11, `@swc/core` 1.15.3 → 1.16.0, `@swc/plugin-styled-components` 12.x → 13.0.0, `glob`/`fs-extra`/`rimraf` patch bumps, `@radix-ui/react-scroll-area` 1.2.9 → 1.2.18, `formik` 2.4.6 → 2.4.9, `@changesets/changelog-git` 0.2.1 → 1.0.0, `prettier` (big-design-icons devDependency) 2.x → 3.9.6, and `@types/node` bumped to the latest 24.x patch.

Also aligns CI's pinned pnpm version (`.circleci/config.yml`) with the root `packageManager` field.
