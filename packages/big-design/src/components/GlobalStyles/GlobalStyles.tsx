import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { normalize } from 'polished';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  ${normalize()}

  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600');

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily};
  }
`;

GlobalStyles.defaultProps = { theme: defaultTheme };
