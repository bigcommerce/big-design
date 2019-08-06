import React from 'react';

import { BoxProps } from '../Box';

import { StyledGrid } from './styled';
import { GridItem } from './Item/Item';

export type GridProps = BoxProps &
  Partial<{
    gridAreas: string;
    gridAutoColumns: string;
    gridAutoFlow: 'row' | 'column' | 'dense' | 'row dense' | 'column dense' | 'inherit' | 'initial' | 'unset';
    gridAutoRows: string;
    gridColumns: string;
    gridGap: string;
    gridRows: string;
    gridTemplate: string;
  }>;

export class Grid extends React.PureComponent<GridProps> {
  static Item = GridItem;

  render() {
    return <StyledGrid {...this.props} />;
  }
}
