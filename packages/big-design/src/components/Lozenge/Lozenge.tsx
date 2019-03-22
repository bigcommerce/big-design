import React from 'react';

import { MarginProps } from '../../mixins';

import { StyledLozenge } from './styled';

export interface LozengeProps extends React.HTMLAttributes<HTMLSpanElement>, MarginProps {
  variant?: 'danger' | 'primary' | 'secondary' | 'success' | 'warning';
}

export const Lozenge: React.FC<LozengeProps> = ({ className, style, ...props }) => <StyledLozenge {...props} />;
