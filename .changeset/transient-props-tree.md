---
"@bigcommerce/big-design": patch
---

Finish migrating `Tree` to transient (`$`-prefixed) props ahead of styled-components 6 (LTRAC-1396, Stage 5). `Tree` was the original precedent this migration is modeled on (`$maxHeight`, `$virtualized`, `$height`, `$level` were already transient); this closes the last few stragglers. `$`-prefix `TreeNode`'s `StyledArrowWrapper.expanded` and `StyledFlex.selected`. `Tree/styled.ts`'s `StyledUl.show` turned out to be dead code (never read in its template, never passed at its one call site), so it's removed entirely rather than renamed to an unused `$show`.

Public `Props` interfaces are unchanged; all 182 snapshots pass with zero diffs (none of these prop names collide with real DOM attributes, so this is a true no-op under styled-components 5).
