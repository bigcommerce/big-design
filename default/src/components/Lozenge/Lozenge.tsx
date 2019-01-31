import React from 'react';

import { StyledLozenge } from './styled';

export interface LozengeProps {
  variant?: 'danger' | 'primary' | 'secondary' | 'success' | 'warning';
}

export const Lozenge: React.SFC<LozengeProps> = props => <StyledLozenge {...props} />;
