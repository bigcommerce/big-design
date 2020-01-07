import React from 'react';

import { BoxProps } from '../Box';

import { StyledFlex } from './styled';
import { FlexedProps } from './types';

export type FlexProps = BoxProps & FlexedProps;

export const Flex: React.FC<FlexProps> = ({ as, ...rest }) => <StyledFlex forwardedAs={as} {...rest} />;
