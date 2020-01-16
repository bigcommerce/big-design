import React from 'react';

import { BoxProps } from '../Box';

import { StyledFlex } from './styled';
import { FlexedProps } from './types';

export type FlexProps = BoxProps & FlexedProps;

interface PrivateProps {
  forwardedRef: React.Ref<HTMLDivElement>;
}

const RawFlex: React.FC<FlexProps & PrivateProps> = React.forwardRef<HTMLDivElement, FlexProps & PrivateProps>(
  ({ as, ...rest }, ref) => <StyledFlex forwardedAs={as} forwardedRef={ref} {...rest} />,
);

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>((props, ref) => (
  <RawFlex {...props} forwardedRef={ref} />
));
