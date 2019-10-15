import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { CellProps } from './Cell';

interface SharedCellProps extends CellProps {
  stickyHeader?: boolean;
}

const SharedCellStyles = css<SharedCellProps>`
  box-sizing: border-box;
  font-size: ${({ theme }) => theme.typography.fontSize.medium};
  padding: ${({ theme }) => theme.spacing.small};

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

  ${props =>
    props.isCheckbox &&
    css`
      width: ${({ theme }) => theme.helpers.addValues(theme.spacing.xLarge, theme.spacing.small)};
      white-space: nowrap;
    `};
`;

export const StyledTableHeader = styled.th<SharedCellProps>`
  ${SharedCellStyles}

  background-color: ${({ theme }) => theme.colors.secondary10};
  box-shadow: ${({ theme }) =>
    `inset 0px -1px 0px ${theme.colors.secondary30}, inset 0px 1px 0px ${theme.colors.secondary30}`};
  color: ${({ theme }) => theme.colors.secondary60};
  white-space: nowrap;

  ${({ stickyHeader }) =>
    stickyHeader &&
    css`
      position: sticky;
      top: 0;
    `}
`;

export const StyledTableData = styled.td<SharedCellProps>`
  ${SharedCellStyles}

  color: ${({ theme }) => theme.colors.secondary70};
  padding: ${({ theme, withPadding }) => (withPadding ? theme.spacing.small : 0)};
`;

StyledTableHeader.defaultProps = { theme: defaultTheme };
StyledTableData.defaultProps = { theme: defaultTheme };
