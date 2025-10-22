import { Border, BorderRadius, Colors, Shadow, ZIndex } from '@bigcommerce/big-design-theme';
import React, { ComponentPropsWithoutRef, forwardRef, memo } from 'react';

import { DisplayProps, MarginProps, PaddingProps } from '../../helpers';

import { StyledBox } from './styled';

export interface BoxProps
  extends ComponentPropsWithoutRef<'div'>,
    DisplayProps,
    MarginProps,
    PaddingProps {
  readonly as?: keyof React.JSX.IntrinsicElements | React.ComponentType<any>;
  readonly backgroundColor?: keyof Colors;
  readonly shadow?: keyof Shadow;
  readonly border?: keyof Border;
  readonly borderBottom?: keyof Border;
  readonly borderLeft?: keyof Border;
  readonly borderRight?: keyof Border;
  readonly borderTop?: keyof Border;
  readonly borderRadius?: keyof BorderRadius;
  readonly clearfix?: boolean;
  readonly zIndex?: keyof ZIndex;
}

interface PrivateProps {
  readonly forwardedRef: React.Ref<HTMLDivElement>;
}

const RawBox: React.FC<BoxProps & PrivateProps> = (props) => (
  <StyledBox ref={props.forwardedRef} {...props} />
);

export const Box = memo(
  forwardRef<HTMLDivElement, BoxProps>((props, ref) => <RawBox {...props} forwardedRef={ref} />),
);

Box.displayName = 'Box';
