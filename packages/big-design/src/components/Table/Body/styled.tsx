import { withDefaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { BodyProps } from './Body';

export const StyledTableBody = styled.tbody.attrs(withDefaultTheme)<BodyProps>`
  ${({ theme, withFirstRowBorder }) =>
    withFirstRowBorder &&
    css`
      tr:first-of-type > td {
        border-top: ${theme.border.box};
      }
    `}
`;
