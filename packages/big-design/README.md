# BigDesign

BigDesign as React components.

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

// ...

<App>
  <GlobalStyles />
  <Button>Click me</Button>
</App>
```
