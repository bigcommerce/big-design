import React from 'react';

import { BoxProps } from '../../Box';
import { FlexItemMixin } from '../types';

import { StyledFlexItem } from './styled';

export type FlexItemProps = BoxProps & FlexItemMixin;

export const FlexItem: React.FC<FlexItemProps> = props => <StyledFlexItem {...props} />;
