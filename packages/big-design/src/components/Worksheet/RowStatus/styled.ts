import { theme as defaultTheme, remCalc } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

export const Status = styled.td<{ isInvalid?: boolean; isSelected?: boolean }>`
  background-color: ${({ theme }) => theme.colors.secondary30};
  box-sizing: border-box;
  padding: 0;
  width: ${remCalc(4)};

  ${({ isInvalid }) =>
    isInvalid &&
    css`
      background-color: ${({ theme }) => `${theme.colors.danger}`};
      border: ${({ theme }) => `${remCalc(0.5)} solid ${theme.colors.danger}`};
    `}

  ${({ isSelected }) =>
    isSelected &&
    css`
      background-color: ${({ theme }) => `${theme.colors.primary}`};
      border: ${({ theme }) => `${remCalc(0.5)} solid ${theme.colors.primary}`};
    `}
`;

Status.defaultProps = { theme: defaultTheme };
