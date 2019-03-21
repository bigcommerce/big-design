import React from 'react';

import { BoxProps } from '../Box';

import { StyledGrid } from './styled';
import { GridItem } from './Item/Item';

export interface GridProps extends BoxProps {
  areas?: string;
  autoColumns?: string | number;
  autoFlow?: 'row' | 'column' | 'dense' | 'row dense' | 'column dense' | 'inherit' | 'initial' | 'unset';
  autoRows?: string | number;
  columns?: string | number;
  gap?: string | number;
  rows?: string | number;
  template?: string;
}

export class Grid extends React.PureComponent<GridProps> {
  static Item = GridItem;

  render() {
    return <StyledGrid {...this.props} />;
  }
}
