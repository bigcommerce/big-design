import React, { ComponentPropsWithoutRef, memo } from 'react';

import { MarginProps } from '../../mixins';

import { StyledBadge } from './styled';

export interface BadgeProps extends ComponentPropsWithoutRef<'span'>, MarginProps {
  label: string;
  variant?: 'danger' | 'secondary' | 'success' | 'warning' | 'primary';
}

export const Badge: React.FC<BadgeProps> = memo(({ className, style, label, ...props }) =>
  typeof label === 'string' ? <StyledBadge {...props}>{label}</StyledBadge> : null,
);

Badge.displayName = 'Badge';
