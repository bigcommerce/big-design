---
"@bigcommerce/docs": patch
---

Clear Next.js warnings surfaced by `pnpm run start` and the docs build: move the Google Fonts stylesheet link out of `next/head` into `_document.tsx`, configure `images.qualities` for the logo's explicit quality prop, and drop `legacyBehavior`/`passHref` from `NextLink`/`SideNavLink` in favor of styling `next/link`'s `Link` directly. No visible change to the docs site.
