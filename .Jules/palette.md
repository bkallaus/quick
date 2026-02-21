## 2026-02-21 - PicoCSS Input Group Pattern
**Learning:** Standard `<label><input /></label>` wrapping is incompatible with PicoCSS's `<fieldset role="group">` for grouping inputs and buttons horizontally.
**Action:** Use a wrapper `div` containing a `label` with `htmlFor` and the `fieldset role="group"` with the input (matching `id`) and button.
