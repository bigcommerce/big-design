import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { Box } from '../Box';

import { InternalWorksheetColumn } from './types';

export const Table = styled.table<{
  minWidth?: number;
  hasStaticWidth: boolean;
  hasExpandableRows: boolean;
}>`
  border-collapse: collapse;
  border-spacing: 0;
  min-width: ${({ minWidth, hasStaticWidth }) =>
    minWidth && !hasStaticWidth ? `${minWidth}px` : 'auto'};
  table-layout: fixed;
  width: ${({ hasStaticWidth }) => (hasStaticWidth ? 'auto' : '100%')};

  &:focus {
    outline: none;
  }

  ${({ hasExpandableRows }) =>
    hasExpandableRows &&
    css`
      & > thead > tr {
        & > th:nth-of-type(2) {
          padding-left: ${({ theme }) => theme.spacing.xSmall};
        }
      }

      & > tbody > tr {
        & > td:nth-of-type(3) {
          padding-left: ${({ theme }) => theme.spacing.xSmall};
        }
      }
    `}
`;

Table.defaultProps = { theme: defaultTheme };

export const Header = styled.th<{
  columnType: InternalWorksheetColumn<unknown>['type'];
  columnWidth: InternalWorksheetColumn<unknown>['width'];
}>`
  border: ${({ theme }) => `${theme.helpers.remCalc(0.5)} solid ${theme.colors.secondary30}`};
  border-right-color: ${({ theme, columnType }) =>
    columnType === 'toggle' ? theme.colors.white : theme.colors.secondary30};
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.secondary60};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  height: ${({ theme }) => theme.helpers.remCalc(52)};
  overflow: hidden;
  padding: ${({ theme }) => `0 ${theme.helpers.remCalc(17)}`};
  text-align: ${({ columnType }) => {
    if (columnType === 'number') {
      return 'right';
    }

    if (columnType === 'checkbox') {
      return 'center';
    }

    return 'left';
  }};
  width: ${({ columnWidth }) =>
    typeof columnWidth === 'string' ? columnWidth : `${columnWidth}px`};
`;

export const StyledBox = styled(Box)`
  overflow-x: scroll;
`;

Header.defaultProps = { theme: defaultTheme };
StyledBox.defaultProps = { theme: defaultTheme };
