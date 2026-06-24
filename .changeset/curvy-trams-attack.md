---
'@bigcommerce/big-design': minor
'@bigcommerce/docs': minor
---

feat(component): add the new `InfoCard` component for displaying a title with an optional thumbnail, description, and status badge.

The `img` prop accepts all native `<img />` element attributes (`ComponentPropsWithoutRef<'img'>`). The thumbnail renders at 40&times;40 by default, and the size can be overridden via the native `width`/`height` attributes. `alt` defaults to an empty string (decorative) per WCAG 1.1.1.
