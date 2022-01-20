import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { withTransition } from '../../../mixins/transitions';
import { StyledTableDataCell } from '../DataCell/styled';

interface StyledTableRowProps {
  isDragging: boolean;
  isSelected: boolean;
}

export const StyledTableRow = styled.tr<StyledTableRowProps>`
  ${withTransition(['background-color'])}
  display: ${({ isDragging }) => (isDragging ? 'table' : 'table-row')};

  background-color: ${({ isSelected, theme }) => (isSelected ? theme.colors.primary10 : 'transparent')};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary10};
  }
`;

export const StyledDataCell = styled(StyledTableDataCell)`
  background-color: ${({ theme }) => theme.colors.secondary10};
  padding: ${({ theme }) => theme.spacing.small};
`;

StyledTableRow.defaultProps = { theme: defaultTheme };
