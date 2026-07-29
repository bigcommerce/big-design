---
"@bigcommerce/big-design": minor
---

Migrate `TableNext` drag-and-drop from the archived `react-beautiful-dnd` to `@atlaskit/pragmatic-drag-and-drop`, mirroring the `Table` migration. The public API is unchanged: `onRowDrop(from, to)` still fires with the same `from`/`to` indices and no drag-and-drop library types leak into public props. Pointer dragging shows a floating preview of the row under the cursor plus a phantom placeholder row at the drop position (the source row is hidden while it shows, so the table doesn't shift); keyboard-only reordering (grab with `Space`/`Enter`, move with the arrow keys, drop with `Space`/`Enter`, cancel with `Escape`) and screen-reader announcements are provided explicitly for WCAG 2.2 AA parity. `react-beautiful-dnd` and `@types/react-beautiful-dnd` are removed entirely from `@bigcommerce/big-design` and `@bigcommerce/docs`, along with the rbd-specific `resetServerContext` SSR helper in the docs `_document.tsx`.
