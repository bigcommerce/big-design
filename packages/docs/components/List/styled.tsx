import styled, { css } from 'styled-components';

import { ListProps } from './List';

// eslint-disable-next-line @typescript-eslint/naming-convention
const SharedListStyles = css<ListProps>`
  color: ${({ theme }) => theme.colors.secondary70};
  font-size: ${({ theme }) => theme.typography.fontSize.medium};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.lineHeight.medium};
  padding-left: ${({ theme }) => theme.spacing.xLarge};

  ${({ theme }) => theme.breakpoints.tablet} {
    column-count: ${({ columnCount }) => columnCount};
    column-gap: ${({ columnGap }) => columnGap};
  }

  ${({ reset, theme }) =>
    reset &&
    css`
      ${theme.helpers.listReset};
    `}
`;

export const StyledOrderedList = styled.ol<ListProps>`
  ${SharedListStyles};
`;

export const StyledUnorderedList = styled.ul<ListProps>`
  ${SharedListStyles}
`;
