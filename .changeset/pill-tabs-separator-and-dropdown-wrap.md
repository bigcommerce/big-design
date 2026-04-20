---
'@bigcommerce/big-design': minor
'@bigcommerce/docs': minor
---

Fix PillTabs group separator padding and add `maxWidth` support to Dropdown.

- `PillTabs`: the group separator used symmetric horizontal margins which — combined with the preceding pill's `marginRight="xSmall"` — produced a larger gap on the left than on the right. The separator's left margin is now `0`, so spacing is symmetric on both sides.
- `Dropdown`: new optional `maxWidth` prop. When set, dropdown items are capped at that width (in px) and long content wraps via `overflow-wrap: break-word` / `word-break: break-word` / `white-space: normal`, preventing the overflow menu from breaking the layout on very long item labels.
- `PillTabs`: new optional `dropdownMaxWidth` prop that is forwarded to the overflow `Dropdown` as `maxWidth`, so consumers can opt in to wrapping long pill titles inside the "more" menu.
