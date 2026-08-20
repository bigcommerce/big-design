import React from 'react';

import type { BoxProps } from '../../Box';
import type { GridedItemProps } from '../types';
import { toTransientGridedItemProps } from '../withGrid';

import { StyledGridItem } from './styled';

export type GridItemProps = BoxProps & GridedItemProps;

export const GridItem: React.FC<GridItemProps> = (props) => {
  const {
    as,
    gridArea,
    gridColumn,
    gridColumnEnd,
    gridColumnStart,
    gridRow,
    gridRowEnd,
    gridRowStart,
    ...domProps
  } = props;

  return <StyledGridItem forwardedAs={as} {...domProps} {...toTransientGridedItemProps(props)} />;
};
