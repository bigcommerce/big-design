import React from 'react';

import { BoxProps } from '../Box';

import { StyledFlex } from './styled';
import { FlexItem } from './Item/Item';

export type FlexProps = BoxProps &
  Partial<{
    alignContent: 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around';
    alignItems: 'normal' | 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'baseline';
    direction: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    wrap: 'nowrap' | 'wrap' | 'wrap-reversed';
    justifyContent:
      | 'center'
      | 'flex-start'
      | 'flex-end'
      | 'left'
      | 'right'
      | 'normal'
      | 'space-between'
      | 'space-around'
      | 'space-evenly'
      | 'stretch';
  }>;

export class Flex extends React.PureComponent<FlexProps> {
  static Item = FlexItem;

  render() {
    return <StyledFlex {...this.props} />;
  }
}
