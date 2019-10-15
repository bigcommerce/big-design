import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { withMargins, MarginProps } from '../../mixins';

export const StyledTableFigure = styled.figure`
  margin: 0;
  margin-bottom: ${({ theme }) => `${theme.spacing.xLarge}`};
  max-width: 100%;
  overflow-x: auto;
  position: relative;
  white-space: nowrap;

  ${({ theme }) => theme.breakpoints.tablet} {
    white-space: normal;
  }
`;

export const StyledTable = styled.table<MarginProps>`
  ${withMargins()};

  border-collapse: collapse;
  border-color: transparent;
  color: ${({ theme }) => theme.colors.secondary70};
  text-align: left;
  width: 100%;
`;

StyledTableFigure.defaultProps = { theme: defaultTheme };
StyledTable.defaultProps = { theme: defaultTheme };
