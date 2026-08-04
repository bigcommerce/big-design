import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { normalize } from 'polished';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  ${normalize()}

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily};
  }
`;

// styled-components 6 types createGlobalStyle's return without `defaultProps`, but the
// runtime still reads it as the theme fallback (determineTheme), so assign it untyped.
Object.assign(GlobalStyles, { defaultProps: { theme: defaultTheme } });
