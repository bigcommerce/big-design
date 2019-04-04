import React from 'react';

import { BoxProps } from '../../Box';

import { StyledFlexItem } from './styled';

export type FlexItemProps = BoxProps &
  Partial<{
    alignSelf: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
    basis: 'auto' | 'fill' | 'min-content' | 'max-content' | 'fit-content' | 'content' | string;
    grow: number;
    order: number;
    shrink: number;
  }>;

export const FlexItem: React.FC<FlexItemProps> = props => <StyledFlexItem {...props} />;
