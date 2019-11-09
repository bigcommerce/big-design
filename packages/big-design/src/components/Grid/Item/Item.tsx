import React from 'react';

import { BoxProps } from '../../Box';
import { GridedItemProps } from '../types';

import { StyledGridItem } from './styled';

export type GridItemProps = BoxProps & GridedItemProps;

export const GridItem: React.FC<GridItemProps> = ({ as, ...rest }) => <StyledGridItem forwardedAs={as} {...rest} />;
