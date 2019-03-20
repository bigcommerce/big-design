import React from 'react';

import { StyledGrid } from './styled';
import { GridItem } from './Item/Item';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
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
    const { className, ...props } = this.props;

    return <StyledGrid {...props} />;
  }
}
