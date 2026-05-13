import React, { forwardRef } from 'react';

import { BoxProps } from '../Box';

import { StyledFlex } from './styled';
import { FlexedProps } from './types';

export type FlexProps = BoxProps & FlexedProps;

interface PrivateProps {
  forwardedRef: React.Ref<HTMLDivElement>;
}

const RawFlex: React.FC<FlexProps & PrivateProps> = ({
  alignContent = 'stretch',
  alignItems = 'stretch',
  as,
  flexDirection = { mobile: 'column', tablet: 'row' },
  flexWrap = 'nowrap',
  forwardedRef,
  justifyContent = 'flex-start',
  ...rest
}) => (
  <StyledFlex
    alignContent={alignContent}
    alignItems={alignItems}
    flexDirection={flexDirection}
    flexWrap={flexWrap}
    forwardedAs={as}
    justifyContent={justifyContent}
    ref={forwardedRef}
    {...rest}
  />
);

export const Flex = forwardRef<HTMLDivElement, FlexProps>((props, ref) => (
  <RawFlex {...props} forwardedRef={ref} />
));
