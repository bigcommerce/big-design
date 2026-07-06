import { withDefaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { FlexItem } from '../../Flex';

export const StyledPaginationContainer = styled(FlexItem).attrs(withDefaultTheme)`
  margin-left: auto;
`;
