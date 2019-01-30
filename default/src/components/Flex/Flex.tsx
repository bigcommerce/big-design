import React, { CSSProperties } from 'react';

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
  styles?: CSSProperties;
}

export const Flex: React.SFC<FlexProps> = props => <StyledFlex {...props} />;
