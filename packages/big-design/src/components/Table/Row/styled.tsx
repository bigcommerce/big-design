import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { withTransition } from '../../../helpers/transitions';

import { RowStatus } from './Row';

interface StyledTableRowProps {
  isDragging: boolean;
  isSelected: boolean;
  status?: RowStatus;
}

const statusStyles = {
  danger: css`
    background-color: ${({ theme }) => theme.colors.danger10};
    &:hover {
      background-color: ${({ theme }) => theme.colors.danger20};
    }
  `,
  success: css`
    background-color: ${({ theme }) => theme.colors.success10};
    &:hover {
      background-color: ${({ theme }) => theme.colors.success20};
    }
  `,
  warning: css`
    background-color: ${({ theme }) => theme.colors.warning10};
    &:hover {
      background-color: ${({ theme }) => theme.colors.warning20};
    }
  `,
  info: css`
    background-color: ${({ theme }) => theme.colors.primary10};
    &:hover {
      background-color: ${({ theme }) => theme.colors.primary20};
    }
  `,
};

export const StyledTableRow = styled.tr<StyledTableRowProps>`
  ${withTransition(['background-color'])}

  display: block;
  position: relative;
  max-width: 100%;
  border-block-start: ${({ theme }) => theme.border.box};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary10};
  }

  ${({ isSelected, status, theme }) => css`
    background-color: ${isSelected ? theme.colors.secondary10 : theme.colors.transparent};
    ${!isSelected && status && statusStyles[status]};
  `}

  @media (min-width: ${({ theme }) => theme.breakpointValues.tablet}) {
    display: ${({ isDragging }) => (isDragging ? 'table' : 'table-row')};
    position: relative;
    border-block-start: ${({ theme }) => theme.border.none};
  }
`;

StyledTableRow.defaultProps = { theme: defaultTheme };
