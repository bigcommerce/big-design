import React, { CSSProperties } from 'react';

import { StyledGridItem } from './styled';

export interface GridItemProps {
  area?: string | number;
  column?: string | number;
  columnEnd?: string | number;
  columnStart?: string | number;
  row?: string | number;
  rowEnd?: string | number;
  rowStart?: string | number;
  style?: CSSProperties;
}

export const GridItem: React.SFC<GridItemProps> = props => <StyledGridItem {...props} />;
