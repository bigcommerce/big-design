import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { StyleableButton } from '../Button/private';
import { FlexItem } from '../Flex';

interface StyledButtonProps {
  borderRadius?: boolean;
}

interface StyledFlexItemProps {
  isVisible: boolean;
}

export const StyledButton = styled(StyleableButton)<StyledButtonProps>`
  ${({ borderRadius, theme }) =>
    borderRadius
      ? css`
          border-radius: ${theme.borderRadius.normal};
        `
      : css`
          border-radius: ${theme.borderRadius.none};
        `}

  &:focus {
    z-index: 1;
  }
`;

export const StyledFlexItem = styled(FlexItem)<StyledFlexItemProps>`
  margin-right: -1px;

  &:last-of-type {
    margin-right: 0;
  }

  &:first-of-type ${StyledButton} {
    border-bottom-left-radius: ${({ theme }) => theme.borderRadius.normal};
    border-top-left-radius: ${({ theme }) => theme.borderRadius.normal};
  }

  &:nth-last-of-type(-n + 2) ${StyledButton} {
    border-bottom-right-radius: ${({ theme }) => theme.borderRadius.normal};
    border-top-right-radius: ${({ theme }) => theme.borderRadius.normal};
  }

  ${({ isVisible }) =>
    !isVisible &&
    css`
      position: absolute;
      visibility: hidden;
      right: 9999999999px;
      z-index: ${({ theme }) => -theme.zIndex.tooltip};
    `}
`;

StyledButton.defaultProps = { theme: defaultTheme };
StyledFlexItem.defaultProps = { theme: defaultTheme };
