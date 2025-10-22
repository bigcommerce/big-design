import { GlobalStyles } from '@bigcommerce/big-design';
import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import React from 'react';
import { createRoot } from 'react-dom/client';
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

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);

  root.render(
    <ThemeProvider theme={defaultTheme}>
      <>
        <AppGlobalStyles />
        <GlobalStyles />
        <App />
      </>
    </ThemeProvider>,
  );
}
