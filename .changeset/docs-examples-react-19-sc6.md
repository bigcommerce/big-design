---
"@bigcommerce/docs": minor
"@bigcommerce/examples": minor
---

Move the docs site and examples app to React 19 and styled-components 6. The examples app keeps its `*` ranges on the BigDesign packages so standalone forks (CodeSandbox) resolve from the registry, with `linkWorkspacePackages: true` linking them to workspace source in-repo, and gains a Vite config with `resolve.dedupe` and `@vitejs/plugin-react` 5.
