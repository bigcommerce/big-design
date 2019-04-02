import React from 'react';

import { BoxProps } from '../Box';

import { StyledGrid } from './styled';
import { GridItem } from './Item/Item';

export type GridProps = BoxProps &
  Partial<{
    areas: string;
    autoColumns: string;
    autoFlow: 'row' | 'column' | 'dense' | 'row dense' | 'column dense' | 'inherit' | 'initial' | 'unset';
    autoRows: string;
    columns: string;
    gap: string;
    rows: string;
    template: string;
  }>;

export class Grid extends React.PureComponent<GridProps> {
  static Item = GridItem;

  render() {
    return <StyledGrid {...this.props} />;
  }
}
