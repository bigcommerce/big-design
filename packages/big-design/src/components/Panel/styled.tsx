import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { Box } from '../Box';
import { StyleableH2 } from '../Typography/private';

export const StyledPanel = styled(Box)`
  ${({ theme }) => theme.breakpoints.tablet} {
    ${({ theme }) => theme.shadow.floating}
  }
`;

export const StyledH2 = styled(StyleableH2)`
  flex-grow: 1;

  & ~ .bd-button {
    width: auto;
    margin-top: 0;
  }
`;

StyledPanel.defaultProps = {
  theme: defaultTheme,
  marginBottom: 'medium',
};
StyledH2.defaultProps = { theme: defaultTheme };
