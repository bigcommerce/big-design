import React from 'react';

import { BoxProps } from '../../Box';
import { FlexedItemProps } from '../types';

import { StyledFlexItem } from './styled';

interface PrivateProps {
  forwardedRef: React.Ref<HTMLDivElement>;
}

export type FlexItemProps = BoxProps & FlexedItemProps;

const RawFlexItem: React.FC<FlexItemProps & PrivateProps> = ({ as, forwardedRef, ...props }) => (
  <StyledFlexItem ref={forwardedRef} forwardedAs={as} {...props} />
);

export const FlexItem = React.forwardRef<HTMLDivElement, FlexItemProps>((props, ref) => (
  <RawFlexItem {...props} forwardedRef={ref} />
));
