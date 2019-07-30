import React from 'react';

import { FlexItemMixin } from '../../../mixins';
import { BoxProps } from '../../Box';

import { StyledFlexItem } from './styled';

export type FlexItemProps = BoxProps & FlexItemMixin;

export const FlexItem: React.FC<FlexItemProps> = props => <StyledFlexItem {...props} />;
