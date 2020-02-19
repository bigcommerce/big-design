import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { ButtonProps, StyleableButton as _StyleableButton } from './Button';

export const StyleableButton = _StyleableButton;

export const MessagingButton = styled(_StyleableButton)<ButtonProps>`
  background-color: transparent;
  border: ${({ theme }) => theme.border.none};
  color: ${({ theme }) => theme.colors.secondary70};
  height: auto;
  padding: ${({ theme }) => theme.spacing.none};

  &:active {
    background-color: ${({ theme }) => theme.colors.primary20};
  }

  &:focus {
    box-shadow: ${({ theme }) => `0 0 0 ${theme.spacing.xxSmall} ${theme.colors.primary20}`};
  }

  &:hover:not(:active) {
    background-color: ${({ theme }) => theme.colors.primary10};
  }

  &[disabled] {
    color: ${({ theme }) => theme.colors.secondary30};
  }
`;

MessagingButton.defaultProps = { theme: defaultTheme };
