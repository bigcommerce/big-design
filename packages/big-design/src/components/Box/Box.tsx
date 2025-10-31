import { Border, BorderRadius, Colors, Shadow, ZIndex } from '@bigcommerce/big-design-theme';
import React, { ComponentPropsWithoutRef, forwardRef, memo } from 'react';

import { DisplayProps, MarginProps, PaddingProps } from '../../helpers';

import { StyledBox } from './styled';

export interface BoxProps
  extends ComponentPropsWithoutRef<'div'>,
    DisplayProps,
    MarginProps,
    PaddingProps {
  as?: keyof React.JSX.IntrinsicElements | React.ComponentType<any>;
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

const RawBox: React.FC<BoxProps & PrivateProps> = (props) => (
  <StyledBox ref={props.forwardedRef} {...props} />
);

export const Box = memo(
  forwardRef<HTMLDivElement, BoxProps>((props, ref) => <RawBox {...props} forwardedRef={ref} />),
);

Box.displayName = 'Box';
