import React from 'react';

import { StyledGridItem } from './styled';

export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  area?: string | number;
  column?: string | number;
  columnEnd?: string | number;
  columnStart?: string | number;
  row?: string | number;
  rowEnd?: string | number;
  rowStart?: string | number;
}

export const GridItem: React.FC<GridItemProps> = props => <StyledGridItem {...props} />;
