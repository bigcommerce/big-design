import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

export const StyledTableBody = styled.tbody`
  & > tr {
    border-bottom: ${({ theme }) => theme.border.box};
  }
`;

StyledTableBody.defaultProps = { theme: defaultTheme };
