---
'@bigcommerce/big-design': patch
---

fix: stop `Dropdown` from calling `onItemClick` again when a hidden `<Activity>` is shown again

`Dropdown` controls Downshift's `selectedItem` as `null`, but Downshift keeps the selected item in its internal state until its next action. Downshift calls `onSelectedItemChange` from an effect, which compares the previous state (with controlled props applied) against the internal state (without them), so the stale item looks like a change whenever that effect re-runs. React re-runs effects when a hidden `<Activity>` boundary becomes visible again, and once more under `StrictMode`. Next.js does this for previously visited routes when `cacheComponents` is enabled, so an `onItemClick` that navigated away ran again on back navigation and navigated straight back.

`Dropdown` now clears Downshift's internal selection with `selectItem(null)` after handling a selection, so a re-run effect has nothing to replay. Choosing the same item again still calls `onItemClick`.
