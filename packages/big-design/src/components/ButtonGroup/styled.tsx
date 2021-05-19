import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { ButtonProps } from '../Button';
import { StyleableButton } from '../Button/private';
import { FlexItem } from '../Flex';

interface StyledFlexItemProps {
  isVisible: boolean;
}

interface StyledButtonProps extends ButtonProps {
  isFirst?: boolean;
  isLast?: boolean;
}

export const StyledFlexItem = styled(FlexItem)<StyledFlexItemProps>`
  ${(props) =>
    !props.isVisible &&
    css`
      position: absolute;
      visibility: hidden;
      z-index: ${({ theme }) => -theme.zIndex.tooltip};
    `}
`;

export const StyledButton = styled(StyleableButton)<StyledButtonProps>`
  border-radius: ${({ theme }) => theme.borderRadius.none};
  margin-right: -1px;

  ${({ isFirst, theme }) =>
    isFirst &&
    css`
      border-bottom-left-radius: ${theme.borderRadius.normal};
      border-top-left-radius: ${theme.borderRadius.normal};
    `}

  ${({ isLast, theme }) =>
    isLast &&
    css`
      border-bottom-right-radius: ${theme.borderRadius.normal};
      border-top-right-radius: ${theme.borderRadius.normal};
      margin-right: 0;
    `}
    
  &:focus {
    z-index: 1;
  }
`;

StyledFlexItem.defaultProps = { theme: defaultTheme };
StyledButton.defaultProps = { theme: defaultTheme };
