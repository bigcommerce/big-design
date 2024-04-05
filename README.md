<div align="center">
  <a href="https://design.bigcommerce.com/components">
    <img alt="BigDesign" src="https://bigcommerce.github.io/big-design/banner.svg">
  </a>
</div>

[![npm version](https://img.shields.io/npm/v/@bigcommerce/big-design.svg?style=flat)](https://www.npmjs.com/package/@bigcommerce/big-design) [![CircleCI](https://circleci.com/gh/bigcommerce/big-design.svg?style=shield)](https://circleci.com/gh/bigcommerce/big-design)

### Documentation

You can find documentation and examples on our [docs page](https://bigcommerce.github.io/big-design).

### Quick start guide

Add BigDesign and styled-components@5 to your project using `npm`:

```
npm install @bigcommerce/big-design styled-components@5
```

or with `pnpm`:

```
pnpm add @bigcommerce/big-design styled-components@5
```

Add the font as a `<link>` in your `index.html`/`<head>` element.

```html
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
  <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;600&display=swap" rel="stylesheet" />
</head>
```

Import the `GlobalStyles` component and use it once in your app. This will set a few styles globally
and add [normalize.css](https://github.com/necolas/normalize.css/). We recommend placing it close to
your root component. Then import any component, such as `Button`, to use it anywhere in your app.

```jsx
import { Button, GlobalStyles } from '@bigcommerce/big-design';

...

<App>
  <GlobalStyles />
  <Button>Click me</Button>
</App>
```

### Monorepo

This is a monorepo that uses [Lerna](https://lerna.js.org/) and [pnpm Workspaces](https://pnpmpkg.com/lang/en/docs/workspaces/).

Workspaces are inside the [packages](https://github.com/bigcommerce/big-design/blob/main/packages) directory.

- [big-design](https://github.com/bigcommerce/big-design/blob/main/packages/big-design): React component library.
- [big-design-theme](https://github.com/bigcommerce/big-design/blob/main/packages/big-design-theme): Default Theme.
- [big-design-icons](https://github.com/bigcommerce/big-design/blob/main/packages/big-design-icons): Icons library.
- [docs](https://github.com/bigcommerce/big-design/blob/main/packages/docs): Documentation live here.
- [configs](https://github.com/bigcommerce/big-design/blob/main/packages/configs): (internal) Shared configs between packages.

### Changelogs

As this is a monorepo, each package has it's own Changelog. Links for each can be found below

- [big-design](https://github.com/bigcommerce/big-design/blob/main/packages/big-design/CHANGELOG.md)
- [big-design-theme](https://github.com/bigcommerce/big-design/blob/main/packages/big-design-theme/CHANGELOG.md)
- [big-design-icons](https://github.com/bigcommerce/big-design/blob/main/packages/big-design-icons/CHANGELOG.md)
- [configs](https://github.com/bigcommerce/big-design/tree/main/packages/configs)
- [docs](https://github.com/bigcommerce/big-design/blob/main/packages/docs/CHANGELOG.md)

### Contributing

To contribute, please read our [Contributing](https://github.com/bigcommerce/big-design/blob/main/CONTRIBUTING.md) guidelines
and [Code of Conduct](https://github.com/bigcommerce/big-design/blob/main/CODE_OF_CONDUCT.md) first.

### Development

Running the following commands will run `big-design` and `docs` in watch mode.

```
pnpm
pnpm run build:icons
pnpm run start
```

Run tests with:

```
pnpm run test
```

Run linter with:

```
pnpm run lint
```

### Releasing

This is for releasing new versions of all the packages.

```
GH_TOKEN=<token> pnpm lerna publish <patch/minor/major> --sign-git-commit --sign-git-tag --create-release github --git-remote upstream
```

#### Prereleases

```
GH_TOKEN=<token> pnpm lerna publish prerelease --pre-dist-tag next --conventional-prerelease --sign-git-commit --sign-git-tag --create-release github --git-remote upstream
```

To promote a prerelease add the `--conventional-graduate` flag to release command.

```
GH_TOKEN=<token> pnpm lerna publish <patch/minor/major> --conventional-graduate --sign-git-commit --sign-git-tag --create-release github --git-remote upstream
```

#### `from-package`

`from-package` allows you to release what's on `upstream/main` if the publish script failed. By default the `lerna publish` command will push commits and tags before running through the build. This is a just-in-case command.

```
GH_TOKEN=<token> pnpm lerna publish from-package --git-remote upstream
```

### BigDesign Documentation Release

```
pnpm run build
cd packages/docs
pnpm run deploy --remote upstream
```

### License
Big Design is licensed under MIT and CC BY 3.0. See [LICENSE.md](./LICENSE.md) for more details.
