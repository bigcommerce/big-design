import React from 'react';

import { BoxProps } from '../Box';

import { StyledFlex } from './styled';
import { FlexedProps } from './types';
import { FlexItem } from './Item';

export type FlexProps = BoxProps & FlexedProps;

export class Flex extends React.PureComponent<FlexProps> {
  static Item = FlexItem;

  render() {
    const { as, ...rest } = this.props;

    return <StyledFlex forwardedAs={as} {...rest} />;
  }
}
