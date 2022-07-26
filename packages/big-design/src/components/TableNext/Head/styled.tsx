import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { hideVisually } from 'polished';
import styled from 'styled-components';

import { HeadProps } from './Head';

export const StyledTableHead = styled.thead<HeadProps>`
  ${({ hidden }) => hidden && hideVisually()}
`;

StyledTableHead.defaultProps = { theme: defaultTheme };
