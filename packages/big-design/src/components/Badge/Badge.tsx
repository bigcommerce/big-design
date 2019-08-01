import React from 'react';

import { MarginProps } from '../../mixins';

import { StyledBadge } from './styled';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, MarginProps {
  variant?: 'danger' | 'secondary' | 'success' | 'warning';
}

export const Badge: React.FC<BadgeProps> = ({ className, style, ...props }) => <StyledBadge {...props} />;
