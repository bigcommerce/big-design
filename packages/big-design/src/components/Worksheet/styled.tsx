import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

export const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  table-layout: fixed;
  width: 100%;
`;

export const Header = styled.th`
  background-color: ${({ theme }) => theme.colors.secondary10};
  border: ${({ theme }) => `${theme.helpers.remCalc(0.5)} solid ${theme.colors.secondary30}`};
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.secondary60};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  height: ${({ theme }) => theme.helpers.remCalc(52)};
  padding: ${({ theme }) => `0 ${theme.helpers.remCalc(17)}`};
  text-align: left;
`;

Header.defaultProps = { theme: defaultTheme };
