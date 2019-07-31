import React from 'react';

import { BoxProps } from '../Box';

import { StyledFlex } from './styled';
import { FlexMixin } from './types';
import { FlexItem } from './Item/Item';

export type FlexProps = BoxProps & FlexMixin;

export class Flex extends React.PureComponent<FlexProps> {
  static Item = FlexItem;

  render() {
    return <StyledFlex {...this.props} />;
  }
}
