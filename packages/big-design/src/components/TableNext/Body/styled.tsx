import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { css, styled } from 'styled-components';

import { WithTransients } from '../../../utils';

import { BodyProps } from './Body';

export const StyledTableBody = styled.tbody<WithTransients<BodyProps>>`
  ${({ theme, $withFirstRowBorder }) =>
    $withFirstRowBorder &&
    css`
      tr:first-of-type > td {
        border-top: ${theme.border.box};
      }
    `}
`;

StyledTableBody.defaultProps = { theme: defaultTheme };
