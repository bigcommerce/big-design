import React, { forwardRef } from 'react';

import { BoxProps } from '../Box';

import { StyledFlex } from './styled';
import { FlexedProps } from './types';

export type FlexProps = BoxProps & FlexedProps;

interface PrivateProps {
  forwardedRef: React.Ref<HTMLDivElement>;
}

// `display` is passed twice deliberately: StyledFlex composes over Box (a component, not
// a tag), so `display` also needs to reach Box's own internal $-prefixed handling
// untouched (its public contract), while `$display` feeds StyledFlex's own separate
// withDisplay() call on its outer layer.
const RawFlex: React.FC<FlexProps & PrivateProps> = ({ as, display, forwardedRef, ...rest }) => (
  <StyledFlex $display={display} display={display} forwardedAs={as} ref={forwardedRef} {...rest} />
);

export const Flex = forwardRef<HTMLDivElement, FlexProps>((props, ref) => (
  <RawFlex {...props} forwardedRef={ref} />
));
