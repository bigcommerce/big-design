import styled, { css } from 'styled-components';

import { CodeProps } from './';

export const StyledCode = styled.code<CodeProps>`
  color: ${({ theme }) => theme.colors.secondary70};

  ${({ highlight, primary, theme }) =>
    highlight &&
    !primary &&
    css`
      background-color: ${theme.colors.warning10};
      padding: ${theme.spacing.xxSmall};
    `};

  ${({ primary, theme }) =>
    primary &&
    css`
      color: ${theme.colors.primary70};
    `};
`;
