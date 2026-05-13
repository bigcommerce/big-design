import React, { forwardRef } from 'react';

import { BoxProps } from '../../Box';
import { FlexedItemProps } from '../types';

import { StyledFlexItem } from './styled';

interface PrivateProps {
  forwardedRef: React.Ref<HTMLDivElement>;
}

export type FlexItemProps = BoxProps & FlexedItemProps;

const RawFlexItem: React.FC<FlexItemProps & PrivateProps> = ({
  alignSelf = 'auto',
  as,
  flexBasis = 'auto',
  flexGrow = 0,
  flexOrder = 0,
  flexShrink = 1,
  forwardedRef,
  ...props
}) => (
  <StyledFlexItem
    alignSelf={alignSelf}
    flexBasis={flexBasis}
    flexGrow={flexGrow}
    flexOrder={flexOrder}
    flexShrink={flexShrink}
    forwardedAs={as}
    ref={forwardedRef}
    {...props}
  />
);

export const FlexItem = forwardRef<HTMLDivElement, FlexItemProps>((props, ref) => (
  <RawFlexItem {...props} forwardedRef={ref} />
));
