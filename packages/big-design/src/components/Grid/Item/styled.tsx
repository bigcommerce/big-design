import { styled } from 'styled-components';

import { WithTransients } from '../../../utils';
import { StyledBox } from '../../Box/styled';
import { withGridedItems } from '../withGrid';

import { GridItemProps } from './Item';

// TODO: Remove the `forwardedAs` manual prop definition when @types get updated
export const StyledGridItem = styled(StyledBox)<WithTransients<GridItemProps>>`
  ${withGridedItems()}
`;
