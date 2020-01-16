import { Border, BorderRadius, Colors, Shadow } from '@bigcommerce/big-design-theme';
import React, { memo } from 'react';

import { DisplayProps, MarginProps, PaddingProps } from '../../mixins';

import { StyledBox } from './styled';

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement>, DisplayProps, MarginProps, PaddingProps {
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  backgroundColor?: keyof Colors;
  shadow?: keyof Shadow;
  border?: keyof Border;
  borderBottom?: keyof Border;
  borderLeft?: keyof Border;
  borderRight?: keyof Border;
  borderTop?: keyof Border;
  borderRadius?: keyof BorderRadius;
}

interface PrivateProps {
  forwardedRef: React.Ref<HTMLDivElement>;
}

const RawBox: React.FC<BoxProps & PrivateProps> = memo(
  React.forwardRef<HTMLDivElement, BoxProps & PrivateProps>((props, ref) => (
    <StyledBox forwardedRef={ref} {...props} />
  )),
);

export const Box = React.forwardRef<HTMLDivElement, BoxProps>((props, ref) => <RawBox {...props} forwardedRef={ref} />);

Box.displayName = 'Box';
