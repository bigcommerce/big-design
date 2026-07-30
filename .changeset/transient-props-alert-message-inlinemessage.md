---
"@bigcommerce/big-design": patch
---

Continue migrating tag-target styled components to transient (`$`-prefixed) props ahead of styled-components 6 (LTRAC-1396, Stage 3). `Alert`, `Message`, and `InlineMessage` all blind-spread `onClose` onto their `styled(Grid)` target; destructure it out and route it as an explicit `$onClose` JSX prop. Also drop the `messages={messages}` prop pass to each styled target — none of the three ever read `messages` in their own CSS, so it was dead weight (the same pattern as `error` on `Input`'s `StyledInput` from a prior PR in this stage).

`type` is deliberately left un-prefixed on all three: it already leaks onto the real DOM node today (confirmed via the existing snapshots, e.g. a literal `type="success"` attribute), because their target is `styled(Grid)` — a component, not a plain tag — so styled-components' v5 attribute-name filtering never applied to it in the first place. Since `type` is a real HTML attribute name, this leak is identical on v5 and v6 (not the "only breaks under v6" problem this migration targets), and $-prefixing it would change existing DOM/snapshot output rather than being a no-op. Flagging as a separate, out-of-scope pre-existing bug.

Introduced internal `StyledAlertProps`/`StyledMessageProps`/`StyledInlineMessageProps` types (just `type` + `$onClose`) instead of reusing the public `AlertProps`/`MessageProps`/`InlineMessageProps` interfaces directly on the styled component's generic, matching the `Box` template.

Public prop interfaces and CSS output are unchanged; all 182 snapshots pass with zero diffs.
