import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { FlexItem } from '../../Flex';

export const StyledPaginationContainer = styled(FlexItem)`
  margin-left: auto;
`;

StyledPaginationContainer.defaultProps = { theme: defaultTheme };
