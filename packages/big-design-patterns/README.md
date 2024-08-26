# BigDesign Patterns [![npm version](https://img.shields.io/npm/v/@bigcommerce/big-design-patterns.svg?style=flat)](https://www.npmjs.com/package/@bigcommerce/big-design-patterns) [![CircleCI](https://circleci.com/gh/bigcommerce/big-design.svg?style=shield)](https://circleci.com/gh/bigcommerce/big-design)

BigDesign React Patterns.

### Documentation

You can find documentation and examples on our [docs page](https://bigcommerce.github.io/big-design).

### Quick start guide

Add `@bigcommerce/big-design`, `@bigcommerce/big-design-patterns` and `styled-components@5` to your project using `npm`:

```
npm install @bigcommerce/big-design @bigcommerce/big-design-patterns styled-components@5
```

or with `pnpm`:

```
pnpm add @bigcommerce/big-design @bigcommerce/big-design-patterns styled-components@5
```

Setup BigDesign as per the [Quick start guide](https://github.com/bigcommerce/big-design/tree/main/packages/big-design#quick-start-guide) and then import any pattern, such as `Page` and `Header`, to use it anywhere in your app.

```tsx
import { Panel } from '@bigcommerce/big-design';
import { AddIcon } from '@bigcommerce/big-design-icons';
import { Page, Header } from '@bigcommerce/big-design-patterns';

export default function App() {
  const header = (
    <Header
      title="Products"
      description="View and manage your products."
      actions={[{ text: 'Add new', iconLeft: <AddIcon /> }]}
    />
  );

  return (
    <Page header={header}>
      <Panel header="Main content">
        ...
      </Panel>
    </Page>
  );
}
