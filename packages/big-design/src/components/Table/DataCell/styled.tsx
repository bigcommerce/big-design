import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { withDisplay } from '../../../mixins';

import { DataCellProps } from './DataCell';

export const StyledTableDataCell = styled.td<DataCellProps>`
  ${withDisplay()}

  background-color: ${({ theme }) => theme.colors.white};
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.secondary70};
  font-size: ${({ theme }) => theme.typography.fontSize.medium};
  padding: ${({ theme, withPadding }) => (withPadding ? theme.spacing.small : 0)};

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

  ${({ width }) =>
    width !== undefined &&
    css`
      width: ${typeof width === 'string' ? width : width + 'px'};
    `};
`;

export const StyledTableDataCheckbox = styled(StyledTableDataCell)`
  ${withDisplay()}

  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => `0 ${theme.spacing.small}`};

  ${(props) =>
    props.isCheckbox &&
    css`
      width: ${({ theme }) => theme.helpers.addValues(theme.spacing.xLarge, theme.spacing.small)};
      white-space: nowrap;
    `};
`;

StyledTableDataCell.defaultProps = { theme: defaultTheme };
StyledTableDataCheckbox.defaultProps = { theme: defaultTheme };
