---
"@bigcommerce/big-design": patch
---

Begin migrating tag-target styled components to transient (`$`-prefixed) props ahead of styled-components 6, which drops v5's automatic prop filtering. This foundation change converts the shared `withMargins`/`withPaddings`/`withDisplay` helpers to read `$`-prefixed props (adding `toTransient{Margin,Padding,Display}Props` mapping utilities) and applies the pattern to its first consumer, `Box`. The helpers temporarily read both the public and `$`-prefixed names so remaining components can migrate one PR at a time; the fallback is removed once all consumers are converted. No public API change (consumers still write `<Box backgroundColor="primary" />`) and no CSS output change. Fixing `Box`'s internal prop hand-off does stop it leaking the `display` prop onto the real DOM node (`display` is a valid SVG attribute, so v5 forwarded it); snapshots for components that route `display` through `Box`/`Flex` are updated to drop that stray attribute.
