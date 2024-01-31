import React from 'react';

import { withTransients } from '../../../utils';
import { BoxProps } from '../../Box';
import { GridedItemProps } from '../types';

import { StyledGridItem } from './styled';

export type GridItemProps = BoxProps & GridedItemProps;

export const GridItem: React.FC<GridItemProps> = (props) => (
  <StyledGridItem {...withTransients(props)} />
);
