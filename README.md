<div align="center">
  <a href="https://design.bigcommerce.com/components">
    <img alt="BigDesign" src="https://bigcommerce.github.io/big-design/logo-with-text.svg" width="546">
  </a>
</div>

---

[![npm version](https://img.shields.io/npm/v/@bigcommerce/big-design.svg?style=flat)](https://www.npmjs.com/package/@bigcommerce/big-design) [![CircleCI](https://circleci.com/gh/bigcommerce/big-design.svg?style=shield)](https://circleci.com/gh/bigcommerce/big-design)

### Documentation

You can find documentation and examples on our [docs page](https://bigcommerce.github.io/big-design).

### Quick start guide

Add BigDesign and styled-components to your project using `npm`:

```
npm install @bigcommerce/big-design styled-components
```

or with `yarn`:

```
yarn add @bigcommerce/big-design styled-components
```

Import the `GlobalStyles` component and use it once in your app. This will set a few styles globally,
including a base font family, [Source Sans Pro](https://fonts.google.com/specimen/Source+Sans+Pro) and [normalize.css](https://github.com/necolas/normalize.css/). We recommend placing it close to your root component.
Then import any component, such as `Button`, to use it anywhere in your app.

```jsx
import { Button, GlobalStyles } from '@bigcommerce/big-design';

...

<App>
  <GlobalStyles />
  <Button>Click me</Button>
</App>
```

### Monorepo

This is a monorepo that uses [Lerna](https://lernajs.io) and [Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/).

Workspaces are inside the [packages](https://github.com/bigcommerce/big-design/blob/master/packages) directory.

- [big-design](https://github.com/bigcommerce/big-design/blob/master/packages/big-design): React component library.
- [big-design-theme](https://github.com/bigcommerce/big-design/blob/master/packages/big-design-theme): Default Theme.
- [big-design-icons](https://github.com/bigcommerce/big-design/blob/master/packages/big-design-icons): Icons library.
- [docs](https://github.com/bigcommerce/big-design/blob/master/packages/docs): Documentation live here.
- [configs](https://github.com/bigcommerce/big-design/blob/master/packages/configs): (internal) Shared configs between packages.

### Changelogs

As this is a monorepo, each package has it's own Changelog. Links for each can be found below

- [big-design](https://github.com/bigcommerce/big-design/blob/master/packages/big-design/CHANGELOG.md)
- [big-design-theme](https://github.com/bigcommerce/big-design/blob/master/packages/big-design-theme/CHANGELOG.md)
- [big-design-icons](https://github.com/bigcommerce/big-design/blob/master/packages/big-design-icons/CHANGELOG.md)
- [configs](https://github.com/bigcommerce/big-design/tree/master/packages/configs)
- [docs](https://github.com/bigcommerce/big-design/blob/master/packages/docs/CHANGELOG.md)

### Contributing

To contribute, please read our [Contributing](https://github.com/bigcommerce/big-design/blob/master/CONTRIBUTING.md) guidelines
and [Code of Conduct](https://github.com/bigcommerce/big-design/blob/master/CODE_OF_CONDUCT.md) first.

### Development

Running the following commands will run `big-design` and `docs` in watch mode.

```
yarn
yarn run build
yarn run start
```

Run tests with:

```
yarn run test
```

Run linter with:

```
yarn run lint
```
