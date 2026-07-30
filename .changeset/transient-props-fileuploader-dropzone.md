---
"@bigcommerce/big-design": patch
---

Continue migrating tag-target styled components to transient (`$`-prefixed) props ahead of styled-components 6 (LTRAC-1396, Stage 3, final group). `FileUploader/DropZone`'s `StyledDropzone` reads `isDragOver`/`isValid` as explicit (never blind-spread) local-state props; `$`-prefix both at the styled definition and the `DropZone.tsx` call site. `disabled` stays un-prefixed (a recognized DOM attribute name, consistent with every other component in this migration).

Flagging, not fixing: `FileUploader/File.tsx`'s `StyledFile` has the identical `isValid` pattern but isn't on this stage's explicit target list; needs the same treatment in a follow-up.

This closes out Stage 3 (blind-spread + shared-helper components) of LTRAC-1396. Public `Props` and CSS output are unchanged; all 182 snapshots pass with zero diffs.
