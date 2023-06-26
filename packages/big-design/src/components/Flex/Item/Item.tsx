'use client';

import React, { forwardRef } from 'react';

import { BoxProps } from '../../Box';
import { FlexedItemProps } from '../types';

import { StyledFlexItem } from './styled';

interface PrivateProps {
  forwardedRef: React.Ref<HTMLDivElement>;
}

export type FlexItemProps = BoxProps & FlexedItemProps;

const RawFlexItem: React.FC<FlexItemProps & PrivateProps> = ({ as, forwardedRef, ...props }) => (
  <StyledFlexItem forwardedAs={as} ref={forwardedRef} {...props} />
);

export const FlexItem = forwardRef<HTMLDivElement, FlexItemProps>((props, ref) => (
  <RawFlexItem {...props} forwardedRef={ref} />
));
