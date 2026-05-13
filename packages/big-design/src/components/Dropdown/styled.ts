import { withDefaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { Box } from '../Box';

export const StyledBox = styled(Box).attrs(withDefaultTheme)`
  position: relative;
`;
