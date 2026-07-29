import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { withTransition } from '../../../helpers/transitions';

interface StyledTableRowProps {
  isDragging: boolean;
  isGrabbed: boolean;
  isHidden: boolean;
  isPhantom: boolean;
  isSelected: boolean;
}

export const StyledTableRow = styled.tr<StyledTableRowProps>`
  ${withTransition(['background-color'])}

  display: ${({ isHidden }) => (isHidden ? 'none' : 'table-row')};
  background-color: ${({ isPhantom, isSelected, theme }) =>
    isPhantom || isSelected ? theme.colors.primary10 : 'transparent'};
  opacity: ${({ isDragging, isPhantom }) => {
    if (isDragging) {
      return 0.4;
    }

    if (isPhantom) {
      return 0.6;
    }

    return 1;
  }};
  outline: ${({ isGrabbed, isPhantom, theme }) => {
    if (isPhantom) {
      return `2px dashed ${theme.colors.primary}`;
    }

    if (isGrabbed) {
      return `2px solid ${theme.colors.primary}`;
    }

    return 'none';
  }};
  outline-offset: -2px;
  pointer-events: ${({ isPhantom }) => (isPhantom ? 'none' : 'auto')};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary10};
  }
`;

export const StyledDragPreview = styled.table`
  ${({ theme }) => theme.shadow.floating}

  background-color: ${({ theme }) => theme.colors.white};
  border-collapse: collapse;
  border-radius: ${({ theme }) => theme.borderRadius.normal};
  overflow: hidden;
  table-layout: fixed;
`;

export const StyledDragHandle = styled.button`
  align-items: center;
  appearance: none;
  background: transparent;
  border: none;
  color: inherit;
  cursor: grab;
  display: inline-flex;
  justify-content: center;
  margin: 0;
  padding: 0;

  &:focus-visible {
    outline: ${({ theme }) => `2px solid ${theme.colors.primary}`};
    outline-offset: 2px;
  }
`;

StyledTableRow.defaultProps = { theme: defaultTheme };
StyledDragPreview.defaultProps = { theme: defaultTheme };
StyledDragHandle.defaultProps = { theme: defaultTheme };
