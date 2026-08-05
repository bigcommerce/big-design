---
"@bigcommerce/big-design": major
---

Migrate `Tooltip` positioning from `react-popper` to `@floating-ui/react`, removing `react-popper` from `@bigcommerce/big-design`.

**Breaking changes:**

- `TooltipProps.modifiers` (typed as `PopperProps['modifiers']`) is replaced by `middleware?: Middleware[]` from `@floating-ui/react`. The default behavior (4px offset, shift to stay in viewport) is unchanged when no `middleware` prop is passed.
- `TooltipProps.placement` now accepts `@floating-ui/react`'s `Placement` values plus `"auto"`, `"auto-start"`, and `"auto-end"`. Explicit placements use `flip()` to reposition on overflow; `"auto*"` values use `autoPlacement()` to pick the side with the most space.

**Migration guide:**

The `middleware` prop replaces `modifiers`. Common popper modifier equivalents:

| Popper modifier | Floating UI middleware |
|---|---|
| `{ name: 'offset', options: { offset: [0, N] } }` | `offset(N)` |
| `{ name: 'preventOverflow' }` | `shift()` |
| `{ name: 'flip' }` | `flip()` (included in defaults) |

The `middleware` prop replaces the entire default stack, so include everything you need:

```tsx
import { offset, shift } from '@floating-ui/react';

// Before — increase offset, prevent overflow
<Tooltip
  placement="left"
  modifiers={[
    { name: 'offset', options: { offset: [0, 20] } },
    { name: 'preventOverflow' },
  ]}
  trigger={<button>Hover me</button>}
>
  Content
</Tooltip>

// After
<Tooltip
  placement="left"
  middleware={[offset(20), shift()]}
  trigger={<button>Hover me</button>}
>
  Content
</Tooltip>
```

```tsx
// Before — custom skidding (cross-axis offset) and distance
<Tooltip
  placement="bottom"
  modifiers={[{ name: 'offset', options: { offset: [12, 8] } }]}
  trigger={<button>Hover me</button>}
>
  Content
</Tooltip>

// After — floating-ui offset takes { mainAxis, crossAxis }
import { offset } from '@floating-ui/react';

<Tooltip
  placement="bottom"
  middleware={[offset({ mainAxis: 8, crossAxis: 12 })]}
  trigger={<button>Hover me</button>}
>
  Content
</Tooltip>
```

```tsx
// Before — auto placement
<Tooltip placement="auto" trigger={<button>Hover me</button>}>
  Content
</Tooltip>

// After — "auto" is now the default, placement can be omitted entirely
<Tooltip trigger={<button>Hover me</button>}>
  Content
</Tooltip>
```
