---
'@bigcommerce/big-design-patterns': patch
---

Updates the `Page` and `ActionBar` components to work outside of iframes. In the context of our Control Panel, we may have pages that are directly rendered. This allows a "fixed" position item to float only within the page context.
