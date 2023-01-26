import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { Cell, WorksheetItem } from '../types';

interface StyledCellProps<Item> {
  isLastChild: boolean;
  isChild: boolean;
  isEdited?: boolean;
  isSelected?: boolean;
  isValid?: boolean;
  type: Cell<Item>['type'];
}

export const StyledCell = styled.td<StyledCellProps<WorksheetItem>>`
  background-color: ${({ theme }) => theme.colors.inherit};
  border: ${({ theme }) => `${theme.helpers.remCalc(0.5)} solid ${theme.colors.secondary30}`};
  box-sizing: border-box;
  padding: ${({ theme, type }) =>
    type === 'select' || type === 'toggle'
      ? 0
      : `${theme.helpers.remCalc(6)} ${theme.helpers.remCalc(17)}`};
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

  ${({ type }) =>
    type === 'toggle' &&
    css`
      position: relative;
      border-color: ${({ theme }) =>
        `${theme.colors.white} ${theme.colors.white} ${theme.colors.white} ${theme.colors.secondary30}`};
    `}

  ${({ type, isChild }) =>
    type === 'toggle' &&
    !isChild &&
    css`
      border-color: ${({ theme }) =>
        `${theme.colors.secondary30} ${theme.colors.white} ${theme.colors.secondary30} ${theme.colors.secondary30}`};
    `}


    ${({ type, isLastChild }) =>
    type === 'toggle' &&
    isLastChild &&
    css`
      border-bottom-color: ${({ theme }) => `${theme.colors.secondary30}`};
    `}

  ${({ type, isSelected }) =>
    isSelected &&
    type !== 'toggle' &&
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

  & p {
    display: block;
    white-space: inherit;
    word-break: break-word;
  }

  ${({ type, isChild, isLastChild }) =>
    type === 'toggle' &&
    isChild &&
    css`
      &::before {
        content: '';
        display: block;
        top: 0;
        height: ${isLastChild ? '50%' : '100%'};
        left: 50%;
        width: ${({ theme }) => `${theme.helpers.remCalc(1)}`};
        position: absolute;
        background-color: ${({ theme }) => `${theme.colors.secondary30}`};
      }
      &::after {
        content: '';
        display: block;
        top: 50%;
        left: 50%;
        width: 50%;
        height: ${({ theme }) => `${theme.helpers.remCalc(1)}`};
        position: absolute;
        background-color: ${({ theme }) => `${theme.colors.secondary30}`};
      }
    `}
`;

StyledCell.defaultProps = { theme: defaultTheme };
