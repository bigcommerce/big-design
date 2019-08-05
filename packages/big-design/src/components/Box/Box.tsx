import { Border, BorderRadius, Colors, Shadow } from '@bigcommerce/big-design-theme';
import React from 'react';

import { MarginProps, PaddingProps } from '../../mixins';

import { StyledBox } from './styled';

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement>, MarginProps, PaddingProps {
  backgroundColor?: keyof Colors;
  shadow?: keyof Shadow;
  border?: keyof Border;
  borderBottom?: keyof Border;
  borderLeft?: keyof Border;
  borderRight?: keyof Border;
  borderTop?: keyof Border;
  borderRadius?: keyof BorderRadius;
}

export const Box: React.FC<BoxProps> = props => <StyledBox {...props} />;
