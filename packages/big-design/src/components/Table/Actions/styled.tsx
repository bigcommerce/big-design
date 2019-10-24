import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { Flex } from '../../Flex';

export const StyledActions = styled(Flex)``;
export const StyledPaginationContainer = styled(Flex.Item)`
  margin-left: auto;
`;

StyledActions.defaultProps = { theme: defaultTheme };
StyledPaginationContainer.defaultProps = { theme: defaultTheme };
