import { withDefaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { Box } from '../../Box';
import { withGridedItems } from '../withGrid';

import { GridItemProps } from './Item';

export const StyledGridItem = styled(Box).attrs(withDefaultTheme)<GridItemProps>`
  ${withGridedItems()}
`;
