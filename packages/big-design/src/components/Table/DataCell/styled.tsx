import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { DataCellProps } from './DataCell';

export const StyledTableDataCell = styled.td<DataCellProps>`
  background-color: ${({ theme }) => theme.colors.white};
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.secondary70};
  font-size: ${({ theme }) => theme.typography.fontSize.medium};
  padding: ${({ theme, withPadding }) => (withPadding ? theme.spacing.small : 0)};

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

  ${({ width }) =>
    width !== undefined &&
    css`
      width: ${typeof width === 'string' ? width : width + 'px'};
    `};
`;

export const StyledTableDataCheckbox = styled(StyledTableDataCell)`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => `0 ${theme.spacing.small}`};

  ${props =>
    props.isCheckbox &&
    css`
      width: ${({ theme }) => theme.helpers.addValues(theme.spacing.xLarge, theme.spacing.small)};
      white-space: nowrap;
    `};
`;

StyledTableDataCell.defaultProps = { theme: defaultTheme };
StyledTableDataCheckbox.defaultProps = { theme: defaultTheme };
