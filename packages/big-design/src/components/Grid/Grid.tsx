import React, { forwardRef } from 'react';

import { BoxProps } from '../Box';

import { StyledGrid } from './styled';
import { GridedProps } from './types';

export type GridProps = BoxProps & GridedProps;

interface PrivateProps {
  forwardedRef: React.Ref<HTMLDivElement>;
}

// `display` is passed twice deliberately: StyledGrid composes over Box (a component, not
// a tag), so `display` also needs to reach Box's own internal $-prefixed handling
// untouched (its public contract), while `$display` feeds StyledGrid's own separate
// withDisplay() call on its outer layer.
const RawGrid: React.FC<GridProps & PrivateProps> = ({ as, display, forwardedRef, ...rest }) => (
  <StyledGrid $display={display} display={display} forwardedAs={as} ref={forwardedRef} {...rest} />
);

export const Grid = forwardRef<HTMLDivElement, GridProps>((props, ref) => (
  <RawGrid {...props} forwardedRef={ref} />
));
