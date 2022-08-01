import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { withPaddings } from '../../../mixins';
import { withTableColumnDisplay } from '../mixins';

import { DataCellProps } from './DataCell';

export const StyledTableDataCell = styled.td<DataCellProps>`
  ${withTableColumnDisplay()}
  ${withPaddings()}
  
  background-color: ${({ theme }) => theme.colors.white};
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.secondary70};
  font-size: ${({ theme }) => theme.typography.fontSize.medium};

  &:first-of-type {
    padding-left: ${({ theme, paddingHorizontal, padding }) =>
      padding || paddingHorizontal ? theme.spacing.xLarge : 0};
  }

  &:last-of-type {
    padding-right: ${({ theme, paddingHorizontal, padding }) =>
      padding || paddingHorizontal ? theme.spacing.xLarge : 0};
  }

  ${({ theme, withBorder }) =>
    withBorder &&
    css`
      border-bottom: ${theme.border.box};
    `}

  ${({ align }) =>
    align &&
    css`
      text-align: ${align};
    `};

  ${({ verticalAlign }) =>
    verticalAlign &&
    css`
      vertical-align: ${verticalAlign};
    `};

  ${({ checkEmptyCell }) => {
    return (
      checkEmptyCell &&
      css`
        &:empty {
          display: none;
        }
      `
    );
  }};

  ${({ width }) =>
    width !== undefined &&
    css`
      width: ${typeof width === 'string' ? width : `${width}px`};
    `};
`;

export const StyledTableDataCheckbox = styled(StyledTableDataCell)`
  ${withTableColumnDisplay()}

  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => `0 ${theme.spacing.small}`};

  &:first-of-type {
    padding-left: ${({ theme }) => theme.spacing.xLarge};
  }

  ${({ isExpandable }) =>
    isExpandable &&
    css`
      padding-right: 0;
    `}

  ${(props) =>
    props.isCheckbox &&
    css`
      width: ${({ theme }) => theme.helpers.addValues(theme.spacing.xLarge, theme.spacing.small)};
      white-space: nowrap;
    `};
`;

StyledTableDataCell.defaultProps = { theme: defaultTheme };
StyledTableDataCheckbox.defaultProps = { theme: defaultTheme };
