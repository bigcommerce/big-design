import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { TableCellProps } from './Cell';

const SharedCellStyles = css<TableCellProps>`
  box-sizing: border-box;
  font-size: ${({ theme }) => theme.typography.fontSize.medium};
  line-height: ${({ theme }) => theme.lineHeight.small};
  min-height: ${({ theme }) => theme.spacing.xxxLarge};
  padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.medium}`};

  ${props =>
    props.isCheckbox &&
    css`
      width: 1px;
      white-space: nowrap;
    `}

  &:last-of-type {
    width: 50%;
  }
`;

export const StyledTableHeader = styled.th<TableCellProps>`
  ${SharedCellStyles}
`;

export const StyledTableCell = styled.td<TableCellProps>`
  ${SharedCellStyles}

  color: ${({ theme }) => theme.colors.secondary70};
`;

StyledTableHeader.defaultProps = { theme: defaultTheme };
StyledTableCell.defaultProps = { theme: defaultTheme };
