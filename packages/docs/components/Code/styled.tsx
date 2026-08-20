import styled, { css } from 'styled-components';

import type { CodeProps } from './';

interface StyledCodeProps {
  $highlight?: CodeProps['highlight'];
  $primary?: CodeProps['primary'];
}

export const StyledCode = styled.code<StyledCodeProps>`
  color: ${({ theme }) => theme.colors.secondary70};
  white-space: nowrap;

  ${({ $highlight, $primary, theme }) =>
    $highlight &&
    !$primary &&
    css`
      background-color: ${theme.colors.warning20};
      padding: ${theme.spacing.xxSmall};
    `};

  ${({ $primary, theme }) =>
    $primary &&
    css`
      color: ${theme.colors.primary70};
    `};
`;
