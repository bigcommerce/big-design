# BigDesign [![npm version](https://img.shields.io/npm/v/@bigcommerce/big-design.svg?style=flat)](https://www.npmjs.com/package/@bigcommerce/big-design) [![CircleCI](https://circleci.com/gh/bigcommerce/big-design.svg?style=shield)](https://circleci.com/gh/bigcommerce/big-design)

BigDesign React components.

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
  <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@200;300;400;600&display=swap" rel="stylesheet" />
</head>
```

If using Next.js, utilize the `next/fonts/google` import:

```tsx
import { Source_Sans_3 } from 'next/font/google';

const sourceSans3 = Source_Sans_3({
  display: 'swap',
  weight: ["200", "300", "400", "600"],
  subsets: ['latin'],
});
```

See https://nextjs.org/docs/app/api-reference/components/font for more details on how to apply the font.

Import the `GlobalStyles` component and use it once in your app. This will set a few styles globally
and add [normalize.css](https://github.com/necolas/normalize.css/). We recommend placing it close to
your root component. Then import any component, such as `Button`, to use it anywhere in your app.

```jsx
import { Button, GlobalStyles } from '@bigcommerce/big-design';

// ...

<App>
  <GlobalStyles />
  <Button>Click me</Button>
</App>
```
