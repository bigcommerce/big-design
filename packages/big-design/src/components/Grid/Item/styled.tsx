import styled from 'styled-components';

import { Box } from '../../Box';
import { withGridedItems } from '../withGrid';

import { GridItemProps } from './Item';

export const StyledGridItem = styled(Box)<GridItemProps>`
  ${withGridedItems()}
`;
