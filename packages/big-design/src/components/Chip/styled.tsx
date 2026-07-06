import { remCalc, withDefaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { Box } from '../Box';
import { StyleableButton } from '../Button/private';

export const StyledChip = styled(Box).attrs(withDefaultTheme)`
  align-items: center;
  display: inline-flex;
  user-select: none;
`;

export const StyledChipIcon = styled(Box).attrs(withDefaultTheme)`
  margin-right: ${({ theme }) => theme.spacing.xxSmall};
  display: inline-flex;
  align-items: center;

  svg {
    height: ${remCalc(16)};
    width: ${remCalc(16)};
  }
`;

export const StyledCloseButton = styled(StyleableButton).attrs(withDefaultTheme)`
  color: ${({ theme }) => theme.colors.secondary60};
  height: auto;
  padding: 0;
  width: auto;
  min-width: auto;
`;
