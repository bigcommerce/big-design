import React, { forwardRef } from 'react';

import { BoxProps } from '../Box';

import { StyledFlex } from './styled';
import { FlexedProps } from './types';

export type FlexProps = BoxProps & FlexedProps;

interface PrivateProps {
  forwardedRef: React.Ref<HTMLDivElement>;
}

const RawFlex: React.FC<FlexProps & PrivateProps> = ({ as, display, forwardedRef, ...rest }) => (
  <StyledFlex $display={display} display={display} forwardedAs={as} ref={forwardedRef} {...rest} />
);

export const Flex = forwardRef<HTMLDivElement, FlexProps>((props, ref) => (
  <RawFlex {...props} forwardedRef={ref} />
));
