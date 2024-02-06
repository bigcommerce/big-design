import { normalize } from 'polished';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  ${normalize()}

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily};
  }
`;
