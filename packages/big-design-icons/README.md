# BigDesign Icons [![npm version](https://img.shields.io/npm/v/@bigcommerce/big-design-icons.svg?style=flat)](https://www.npmjs.com/package/@bigcommerce/big-design) [![CircleCI](https://circleci.com/gh/bigcommerce/big-design.svg?style=shield)](https://circleci.com/gh/bigcommerce/big-design)

BigDesign Icons as React components.

### Documentation

You can find documentation, list of icons, and examples on our [docs page](https://developer.bigcommerce.com/big-design/icons).

### Quick start guide

Add BigDesign Icons and styled-components@5 to your project using `npm`:

```
npm install @bigcommerce/big-design-icons styled-components@5
```

or with `yarn`:

```
yarn add @bigcommerce/big-design-icons styled-components@5
```

Import any icon component and use it anywhere in your app.

```jsx
import { StoreIcon } from '@bigcommerce/big-design-icons';

...

<App>
  <StoreIcon />
</App>
```

### Adding New Icons

To add new icons, use the built-in script to download the svg from [Material Icons - Rounded](https://fonts.google.com/icons?selected=Material+Icons&icon.style=Rounded):

```
yarn run download
```

After you've searched and downloaded your icon(s), run the build script to convert your svgs into React components:

```
yarn run build:icons
```
