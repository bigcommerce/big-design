import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { Flex, FlexItem } from '../../Flex';
import { StyleableText } from '../../Typography/private';

export const StyledLi = styled.li`
  outline: 0;
`;

export const StyledArrowWrapper = styled(FlexItem)<{ expanded: boolean }>`
  z-index: 1;

  ${({ expanded }) =>
    expanded &&
    css`
      transform: rotate(90deg);
    `};
`;

export const StyledSelectableWrapper = styled(FlexItem)`
  padding: 1px;
  z-index: 1;
`;

const sharedAfterStyles = css`
  bottom: 0;
  content: '';
  /* Arbitrary number */
  left: -1000px;
  right: 0;
  position: absolute;
  top: 0;
  z-index: 0;
`;

export const StyledFlex = styled(Flex)<{ selected?: boolean }>`
  cursor: pointer;
  min-height: ${({ theme }) =>
    theme.helpers.addValues(theme.spacing.xxLarge, theme.spacing.xSmall)};
  position: relative;

  li:focus > &,
  &:hover {
    &::after {
      ${sharedAfterStyles}

      background-color: ${({ theme }) => theme.colors.secondary10};
    }
  }

  label,
  svg {
    vertical-align: middle;
  }

  ${({ theme, selected }) =>
    selected &&
    css`
      &::after {
        ${sharedAfterStyles}

        background-color: ${theme.colors.primary10};
      }
    `}
`;

export const StyledFlexItem = styled(FlexItem)`
  z-index: 1;
`;

export const StyledGap = styled.div`
  flex-shrink: 0;
  height: ${({ theme }) => theme.spacing.xLarge};
  width: ${({ theme }) => theme.spacing.xLarge};
`;

export const StyledText = styled(StyleableText)`
  z-index: 1;
`;

StyledArrowWrapper.defaultProps = { theme: defaultTheme };
StyledFlex.defaultProps = { theme: defaultTheme };
StyledGap.defaultProps = { theme: defaultTheme };
