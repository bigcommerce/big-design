import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { normalize } from 'polished';
import React, { useContext } from 'react';
import { createGlobalStyle, ThemeContext } from 'styled-components';

const BaseGlobalStyles = createGlobalStyle<{ $fontFamily: string }>`
  ${normalize()}

  body {
    font-family: ${({ $fontFamily }) => $fontFamily};
  }
`;

export const GlobalStyles: React.FC = () => {
  // ThemeContext returns undefined when no ThemeProvider is present; fall back to defaultTheme
  const theme = useContext(ThemeContext) ?? defaultTheme;

  return <BaseGlobalStyles $fontFamily={theme.typography.fontFamily} />;
};
