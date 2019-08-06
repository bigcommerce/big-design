import React from 'react';

import { BoxProps } from '../../Box';

import { StyledGridItem } from './styled';

export type GridItemProps = BoxProps &
  Partial<{
    gridArea: string;
    gridColumn: string;
    gridColumnEnd: string;
    gridColumnStart: string;
    gridRow: string;
    gridRowEnd: string;
    gridRowStart: string;
  }>;

export const GridItem: React.FC<GridItemProps> = props => <StyledGridItem {...props} />;
