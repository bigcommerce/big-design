---
"@bigcommerce/big-design": patch
---

Fix infinite re-render loop in Dropdown component when using portal. Ensures List component is always mounted (hidden when closed) to satisfy downshift requirements.
