import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { StyleableButton } from '../Button/private';

export const StyledButton = styled(StyleableButton)`
  background-color: transparent;
  border-color: transparent;
  color: ${({ theme }) => theme.colors.secondary70};
  width: auto;
  &:active {
    background-color: ${({ theme }) => theme.colors.secondary20};
  }
  &:focus {
    box-shadow: ${({ theme }) => `0 0 0 ${theme.spacing.xxSmall} ${theme.colors.secondary20}`};
  }
  &:hover:not(:active) {
    background-color: ${({ theme }) => theme.colors.secondary10};
  }
  &[disabled] {
    border-color: transparent;
    color: ${({ theme }) => theme.colors.secondary30};
  }
`;

StyledButton.defaultProps = { theme: defaultTheme };
