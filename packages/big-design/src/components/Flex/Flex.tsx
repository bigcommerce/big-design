import React from 'react';

import { FlexMixin } from '../../mixins';
import { BoxProps } from '../Box';

import { StyledFlex } from './styled';
import { FlexItem } from './Item/Item';

export type FlexProps = BoxProps & FlexMixin;

export class Flex extends React.PureComponent<FlexProps> {
  static Item = FlexItem;

  render() {
    return <StyledFlex {...this.props} />;
  }
}
