import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { Box } from '../Box';

import { PanelProps } from './Panel';

export const StyledPanel = styled(Box)<PanelProps>`
  border-radius: ${({ theme }) => theme.borderRadius.none};

  ${({ theme }) => theme.breakpoints.tablet} {
    ${({ theme }) => theme.shadow.floating}
  }
`;

StyledPanel.defaultProps = {
  theme: defaultTheme,
};
