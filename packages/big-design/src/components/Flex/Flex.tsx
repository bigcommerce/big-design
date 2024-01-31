import React, { forwardRef } from 'react';

import { withTransients } from '../../utils';
import { BoxProps } from '../Box';

import { StyledFlex } from './styled';
import { FlexedProps } from './types';

export type FlexProps = BoxProps & FlexedProps;

interface PrivateProps {
  readonly forwardedRef: React.Ref<HTMLDivElement>;
}

const RawFlex: React.FC<FlexProps & PrivateProps> = ({ forwardedRef, ...rest }) => (
  <StyledFlex ref={forwardedRef} {...withTransients(rest)} />
);

export const Flex = forwardRef<HTMLDivElement, FlexProps>((props, ref) => (
  <RawFlex {...props} forwardedRef={ref} />
));
