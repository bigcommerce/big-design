---
"@bigcommerce/big-design": patch
---

Rebuild `RadioLabel`, `CheckboxLabel`, and `FormControlLabel`'s underlying styled component on a native `styled.label` base instead of wrapping the `Text`/`H4` typography primitives with an `as: 'label'` override. This removes the last `styled<StyledComponent<...>>(...)` generic from the public `.d.ts` output (a v5-only styled-components type name) without narrowing the public prop types, which still extend the full native `label` element attributes. No visible rendering change; only the internal generated class names shift.
