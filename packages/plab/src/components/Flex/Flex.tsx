import React from 'react';

import { StyledFlex } from './styled';

export interface FlexProps {
  alignItems?: 'normal' | 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'baseline';
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justifyContent?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'left'
    | 'right'
    | 'normal'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'stretch';
}

export const Flex: React.FC<FlexProps> = props => <StyledFlex {...props} />;
