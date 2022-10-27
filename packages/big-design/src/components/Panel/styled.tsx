import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { Box } from '../Box';
import { StyleableH2 } from '../Typography/private';

export const StyledPanel = styled(Box)`
  border-radius: ${({ theme }) => theme.borderRadius.none};

  ${({ theme }) => theme.breakpoints.tablet} {
    border-radius: ${({ theme }) => theme.borderRadius.normal};
  }
`;

export const StyledH2 = styled(StyleableH2)`
  flex-grow: 1;

  & ~ .bd-button {
    width: auto;
    margin-top: 0;
  }
`;

StyledPanel.defaultProps = { theme: defaultTheme };
StyledH2.defaultProps = { theme: defaultTheme };
