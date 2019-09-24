import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { TableRowProps } from './Row';

export const StyledTableRow = styled.tr<TableRowProps>`
  background-color: ${({ selected, theme }) => (selected ? theme.colors.primary10 : 'transparent')};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary10};
  }

  ${props =>
    props.verticalAlign &&
    css`
      vertical-align: ${props.verticalAlign};
    `}
`;

StyledTableRow.defaultProps = { theme: defaultTheme };
