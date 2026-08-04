import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { Box } from '../../Box';
import { TransientGridedItemProps } from '../types';
import { withGridedItems } from '../withGrid';

export const StyledGridItem = styled(Box)<TransientGridedItemProps>`
  ${withGridedItems()}
`;

StyledGridItem.defaultProps = { theme: defaultTheme };
