import styled, { css } from 'styled-components';

import { ListProps } from './List';

interface StyledListProps {
  $columnCount?: ListProps['columnCount'];
  $columnGap?: ListProps['columnGap'];
  $reset?: ListProps['reset'];
}

const SharedListStyles = css<StyledListProps>`
  color: ${({ theme }) => theme.colors.secondary70};
  font-size: ${({ theme }) => theme.typography.fontSize.medium};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.lineHeight.medium};
  padding-left: ${({ theme }) => theme.spacing.xLarge};

  ${({ theme }) => theme.breakpoints.tablet} {
    column-count: ${({ $columnCount }) => $columnCount};
    column-gap: ${({ $columnGap }) => $columnGap};
  }

  ${({ $reset, theme }) =>
    $reset &&
    css`
      ${theme.helpers.listReset};
    `}
`;

export const StyledOrderedList = styled.ol<StyledListProps>`
  ${SharedListStyles};
`;

export const StyledUnorderedList = styled.ul<StyledListProps>`
  ${SharedListStyles}
`;
