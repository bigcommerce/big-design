---
"@bigcommerce/big-design": patch
"@bigcommerce/big-design-icons": patch
"@bigcommerce/docs": patch
---

Fix a regression from the type-only-import fix (see the "ESM build shipping runtime imports for type-only names" changeset): using inline `type` modifiers (`import { type X }`) instead of the whole-statement form (`import type { X }`) still left a bare `require(...)` of the module behind, since Babel can't prove a plain import specifier has no side effects. In `utils/messagingHelpers.ts` and `utils/treeHelpers.ts`, that bare require created a real circular `require` chain back through `utils/index.ts` before its `typedMemo` export was assigned, crashing with `(0, _utils.typedMemo) is not a function` on `require('@bigcommerce/big-design')` — reproducible with no bundler involved, and present even under CommonJS/Node.js. `@typescript-eslint/consistent-type-imports`'s `fixStyle` is now `separate-type-imports`, which fully elides the runtime footprint whenever every binding from a specifier is type-only.
