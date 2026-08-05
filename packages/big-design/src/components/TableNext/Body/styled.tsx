import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

interface StyledTableBodyProps {
  $withFirstRowBorder?: boolean;
}

export const StyledTableBody = styled.tbody<StyledTableBodyProps>`
  ${({ theme, $withFirstRowBorder }) =>
    $withFirstRowBorder &&
    css`
      tr:first-of-type > td {
        border-top: ${theme.border.box};
      }
    `}
`;

StyledTableBody.defaultProps = { theme: defaultTheme };
