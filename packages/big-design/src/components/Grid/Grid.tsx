import React from 'react';

import { BoxProps } from '../Box';

import { StyledGrid } from './styled';
import { GridedProps } from './types';

export type GridProps = BoxProps & GridedProps;

interface PrivateProps {
  forwardedRef: React.Ref<HTMLDivElement>;
}

const RawGrid: React.FC<GridProps & PrivateProps> = React.forwardRef<HTMLDivElement, GridProps & PrivateProps>(
  ({ as, ...rest }, ref) => <StyledGrid forwardedAs={as} forwardedRef={ref} {...rest} />,
);

export const Grid = React.forwardRef<HTMLDivElement, GridProps>((props, ref) => (
  <RawGrid {...props} forwardedRef={ref} />
));
