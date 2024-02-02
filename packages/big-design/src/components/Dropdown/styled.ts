import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { styled } from 'styled-components';

import { Box } from '../Box';

export const StyledBox = styled(Box)`
  position: relative;
`;

StyledBox.defaultProps = { theme: defaultTheme };
