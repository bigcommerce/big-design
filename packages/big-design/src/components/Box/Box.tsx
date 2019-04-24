import React from 'react';

import { MarginProps, PaddingProps } from '../../mixins';
import { Border, BorderRadius } from '../../theme/system/border';
import { Colors } from '../../theme/system/colors';
import { Elevation } from '../../theme/system/elevation';

import { StyledBox } from './styled';

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement>, MarginProps, PaddingProps {
  backgroundColor?: keyof Colors;
  elevation?: keyof Elevation;
  border?: keyof Border;
  borderBottom?: keyof Border;
  borderLeft?: keyof Border;
  borderRight?: keyof Border;
  borderTop?: keyof Border;
  borderRadius?: keyof BorderRadius;
}

export const Box: React.FC<BoxProps> = props => <StyledBox {...props} />;
