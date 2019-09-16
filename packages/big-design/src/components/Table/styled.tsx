import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

export const StyledTableFigure = styled.figure`
  margin: ${({ theme }) => `${theme.spacing.xLarge} ${theme.spacing.none}`};
  max-width: 100%;
  overflow-x: auto;
  white-space: nowrap;

  ${({ theme }) => theme.breakpoints.tablet} {
    white-space: normal;
  }
`;

export const StyledTable = styled.table`
  border-collapse: collapse;
  color: ${({ theme }) => theme.colors.secondary70};
  text-align: left;
  width: 100%;
`;

StyledTableFigure.defaultProps = { theme: defaultTheme };
StyledTable.defaultProps = { theme: defaultTheme };
