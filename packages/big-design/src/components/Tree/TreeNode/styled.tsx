import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { Flex } from '../../Flex';

export const StyledLi = styled.li`
  outline: 0;
`;

export const StyledArrowWrapper = styled.span<{ expanded: boolean }>`
  flex-shrink: 0;

  ${({ expanded }) =>
    expanded &&
    css`
      transform: rotate(90deg);
    `};
`;

export const StyledFlex = styled(Flex)`
  cursor: pointer;
  min-height: ${({ theme }) => theme.helpers.addValues(theme.spacing.xxLarge, theme.spacing.xSmall)};

  li:focus > &,
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary10};
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
