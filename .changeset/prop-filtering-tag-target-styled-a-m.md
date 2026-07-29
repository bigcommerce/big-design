---
"@bigcommerce/big-design": patch
---

Add `.withConfig({ shouldForwardProp: isPropValid })` to tag-target styled components (`styled.div`, `styled.span`, etc.) across A-M components (Box, Button, Checkbox, Datepicker, FeatureSet, Fieldset, FileUploader, Form, InfoCard, Input, Link, List, Lozenge, Modal, and others). styled-components 6 drops v5's automatic filtering of unknown props on tag targets, so system props like `backgroundColor`, `border`, and margin/padding props would otherwise leak onto the DOM as invalid HTML attributes and trigger React unknown-prop warnings. `@emotion/is-prop-valid` is the same predicate styled-components 5 used internally, and `withConfig` has been supported since styled-components 5.2.1, so this is a behavior-preserving no-op under the current styled-components 5. `styled(Component)` composition is untouched since it already inherits the base component's prop filtering. N-Z components, icons, and patterns are covered in a follow-up.
