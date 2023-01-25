import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

export const StyledTableRow = styled.tr<{ isExpanded: boolean }>`
  display: ${({ isExpanded }) => (isExpanded ? 'table-row' : 'none')};
`;

StyledTableRow.defaultProps = { theme: defaultTheme };
