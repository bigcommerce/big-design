import styled from 'styled-components';

import { defaultTheme } from '../../theme';
import { Box } from '../Box';

import { PanelProps } from './Panel';

export const StyledPanel = styled(Box)<PanelProps>`
  border-radius: ${({ theme }) => theme.borderRadius.none};

  ${({ theme }) => theme.breakpoints.tablet} {
    ${({ theme }) => theme.elevation.floating}
  }
`;

StyledPanel.defaultProps = {
  theme: defaultTheme,
};
