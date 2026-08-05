---
"@bigcommerce/big-design": patch
---

Continue migrating tag-target styled components to transient (`$`-prefixed) props ahead of styled-components 6 (LTRAC-1396, Stage 3). `$`-prefix the one bespoke custom prop each of `Form` (`$fullWidth`) and `Tabs` (`$activeTab`) reads at the styled layer, plus route `Form`'s margin props through the existing `toTransientMarginProps()` utility instead of blind-spreading them.

`Tabs`'s `activeTab` flows through `StyledTab` (`styled(StyleableButton)`) down to `Button`'s own blind `{...props}` spread onto its plain-tag `StyledButton`, so the rename has to happen at the `Tabs`/`StyledTab` layer where the value originates; it rides the existing blind spread through `Button`'s internals unaffected, since styled-components strips `$`-prefixed props at whichever tag-target layer finally renders, regardless of how many component layers it passes through first.

Public `FormProps`/`TabsProps` and CSS output are unchanged; all 182 snapshots pass with zero diffs.
