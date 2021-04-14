import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { Cell } from '../types';

interface StyledCellProps {
  isEdited?: boolean;
  isSelected?: boolean;
  isValid?: boolean;
  type: Cell<unknown>['type'];
}

export const StyledCell = styled.td<StyledCellProps>`
  background-color: ${({ theme }) => theme.colors.white};
  border: ${({ theme }) => `${theme.helpers.remCalc(0.5)} solid ${theme.colors.secondary30}`};
  box-sizing: border-box;
  padding: ${({ theme }) => `${theme.helpers.remCalc(6)} ${theme.helpers.remCalc(17)}`};
  text-align: ${({ type }) => (type === 'number' ? 'right' : 'left')};
  user-select: none;

  ${({ isSelected }) =>
    isSelected &&
    css`
      border: ${({ theme }) => `${theme.helpers.remCalc(0.5)} double ${theme.colors.primary}`};
    `}

  ${({ isValid }) =>
    !isValid &&
    css`
      border: ${({ theme }) => `${theme.helpers.remCalc(0.5)} double ${theme.colors.danger}`};
    `}

  ${({ isEdited }) =>
    isEdited &&
    css`
      background-color: ${({ theme }) => theme.colors.warning10};
    `}
`;

StyledCell.defaultProps = { theme: defaultTheme };
