import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { Flex, FlexItem } from '../../Flex';

export const StyledLi = styled.li`
  outline: 0;
`;

export const StyledArrowWrapper = styled(FlexItem)<{ expanded: boolean }>`
  ${({ expanded }) =>
    expanded &&
    css`
      transform: rotate(90deg);
    `};
`;

export const StyledSelectableWrapper = styled(FlexItem)`
  padding: 1px;
`;

export const StyledFlex = styled(Flex)`
  cursor: pointer;
  min-height: ${({ theme }) => theme.helpers.addValues(theme.spacing.xxLarge, theme.spacing.xSmall)};

  li:focus > &,
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary10};
  }

  label,
  svg {
    vertical-align: middle;
  }
`;

export const StyledGap = styled.div`
  flex-shrink: 0;
  height: ${({ theme }) => theme.spacing.xLarge};
  width: ${({ theme }) => theme.spacing.xLarge};
`;

StyledArrowWrapper.defaultProps = { theme: defaultTheme };
StyledFlex.defaultProps = { theme: defaultTheme };
StyledGap.defaultProps = { theme: defaultTheme };
