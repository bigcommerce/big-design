import React from 'react';

import { BoxProps } from '../../Box';

import { StyledGridItem } from './styled';

export type GridItemProps = BoxProps &
  Partial<{
    area: string;
    column: string;
    columnEnd: string;
    columnStart: string;
    row: string;
    rowEnd: string;
    rowStart: string;
  }>;

export const GridItem: React.FC<GridItemProps> = props => <StyledGridItem {...props} />;
