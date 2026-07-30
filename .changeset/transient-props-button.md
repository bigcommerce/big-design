---
"@bigcommerce/big-design": patch
---

Continue migrating tag-target styled components to transient (`$`-prefixed) props ahead of styled-components 6 (LTRAC-1396, Stage 3). `Button` blind-spread `iconOnly`/`iconLeft`/`iconRight` onto its styled `<button>` and read `actionType`/`variant`/`mobileWidth` (plus `isLoading` on its `ContentWrapper`) directly; destructure them out and route them as explicit `$`-prefixed JSX props, plus route margins through the existing `toTransientMarginProps()` utility. Introduce an internal `StyledButtonProps` type instead of reusing the public `ButtonProps` interface directly on the styled component's generic, matching the `Box` template.

`FileUploader/DropZone.tsx` renders `Button`'s `StyledButton` directly (via a thin wrapper in `FileUploader/styled.ts`) and passed it bare `marginTop`/`variant` — update those two call sites to the new `$`-prefixed names as a required knock-on fix; this does not touch `DropZone`'s own `StyledDropzone` bespoke props (`isDragOver`/`isValid`), which are a separate, later stage.

Public `ButtonProps` and CSS output are unchanged; all 182 snapshots pass with zero diffs, including `Button`'s especially heavy snapshot suite.
