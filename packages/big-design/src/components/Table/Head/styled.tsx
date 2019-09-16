import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

export const StyledTableHead = styled.thead`
  background-color: ${({ theme }) => theme.colors.secondary10};
  color: ${({ theme }) => theme.colors.secondary60};
`;

StyledTableHead.defaultProps = { theme: defaultTheme };
