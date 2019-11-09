import styled from 'styled-components';

import { Box } from '../../Box';
import { withGridedItems } from '../withGrid';

import { GridItemProps } from './Item';

// TODO: Remove the `forwardedAs` manual prop definition when @types get updated
export const StyledGridItem = styled(Box)<GridItemProps & { forwardedAs?: GridItemProps['as'] }>`
  ${withGridedItems()}
`;
