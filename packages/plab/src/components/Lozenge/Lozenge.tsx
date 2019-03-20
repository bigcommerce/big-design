import React from 'react';

import { StyledLozenge } from './styled';

export interface LozengeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'danger' | 'primary' | 'secondary' | 'success' | 'warning';
}

export const Lozenge: React.FC<LozengeProps> = ({ className, ...props }) => <StyledLozenge {...props} />;
