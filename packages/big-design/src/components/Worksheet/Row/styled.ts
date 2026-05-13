import { withDefaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

export const StyledTableRow = styled.tr.attrs(withDefaultTheme)<{ isExpanded: boolean }>`
  display: ${({ isExpanded }) => (isExpanded ? 'table-row' : 'none')};
`;
