import React, { forwardRef } from 'react';

import { withTransients } from '../../utils';
import { BoxProps } from '../Box';

import { StyledGrid } from './styled';
import { GridedProps } from './types';

export type GridProps = BoxProps & GridedProps;

interface PrivateProps {
  readonly forwardedRef: React.Ref<HTMLDivElement>;
}

const RawGrid: React.FC<GridProps & PrivateProps> = ({ forwardedRef, ...rest }) => (
  <StyledGrid ref={forwardedRef} {...withTransients(rest)} />
);

export const Grid = forwardRef<HTMLDivElement, GridProps>((props, ref) => (
  <RawGrid {...props} forwardedRef={ref} />
));
