import { defaultTheme } from '@bigcommerce/big-design';
import styled, { css } from 'styled-components';

// TODO: Convert to BigDesign table when built
export const StyledTableFigure = styled.figure`
  margin: ${({ theme }) => theme.spacing.none};
  max-width: 100%;
  overflow-x: auto;
  white-space: nowrap;

  ${({ theme }) => theme.breakpoints.tablet} {
    white-space: normal;
  }
`;

export const StyledTable = styled.table`
  border-collapse: collapse;
  color: ${({ theme }) => theme.colors.secondary70}
  margin-bottom: ${({ theme }) => theme.spacing.xLarge}
  margin-top: ${({ theme }) => theme.spacing.xLarge}
  text-align: left;
  width: 100%;
`;

export const StyledTableHead = styled.thead`
  background-color: ${({ theme }) => theme.colors.secondary20};
`;

export const StyledTableBody = styled.tbody``;

export const StyledTableFooter = styled.tfoot``;

export const StyledTableRow = styled.tr`
  border-top: ${({ theme }) => theme.border.box};
`;

const SharedCellStyles = css`
  padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.small}`};
`;

export const StyledTableHeader = styled.th`
  ${SharedCellStyles}
`;

export const StyledTableData = styled.td`
  ${SharedCellStyles}
`;

StyledTableFigure.defaultProps = { theme: defaultTheme };
StyledTable.defaultProps = { theme: defaultTheme };
StyledTableHead.defaultProps = { theme: defaultTheme };
StyledTableBody.defaultProps = { theme: defaultTheme };
StyledTableFooter.defaultProps = { theme: defaultTheme };
StyledTableRow.defaultProps = { theme: defaultTheme };
StyledTableHeader.defaultProps = { theme: defaultTheme };
StyledTableData.defaultProps = { theme: defaultTheme };
