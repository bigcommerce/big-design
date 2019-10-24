import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

export const StyledTableRow = styled.tr<{ isSelected: boolean }>`
  background-color: ${({ isSelected, theme }) => (isSelected ? theme.colors.primary10 : 'transparent')};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary10};
  }
`;

StyledTableRow.defaultProps = { theme: defaultTheme };
