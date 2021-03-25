import { theme as defaultTheme, remCalc } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

export const StyledCell = styled.td<{ isSelected?: boolean; isEdited?: boolean }>`
  background-color: ${({ theme }) => theme.colors.white};
  border: ${({ theme }) => `${remCalc(0.5)} solid ${theme.colors.secondary30}`};
  box-sizing: border-box;
  cursor: cell;
  padding: ${remCalc(6)} ${remCalc(17)};
  text-align: left;
  user-select: none;

  ${({ isSelected }) =>
    isSelected &&
    css`
      outline: ${({ theme }) => `${remCalc(0.5)} solid ${theme.colors.primary}`};
    `}

  ${({ isEdited }) =>
    isEdited &&
    css`
      background-color: ${({ theme }) => theme.colors.warning20};
    `}
`;

StyledCell.defaultProps = { theme: defaultTheme };
