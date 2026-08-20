import React, { forwardRef } from 'react';

import { type BoxProps } from '../../Box';
import { type FlexedItemProps } from '../types';
import { toTransientFlexedItemProps } from '../withFlex';

import { StyledFlexItem } from './styled';

interface PrivateProps {
  forwardedRef: React.Ref<HTMLDivElement>;
}

export type FlexItemProps = BoxProps & FlexedItemProps;

const RawFlexItem: React.FC<FlexItemProps & PrivateProps> = (props) => {
  const { as, forwardedRef, alignSelf, flexBasis, flexGrow, flexOrder, flexShrink, ...domProps } =
    props;

  return (
    <StyledFlexItem
      forwardedAs={as}
      ref={forwardedRef}
      {...domProps}
      {...toTransientFlexedItemProps(props)}
    />
  );
};

export const FlexItem = forwardRef<HTMLDivElement, FlexItemProps>((props, ref) => (
  <RawFlexItem {...props} forwardedRef={ref} />
));
