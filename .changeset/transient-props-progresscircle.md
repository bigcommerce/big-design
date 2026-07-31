---
"@bigcommerce/big-design": patch
---

Migrate `ProgressCircle` to transient (`$`-prefixed) props ahead of styled-components 6 (LTRAC-1396, Stage 6). `ProgressCircleProps` (public) was reused directly as the styled generic across all four styled components, including inside `StyledCircle`'s `.attrs()` callback that computes SVG `cx`/`cy`/`r` geometry. Introduces an internal `StyledProgressCircleProps` (`$size`, `$percent`) and updates the `.attrs()` destructure, every CSS interpolation, and `ProgressCircle.tsx`'s JSX call sites together, since this one couldn't be split styled-file-vs-consumer like other components in this migration.

Public `ProgressCircleProps` and CSS output are unchanged; all 182 snapshots pass with zero diffs (neither `size` nor `percent` currently leaks onto the rendered `<svg>`/`<circle>`/`<text>` elements under styled-components 5, so this is a true no-op).
