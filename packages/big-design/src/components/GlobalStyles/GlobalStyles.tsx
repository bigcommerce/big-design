import { withDefaultTheme } from '@bigcommerce/big-design-theme';
import { normalize } from 'polished';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  ${normalize()}

  body {
    font-family: ${(props) => withDefaultTheme(props).theme.typography.fontFamily};
  }
`;
