import { theme } from '@bigcommerce/big-design-theme';
import React, { forwardRef } from 'react';

import { BoxProps } from '../Box';

import { StyledGrid } from './styled';
import { GridedProps } from './types';

export type GridProps = BoxProps & GridedProps;

interface PrivateProps {
  forwardedRef: React.Ref<HTMLDivElement>;
}

const RawGrid: React.FC<GridProps & PrivateProps> = ({
  as,
  forwardedRef,
  gridGap = theme.spacing.medium,
  ...rest
}) => <StyledGrid forwardedAs={as} gridGap={gridGap} ref={forwardedRef} {...rest} />;

export const Grid = forwardRef<HTMLDivElement, GridProps>((props, ref) => (
  <RawGrid {...props} forwardedRef={ref} />
));
