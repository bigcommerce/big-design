---
"@bigcommerce/big-design-icons": patch
---

Fix `color` and `size` leaking onto the rendered `<svg>` DOM element for every icon. Each generated icon component (e.g. `ErrorIcon`) spread the remaining props directly onto a plain, non-styled `<svg>` without destructuring these two out first, so consumers passing `color`/`size` (via `createStyledIcon`/`createStyledFlagIcon`'s wrapper, which reads them separately to compute CSS) saw them show up as literal, invalid DOM attributes as well. This was independent of the v5→v6 styled-components/transient-props migration, since `createStyledIcon`/`createStyledFlagIcon` compose over the `Icon` component rather than a DOM tag, so styled-components' own prop filtering never applied here. `color`/`size` are now destructured out of the icon's own props alongside `svgRef`/`title`/`theme`, matching how `excludeMarginProps()`/`excludePaddingProps()` scope other non-DOM props elsewhere in this repo.
