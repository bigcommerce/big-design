import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { TableRowProps } from './Row';

export const StyledTableRow = styled.tr<TableRowProps>`
  background-color: ${({ selected, theme }) => (selected ? theme.colors.primary10 : 'transparent')};
  border-top: ${({ theme }) => theme.border.box};
`;

StyledTableRow.defaultProps = { theme: defaultTheme };
