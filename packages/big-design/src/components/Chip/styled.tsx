import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { Box } from '../Box';
import { StyleableButton } from '../Button/private';

export const StyledChip = styled(Box)`
  align-items: center;
  display: inline-flex;
  user-select: none;
`;

export const StyledCloseButton = styled(StyleableButton)`
  color: ${({ theme }) => theme.colors.secondary60};
  height: auto;
  padding: 0;
  width: auto;
`;

StyledChip.defaultProps = {
  theme: defaultTheme,
};

StyledCloseButton.defaultProps = {
  theme: defaultTheme,
};
