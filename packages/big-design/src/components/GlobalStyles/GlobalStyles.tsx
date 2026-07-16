import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { normalize } from 'polished';
import { createGlobalStyle } from 'styled-components';

import { themeToCssVariables } from '../../helpers/themeCssVariables';

import '../../styles.css';

export const GlobalStyles = createGlobalStyle`
  ${normalize()}

  :root {
    ${({ theme }) => themeToCssVariables(theme)}
  }

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily};
  }
`;

GlobalStyles.defaultProps = { theme: defaultTheme };
