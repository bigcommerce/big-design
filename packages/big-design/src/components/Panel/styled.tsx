import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { Box } from '../Box';

export const StyledPanel = styled(Box)`
  ${({ theme }) => theme.breakpoints.tablet} {
    ${({ theme }) => theme.shadow.floating}
  }
`;

StyledPanel.defaultProps = {
  theme: defaultTheme,
};
