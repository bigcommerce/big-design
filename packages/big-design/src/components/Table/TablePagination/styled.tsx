import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { Flex } from '../../Flex';

export const StyledPaginationContainer = styled(Flex.Item)`
  margin-left: auto;
`;

StyledPaginationContainer.defaultProps = { theme: defaultTheme };
