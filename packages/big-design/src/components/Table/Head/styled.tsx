import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { hideVisually } from 'polished';
import styled from 'styled-components';

import { HeadProps } from './Head';

// `hidden` intentionally stays un-prefixed: it's a real DOM attribute, and jest-dom's
// toBeVisible() relies on it leaking through (hideVisually() alone doesn't satisfy it).
// $-prefixing changes tested behavior.
export const StyledTableHead = styled.thead<HeadProps>`
  ${({ hidden }) => hidden && hideVisually()}
`;

StyledTableHead.defaultProps = { theme: defaultTheme };
