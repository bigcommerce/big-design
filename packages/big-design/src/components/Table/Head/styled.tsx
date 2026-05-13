import { withDefaultTheme } from '@bigcommerce/big-design-theme';
import { hideVisually } from 'polished';
import styled from 'styled-components';

import { HeadProps } from './Head';

export const StyledTableHead = styled.thead.attrs(withDefaultTheme)<HeadProps>`
  ${({ hidden }) => hidden && hideVisually()}
`;
