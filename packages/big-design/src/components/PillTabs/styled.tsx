import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { StyleableButton } from '../Button/private';
import { FlexItem } from '../Flex';

interface StyledPillTabProps {
  isActive: boolean;
}

interface StyledFlexItemProps {
  isVisible: boolean;
}

export const StyledPillTab = styled(StyleableButton)<StyledPillTabProps>`
  ${(props) =>
    props.isActive &&
    css`
      background-color: ${({ theme }) => theme.colors.primary20};
    `}
`;

export const StyledFlexItem = styled(FlexItem)<StyledFlexItemProps>`
  ${(props) =>
    !props.isVisible &&
    css`
      position: absolute;
      visibility: hidden;
      z-index: ${({ theme }) => -theme.zIndex.tooltip};
    `}
`;

StyledPillTab.defaultProps = { theme: defaultTheme };
StyledFlexItem.defaultProps = { theme: defaultTheme };
