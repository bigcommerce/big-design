---
'@bigcommerce/big-design-icons': patch
---

fix: mark type-only imports (`IconProps`, `PrivateIconProps`, `FlagIconProps`, `Colors`, `Spacing`, `ThemeInterface`) with the `type` modifier in `base/index.tsx`, `flags/base/index.tsx`, and all 361 generated icon components

These names were imported as regular (value) specifiers even though they're only ever used in type position. Babel's per-file usage analysis failed to elide them, so the compiled `dist/es` output shipped `import` statements referencing names that don't exist at runtime. Classic Rollup silently tolerated the dangling references; Rolldown (Vite 8's new default bundler) treats them as fatal `MISSING_EXPORT` errors, which broke `@bigcommerce/examples`' production build. No public API or runtime behavior changes.
