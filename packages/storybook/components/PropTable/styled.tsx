import { defaultTheme } from '@bigcommerce/big-design';
import styled, { css } from 'styled-components';

// TODO: Convert to BigDesign table when built
export const StyledTable = styled.table`
  text-align: left;
  border-collapse: collapse;
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

interface StyledCodeProps {
  altColor?: boolean;
}

export const StyledCode = styled.code<StyledCodeProps>`
  color: ${({ altColor, theme }) => (altColor ? theme.colors.primary50 : theme.colors.danger50)}};
`;

StyledTable.defaultProps = { theme: defaultTheme };
StyledTableHead.defaultProps = { theme: defaultTheme };
StyledTableBody.defaultProps = { theme: defaultTheme };
StyledTableFooter.defaultProps = { theme: defaultTheme };
StyledTableRow.defaultProps = { theme: defaultTheme };
StyledTableHeader.defaultProps = { theme: defaultTheme };
StyledTableData.defaultProps = { theme: defaultTheme };
StyledCode.defaultProps = { theme: defaultTheme };
