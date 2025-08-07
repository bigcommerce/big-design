import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { hideVisually } from 'polished';
import styled from 'styled-components';

import { HeadProps } from './Head';

export const StyledTableHead = styled.thead<HeadProps>`
  ${({ hidden }) => hidden && hideVisually()}

  position: absolute;
  opacity: 0;
  display: block;
  width: 0;
  height: 0;
  overflow: hidden;
  z-index: -1;
  top: 0;
  left: 0;

  @media (min-width: ${({ theme }) => theme.breakpointValues.tablet}) {
    position: static;
    opacity: 1;
    display: table-header-group;
    width: auto;
    height: auto;
    overflow: visible;
    z-index: 1;
  }
`;

StyledTableHead.defaultProps = { theme: defaultTheme };
