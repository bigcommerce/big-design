---
"@bigcommerce/big-design": patch
---

Continue migrating tag-target styled components to transient (`$`-prefixed) props ahead of styled-components 6 (LTRAC-1396, Stage 3). Route `FeatureSet`'s margin props through the existing `toTransientMarginProps()` utility instead of blind-spreading them onto its styled `<ul>`, matching the `Box` template. Public `FeatureSetProps` and CSS output are unchanged; all 182 snapshots pass with zero diffs.

`Form/Label` and `Radio/Label` were also audited in this pass: both call the shared `withMargins()` helper, but their public prop types (`FormControlLabelProps`, `StyledLabelProps`) don't extend `MarginProps`, so margin is not reachable via the typed public API today. Since this is a pre-existing type gap rather than something this migration renames, no changes were made to either component; closing that gap (if desired) is a separate, out-of-scope follow-up.
