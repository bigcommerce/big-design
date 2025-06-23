import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { hideVisually } from 'polished';
import styled from 'styled-components';

import { HeadProps } from './Head';

export const StyledTableHead = styled.thead<HeadProps>`
  ${({ hidden }) => hidden && hideVisually()}

  display: none;

  @media (min-width: ${({ theme }) => theme.breakpointValues.tablet}) {
    display: table-header-group;
  }
`;

StyledTableHead.defaultProps = { theme: defaultTheme };
