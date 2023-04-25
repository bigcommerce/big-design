'use client';

import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { normalize } from 'polished';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  ${normalize()}

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily};
  }
`;

GlobalStyles.defaultProps = { theme: defaultTheme };
