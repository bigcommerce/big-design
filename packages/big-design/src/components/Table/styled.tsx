import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { withMargins } from '../../helpers';
import { type TransientMarginProps } from '../../helpers/margins/margins';

export const StyledTableFigure = styled.figure<TransientMarginProps>`
  margin: 0;
  max-width: 100%;
  overflow-x: auto;
  white-space: nowrap;

  ${({ theme }) => theme.breakpoints.tablet} {
    white-space: normal;
  }

  ${withMargins()};
`;

export const StyledTable = styled.table`
  border-color: transparent;
  border-spacing: 0;
  color: ${({ theme }) => theme.colors.secondary70};
  text-align: left;
  width: 100%;
`;

StyledTableFigure.defaultProps = { theme: defaultTheme };
StyledTable.defaultProps = { theme: defaultTheme };
