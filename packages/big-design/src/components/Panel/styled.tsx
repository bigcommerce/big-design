import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { StyleableH2 } from '../Typography/private';

export const StyledH2 = styled(StyleableH2)`
  flex-grow: 1;

  & ~ .bd-button {
    width: auto;
    margin-top: 0;
  }
`;

StyledH2.defaultProps = { theme: defaultTheme };
