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

export const Box: React.FC<BoxProps> = memo(
  React.forwardRef<HTMLDivElement, BoxProps>((props, ref) => <StyledBox forwardedRef={ref} {...props} />),
);

Box.displayName = 'Box';
