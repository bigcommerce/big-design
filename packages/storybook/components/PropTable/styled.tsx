import { defaultTheme } from '@bigcommerce/big-design';
import styled from 'styled-components';

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

export const StyledTableRow = styled.tr`
  border-top: ${({ theme }) => theme.border.box};
`;

export const StyledTableHeader = styled.th`
  padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.small}`};
`;

export const StyledTableData = styled.td`
  padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.small}`};
`;

interface StyledCodeProps {
  alt?: boolean;
}

export const StyledCode = styled.code<StyledCodeProps>`
  color: ${({ alt, theme }) => `${alt ? theme.colors.primary50 : theme.colors.danger50}`};
`;

StyledTable.defaultProps = { theme: defaultTheme };
StyledTableHead.defaultProps = { theme: defaultTheme };
StyledTableBody.defaultProps = { theme: defaultTheme };
StyledTableRow.defaultProps = { theme: defaultTheme };
StyledTableHeader.defaultProps = { theme: defaultTheme };
StyledTableData.defaultProps = { theme: defaultTheme };
StyledCode.defaultProps = {
  alt: false,
  theme: defaultTheme,
};
