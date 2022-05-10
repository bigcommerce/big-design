import { Border, BorderRadius, Colors, Shadow, ZIndex } from '@bigcommerce/big-design-theme';
import React, { forwardRef, HTMLAttributes, memo } from 'react';

import { DisplayProps, MarginProps, PaddingProps } from '../../mixins';

import { StyledBox } from './styled';

export interface BoxProps
  extends HTMLAttributes<HTMLDivElement>,
    DisplayProps,
    MarginProps,
    PaddingProps {
  as?: keyof JSX.IntrinsicElements | React.ComponentType<unknown>;
  backgroundColor?: keyof Colors;
  shadow?: keyof Shadow;
  border?: keyof Border;
  borderBottom?: keyof Border;
  borderLeft?: keyof Border;
  borderRight?: keyof Border;
  borderTop?: keyof Border;
  borderRadius?: keyof BorderRadius;
  clearfix?: boolean;
  zIndex?: keyof ZIndex;
}

interface PrivateProps {
  forwardedRef: React.Ref<HTMLDivElement>;
}

const RawBox: React.FC<BoxProps & PrivateProps> = ({ forwardedRef, ...rest }) => (
  <StyledBox ref={forwardedRef} {...rest} />
);

export const Box = memo(
  forwardRef<HTMLDivElement, BoxProps>((props, ref) => <RawBox {...props} forwardedRef={ref} />),
);

Box.displayName = 'Box';
