import { GlobalStyles } from '@bigcommerce/big-design';
import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import React from 'react';
import { render } from 'react-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import { App } from './App';

const AppGlobalStyles = createGlobalStyle`
  body {
    height: 100%;
    max-width: 1080px;
    margin: 2rem auto;
    background-color: ${({ theme }) => theme.colors.secondary10};
  }
`;

render(
  <ThemeProvider theme={defaultTheme}>
    <>
      <AppGlobalStyles />
      <GlobalStyles />
      <App />
    </>
  </ThemeProvider>,
  document.getElementById('root'),
);
