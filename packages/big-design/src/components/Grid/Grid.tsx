import React from 'react';

import { BoxProps } from '../Box';

import { StyledGrid } from './styled';
import { GridedProps } from './types';
import { GridItem } from './Item';

export type GridProps = BoxProps & GridedProps;

export class Grid extends React.PureComponent<GridProps> {
  static Item = GridItem;

  render() {
    const { as, ...rest } = this.props;

    return <StyledGrid forwardedAs={as} {...rest} />;
  }
}
