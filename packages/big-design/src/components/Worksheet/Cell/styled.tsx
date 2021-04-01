import { theme as defaultTheme, remCalc } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

export const StyledCell = styled.td<{ isSelected?: boolean; isEdited?: boolean; isValid?: boolean }>`
  background-color: ${({ theme }) => theme.colors.white};
  border: ${({ theme }) => `${remCalc(0.5)} solid ${theme.colors.secondary30}`};
  box-sizing: border-box;
  padding: ${remCalc(6)} ${remCalc(17)};
  text-align: left;
  user-select: none;

  ${({ isSelected }) =>
    isSelected &&
    css`
      border: ${({ theme }) => `${remCalc(0.5)} double ${theme.colors.primary}`};
    `}

  ${({ isValid }) =>
    !isValid &&
    css`
      border: ${({ theme }) => `${remCalc(0.5)} double ${theme.colors.danger}`};
    `}

  ${({ isEdited }) =>
    isEdited &&
    css`
      background-color: ${({ theme }) => theme.colors.warning20};
    `}
`;

StyledCell.defaultProps = { theme: defaultTheme };
