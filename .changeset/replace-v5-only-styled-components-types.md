---
"@bigcommerce/big-design": patch
"@bigcommerce/big-design-theme": patch
---

Replace `FlattenSimpleInterpolation` with a version-agnostic `CSSRules` alias (`ReturnType<typeof css>`) and drop the explicit `styled<StyledComponent<...>>(...)` generics in favor of inferred typing, so published `.d.ts` files no longer reference type names that only exist in styled-components v5's types. No runtime change; public prop shapes are unchanged for v5 consumers.
