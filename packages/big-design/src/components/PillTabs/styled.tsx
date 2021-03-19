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
  margin-right: ${({ theme }) => theme.spacing.xLarge};

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
      /* TODO: Best way to hide? */
      visibility: hidden;
      position: absolute;
      z-index: -1000;
    `}
`;
