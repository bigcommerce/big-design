# BigDesign Theme [![npm version](https://img.shields.io/npm/v/@bigcommerce/big-design-theme.svg?style=flat)](https://www.npmjs.com/package/@bigcommerce/big-design) [![CircleCI](https://circleci.com/gh/bigcommerce/big-design.svg?style=shield)](https://circleci.com/gh/bigcommerce/big-design)

BigDesign design system.

### Documentation

You can find documentation and examples on our [docs page](https://developer.bigcommerce.com/big-design).

## Note

[BigDesign](https://github.com/bigcommerce/big-design/blob/master/packages/big-design) components use this theme by default.
This package is only meant to be used directly when more advanced features are needed such as:

- When you app uses an html font size different than `16px`.
- Creating a brand new theme.
- Typescript typings.

### Quick start guide

Add the BigDesign theme and styled-components@5 to your project using `npm`:

```
npm install @bigcommerce/big-design-theme styled-components@5
```

or with `yarn`:

```
yarn add @bigcommerce/big-design-theme styled-components@5
```

```tsx
// index.tsx

import { theme } from '@bigcommerce/big-design-theme';
import { ThemeProvider } from 'styled-components';

// ...

ReactDOM.render(
  <ThemeProvider theme={theme}>
      <App />
  </ThemeProvider>,
  document.getElementById('root'),
);
```

#### Using a different html font size

When your app uses an html font size different than `16px` you will need to create a new theme that uses
your app's html font size internally to calculate spacings and sizes.

The following example show how to create a theme using a `14px` html font size and provide the theme to your app.

```jsx
import { createTheme } from '@bigcommerce/big-design-theme';
import { ThemeProvider } from 'styled-components';

const theme = createTheme({ htmlFontSize: 14 });

// ...

<ThemeProvider theme={theme}>
  <App />
</ThemeProvider>;
```
