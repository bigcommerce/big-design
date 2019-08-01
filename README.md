<div align="center">
  <a href="https://bigcommerce.design/bigdesign">
    <img alt="BigDesign" src="https://bigcommerce.github.io/big-design/logo.svg" width="546">
  </a>
</div>

---

### Documentation

You can find the documentation and examples on our [docs page](https://bigcommerce.github.io/big-design).

### Quick start guide

Add BigDesign and styled-components to your project using `npm`:

```
npm install @bigcommerce/big-design styled-components
```

or with `yarn`:

```
yarn add @bigcommerce/big-design styled-components
```


Import the `GlobalStyles` component and use it once in your app. This will set a couple of styles globally,
such as a base font family and a normalizer. We recommend it placing it close to your root component.
Then import any other component such as `Button` and use it anywhere in your app.
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

- [**big-design**](https://github.com/bigcommerce/big-design/blob/master/packages/big-design): React component library.
- [**big-design-theme**](https://github.com/bigcommerce/big-design/blob/master/packages/big-design-theme): Default Theme.
- [**big-design-icons**](https://github.com/bigcommerce/big-design/blob/master/packages/big-design-icons): Icons library.
- [**storybook**](https://github.com/bigcommerce/big-design/blob/master/packages/storybook): Component stories and docs live here.
- [**configs**](https://github.com/bigcommerce/big-design/blob/master/packages/configs): (internal) Shared configs between packages.

### Changelogs

As this is a monorepo, each package has it's own Changelog. Links for each can be found below

- [big-design](https://github.com/bigcommerce/big-design/blob/master/packages/big-design/CHANGELOG.md)
- [big-design-theme](https://github.com/bigcommerce/big-design/blob/master/packages/big-design-theme/CHANGELOG.md)
- [big-design-icons](https://github.com/bigcommerce/big-design/blob/master/packages/big-design-icons/CHANGELOG.md)
- [configs](https://github.com/bigcommerce/big-design/tree/master/packages/configs)
- [storybook](https://github.com/bigcommerce/big-design/blob/master/packages/storybook/CHANGELOG.md)

### Development:

Running the following commands will run `big-design` and `storybook` in watch mode.
Please read our [Contributing](https://github.com/bigcommerce/big-design/blob/master/CONTRIBUTING.md)
and [Code of Conduct](https://github.com/bigcommerce/big-design/blob/master/CODE_OF_CONDUCT.md) first.

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
