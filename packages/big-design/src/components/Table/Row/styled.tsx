import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { withTransition } from '../../../mixins/transitions';

interface StyledTableRowProps {
  isSelected: boolean;
}

export const StyledTableRow = styled.tr<StyledTableRowProps>`
  ${withTransition(['background-color'])}

  background-color: ${({ isSelected, theme }) => (isSelected ? theme.colors.primary10 : 'transparent')};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary10};
  }
`;

StyledTableRow.defaultProps = { theme: defaultTheme };
