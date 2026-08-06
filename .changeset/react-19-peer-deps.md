---
"@bigcommerce/big-design": major
"@bigcommerce/big-design-icons": major
"@bigcommerce/big-design-patterns": major
"@bigcommerce/big-design-theme": major
---

Bump peer dependencies to React 19. All packages now require `react` and `react-dom` `^19.0.0`. `@types/react` and `@types/react-dom` are updated to `^19.0.0` as well.

Breaking changes driven by React 19 type updates:

- `TableColumn.render` type narrowed from `ComponentType<T> | ((props: T) => ReactNode)` to `(props: T, context?: any) => ReactNode` — class-component render references are no longer typed (they remain callable at runtime via their call signature).
- `RefObject<T>` is now `RefObject<T | null>` throughout the public prop API, matching React 19's revised `createRef`/`useRef` signatures.
- `MutableRefObject` removed from public types; use `RefObject` instead.
- `FormEvent` replaced with `SubmitEvent` for `onSubmit` handlers, matching React 19's new `SubmitEventHandler` type.
