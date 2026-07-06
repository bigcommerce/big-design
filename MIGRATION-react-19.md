# React 19 Migration Notes

BigDesign supports React 18 and React 19 for:

- `@bigcommerce/big-design`
- `@bigcommerce/big-design-icons`
- `@bigcommerce/big-design-patterns`
- `@bigcommerce/big-design-theme`

The React and React DOM peer dependency ranges for these packages allow `^18.0.0 || ^19.0.0`.

## Consumer Expectations

Use React and React DOM from the same major version:

```bash
pnpm add react@^19 react-dom@^19
```

BigDesign still supports styled-components 5.x. Consumers should keep `styled-components@^5.3.5` installed.

BigDesign components no longer rely on function-component `defaultProps` for runtime defaults. Components and icons preserve their documented defaults through parameter defaults, explicit normalization, and BigDesign's default theme fallback helper.

`Alert`, `Message`, and `InlineMessage` now type `messages` as optional and default it to an empty array when omitted.

Icon and flag icon `size` props now explicitly accept spacing keys, numeric pixel values, and custom CSS length strings. This documents the public type broadening made while preserving React 19-compatible icon defaults.

## TypeScript Notes

BigDesign's development type dependencies remain on `@types/react` 18.x for this release. Consumers may still use `@types/react` 19.x, but React 19's type package includes upstream breaking type changes that can surface in application code.

Common React 19 type impacts include:

- `React.FC` no longer supplies implicit `children`.
- `ReactElement` props default to `unknown`.
- `useRef` requires an argument.
- Ref callback cleanup typing is stricter.
- The global JSX namespace is scoped differently.

Use React's official upgrade guide for the full TypeScript migration details:

https://react.dev/blog/2024/04/25/react-19-upgrade-guide#typescript-changes

## Known Third-Party Peer Constraints

The compatibility audit found third-party runtime dependencies whose published peer ranges do not yet all include React 19:

- `react-popper@2.3.0`
- `react-beautiful-dnd@13.1.1`
- `react-datepicker@7.3.0`

These packages are transitive dependencies of BigDesign features such as popovers, dropdowns, tooltips, draggable tables, and date pickers. Package managers that enforce strict transitive peers may warn or fail until these dependencies are replaced or upgraded. BigDesign's own package metadata now permits React 19.

The React 19 smoke harness is available with:

```bash
pnpm run test:react-19-smoke
```

The harness builds the packed BigDesign packages before creating tarballs so it validates current `dist` artifacts.
