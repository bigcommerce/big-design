import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { Cell, WorksheetItem } from '../types';

interface StyledCellProps<Item> {
  isEdited?: boolean;
  isSelected?: boolean;
  isValid?: boolean;
  type: Cell<Item>['type'];
}

export const StyledCell = styled.td<StyledCellProps<WorksheetItem>>`
  background-color: ${({ theme }) => theme.colors.white};
  border: ${({ theme }) => `${theme.helpers.remCalc(0.5)} solid ${theme.colors.secondary30}`};
  box-sizing: border-box;
  padding: ${({ theme, type }) => (type === 'select' ? 0 : `${theme.helpers.remCalc(6)} ${theme.helpers.remCalc(17)}`)};
  text-align: ${({ type }) => {
    switch (type) {
      case 'number':
        return 'right';
      case 'checkbox':
        return 'center';
      default:
        return 'left';
    }
  }};
  user-select: none;
  word-break: break-all;

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
