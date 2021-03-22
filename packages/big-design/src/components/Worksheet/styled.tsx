import { theme as defaultTheme, remCalc } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

export const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  table-layout: fixed;
  width: 100%;
`;

export const Header = styled.th`
  background-color: ${({ theme }) => theme.colors.secondary10};
  border: ${({ theme }) => `${remCalc(0.5)} solid ${theme.colors.secondary30}`};
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.secondary60};
  font-weight: 600; //fix?
  height: ${remCalc(52)};
  padding: 0 ${remCalc(17)};
  text-align: left;
`;

Header.defaultProps = { theme: defaultTheme };
