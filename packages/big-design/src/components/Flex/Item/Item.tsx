import React from 'react';

import { BoxProps } from '../../Box';
import { FlexedItemProps } from '../types';

import { StyledFlexItem } from './styled';

export type FlexItemProps = BoxProps & FlexedItemProps;

export const FlexItem: React.FC<FlexItemProps> = ({ as, ...props }) => <StyledFlexItem forwardedAs={as} {...props} />;
