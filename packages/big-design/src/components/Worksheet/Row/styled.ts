import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

export const StyledTableRow = styled.tr<{ isChild: boolean; isExpanded: boolean }>`
  display: ${({ isExpanded }) => (isExpanded ? 'table-row' : 'none')};
  background-color: ${({ theme, isChild }) => (isChild ? theme.colors.secondary10 : theme.colors.white)};
`;

StyledTableRow.defaultProps = { theme: defaultTheme };
