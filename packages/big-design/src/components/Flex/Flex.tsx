import React, { forwardRef } from 'react';

import { type BoxProps } from '../Box';

import { StyledFlex } from './styled';
import { type FlexedProps } from './types';
import { toTransientFlexedContainerProps } from './withFlex';

export type FlexProps = BoxProps & FlexedProps;

interface PrivateProps {
  forwardedRef: React.Ref<HTMLDivElement>;
}

// `display` is passed twice deliberately: StyledFlex composes over Box (a component, not
// a tag), so `display` also needs to reach Box's own internal $-prefixed handling
// untouched (its public contract), while `$display` feeds StyledFlex's own separate
// withDisplay() call on its outer layer.
const RawFlex: React.FC<FlexProps & PrivateProps> = (props) => {
  const {
    as,
    display,
    forwardedRef,
    alignContent,
    alignItems,
    flexColumnGap,
    flexDirection,
    flexGap,
    flexRowGap,
    flexWrap,
    justifyContent,
    ...domProps
  } = props;

  return (
    <StyledFlex
      $display={display}
      display={display}
      forwardedAs={as}
      ref={forwardedRef}
      {...domProps}
      {...toTransientFlexedContainerProps(props)}
    />
  );
};

export const Flex = forwardRef<HTMLDivElement, FlexProps>((props, ref) => (
  <RawFlex {...props} forwardedRef={ref} />
));
