import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

export const Status = styled.td<{ isInvalid?: boolean; isSelected?: boolean }>`
  background-color: ${({ theme }) => theme.colors.secondary30};
  border-top: ${({ theme }) => `${theme.helpers.remCalc(0.5)} solid ${theme.colors.secondary30}`};
  box-sizing: border-box;
  min-width: ${({ theme }) => theme.spacing.xxSmall};
  padding: 0;
  width: ${({ theme }) => theme.spacing.xxSmall};

  ${({ isInvalid }) =>
    isInvalid &&
    css`
      background-color: ${({ theme }) => `${theme.colors.danger}`};
      border: ${({ theme }) => `${theme.helpers.remCalc(0.5)} solid ${theme.colors.danger}`};
    `}
  ${({ isSelected }) =>
    isSelected &&
    css`
      background-color: ${({ theme }) => `${theme.colors.primary}`};
      border: ${({ theme }) => `${theme.helpers.remCalc(0.5)} solid ${theme.colors.primary}`};
    `};
`;

Status.defaultProps = { theme: defaultTheme };
