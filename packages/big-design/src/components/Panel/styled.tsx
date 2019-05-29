import styled from 'styled-components';

import { defaultTheme } from '../../theme';
import { Box } from '../Box';

import { PanelProps } from './Panel';

// border-radius: none cascades over elevation: raised border-radius
export const StyledPanel = styled(Box)<PanelProps>`
  ${({ theme }) => theme.elevation.raised};
  border-radius: ${({ theme }) => theme.borderRadius.none};
  ${({ theme }) => theme.breakpoints.tablet} {
    ${({ theme }) => theme.elevation.floating}
  }
`;

StyledPanel.defaultProps = {
  theme: defaultTheme,
};
