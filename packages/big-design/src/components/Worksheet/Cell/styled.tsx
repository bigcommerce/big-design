import { Colors, theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { Cell, WorksheetItem } from '../types';

interface StyledCellProps<Item> {
  isFirstSelected: boolean;
  isLastSelected: boolean;
  isLastChild: boolean;
  isChild: boolean;
  isEdited?: boolean;
  isSelected?: boolean;
  isValid?: boolean;
  isNextCellValid: boolean;
  type: Cell<Item>['type'];
}

export const StyledCell = styled.td<StyledCellProps<WorksheetItem>>`
  position: relative;
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
      border-bottom-color: ${({ theme }) => theme.colors.secondary30};
    `}

  ${({ type, isSelected, isFirstSelected, isLastSelected, isNextCellValid }) =>
    isSelected &&
    type !== 'toggle' &&
    css`
      border: ${({ theme }) => `${theme.helpers.remCalc(0.5)} double ${theme.colors.primary}`};

      border-top-color: ${({ theme }) =>
        isFirstSelected ? theme.colors.primary : theme.colors.secondary30};
      border-bottom-color: ${({ theme }) => {
        if (!isNextCellValid && !isLastSelected) {
          return theme.colors.danger;
        }

        return isFirstSelected || isLastSelected ? theme.colors.primary : theme.colors.secondary30;
      }};
      ${AutoFillHandler} {
        display: block;
      }
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
    margin: 0;
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
        width: ${({ theme }) => theme.helpers.remCalc(1)};
        position: absolute;
        background-color: ${({ theme }) => theme.colors.secondary30};
      }
      &::after {
        content: '';
        display: block;
        top: 50%;
        left: 50%;
        width: 50%;
        height: ${({ theme }) => theme.helpers.remCalc(1)};
        position: absolute;
        background-color: ${({ theme }) => theme.colors.secondary30};
      }
    `}
`;

export const AutoFillHandler = styled.div<{ isVisible: boolean }>`
  position: absolute;
  border: ${({ theme, isVisible }) =>
    `${theme.helpers.remCalc(1)} solid ${
      isVisible ? theme.colors.white : theme.colors.transparent
    }`};
  height: ${({ theme }) => theme.helpers.remCalc(6)};
  width: ${({ theme }) => theme.helpers.remCalc(6)};
  background-color: ${({ theme, isVisible }) =>
    isVisible ? theme.colors.primary : theme.colors.transparent};
  right: -${({ theme }) => theme.helpers.remCalc(4)};
  bottom: -${({ theme }) => theme.helpers.remCalc(4)};
  z-index: 100;
  cursor: crosshair;
  display: none;
`;

export const CellNote = styled.div<{ color: keyof Colors }>`
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;

  border-bottom: 8px solid ${({ theme, color }) => theme.colors[color]};
  position: absolute;
  top -1px;
  right: -5px;
  transform: rotate(45deg)
`;

StyledCell.defaultProps = { theme: defaultTheme };
AutoFillHandler.defaultProps = { theme: defaultTheme };
CellNote.defaultProps = { theme: defaultTheme };
