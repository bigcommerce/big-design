import * as React from 'react';
import { render } from 'react-dom';

import { App } from './App';
import { GlobalStyles } from '@bigcommerce/big-design';
import { theme } from '@bigcommerce/big-design-theme';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

const AppGlobalStyles = createGlobalStyle`
  body {
    height: 100%;
    max-width: 1080px;
    margin: 2rem auto;
    background-color: ${({ theme }) => theme.colors.secondary10};
  }
`;

render(
  <ThemeProvider theme={theme}>
    <>
      <AppGlobalStyles />
      <GlobalStyles />
      <App />
    </>
  </ThemeProvider>,
  document.getElementById('root')
);
