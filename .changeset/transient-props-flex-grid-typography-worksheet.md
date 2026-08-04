---
"@bigcommerce/big-design": patch
---

Finish migrating tag-target styled components to transient (`$`-prefixed) props ahead of styled-components 6 (LTRAC-1454, catches misses from LTRAC-1396). SC5's automatic `is-prop-valid` filtering hid all of these — they only surface under v6's stricter tag-target handling.

Components fixed:

- **Flex** — `withFlexedContainer()` now reads `$`-prefixed fields; `StyledFlex.defaultProps` updated; `Flex.tsx` destructures all eight container props and hands them off via `toTransientFlexedContainerProps()`. Fixes the highest-volume leak (~70 DOM attribute hits per render).
- **Grid** — same pattern for `withGridedContainer()` / `withGridedItems()`; `Grid.tsx` and `Grid/Item/Item.tsx` use `toTransientGridedContainerProps()` / `toTransientGridedItemProps()`.
- **Table/Actions and TableNext/Actions** — `StyledFlex` in each actions bar now takes `$alignItems`, `$flexDirection`, `$justifyContent`, `$stickyHeader`.
- **Typography** — `commonTextStyles` and `textModifiers` helpers read `$ellipsis` / `$bold` / `$capitalize` / `$italic` / `$lowercase` / `$strikethrough` / `$underline` / `$uppercase`; `Text`, `Small`, and `H0`–`H4` destructure the public modifiers and spread them via a local `toTransientTextProps()`.
- **AccordionPanel** — `$isExpanded` and `$iconLeft` on `StyledAccordionButton` / `StyledAccordionContent`.
- **ButtonGroup** — `$borderRadius` and `$isVisible` on dropdown and item wrappers.
- **Collapse/CollapseTrigger** — `$isOpen`.
- **Lozenge** — `$hasTooltip`.
- **PillTabs** — `$isActive` on `StyledPillTab`; `$isVisible` on `StyledFlexItem` / `StyledGroupSeparator`.
- **Textarea** — `$resize`.
- **Worksheet** — `$minWidth`, `$hasStaticWidth`, `$hasExpandableRows` on the table; `$columnType`, `$columnWidth` on headers; `$containerHeight` on the scroll box; full `StyledCell` props (`$isFirstSelected`, `$isLastSelected`, `$isChild`, `$isLastChild`, `$isEdited`, `$isSelected`, `$isValid`, `$isNextCellValid`, `$type`) and `$isVisible` on `AutoFillHandler`.

Public prop interfaces and CSS output are unchanged; all 1152 tests pass with zero snapshot diffs on v5.
