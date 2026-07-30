---
"@bigcommerce/big-design": patch
---

Continue migrating tag-target styled components to transient (`$`-prefixed) props ahead of styled-components 6 (LTRAC-1396, Stage 3). `Badge` and `Link` both blind-spread onto their styled `<span>`/`<a>`; destructure their bespoke props (`variant` on `Badge`; `ellipsis`, `isExternal` on `Link`) out and route them as explicit `$`-prefixed JSX props, plus route margins through the existing `toTransientMarginProps()` utility. Introduce internal-only `StyledBadgeProps`/`StyledLinkProps` types instead of reusing the public `BadgeProps`/`LinkProps` interfaces directly on the styled component's generic, matching the `Box` template. Public prop interfaces and CSS output are unchanged; all 182 snapshots pass with zero diffs.
