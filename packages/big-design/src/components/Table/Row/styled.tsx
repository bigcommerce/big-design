import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { withTransition } from '../../../helpers/transitions';

interface StyledTableRowProps {
  isDragging: boolean;
  isSelected: boolean;
}

export const StyledTableRow = styled.tr<StyledTableRowProps>`
  ${withTransition(['background-color'])}

  display: block;
  position: relative;
  max-width: 100%;
  border-block-start: ${({ theme }) => theme.border.box};

  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.primary10 : 'transparent'};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary10};
  }

  @media (min-width: ${({ theme }) => theme.breakpointValues.tablet}) {
    display: ${({ isDragging }) => (isDragging ? 'table' : 'table-row')};
    position: relative;
    border-block-start: ${({ theme }) => theme.border.none};
  }
`;

StyledTableRow.defaultProps = { theme: defaultTheme };
