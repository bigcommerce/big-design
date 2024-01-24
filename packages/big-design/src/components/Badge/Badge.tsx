import React, { HTMLAttributes, memo } from 'react';

import { MarginProps } from '../../mixins';
import { withTransients } from '../../utils/withTransients';

import { StyledBadge } from './styled';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, MarginProps {
  label: string;
  variant?: 'danger' | 'secondary' | 'success' | 'warning' | 'primary';
}

export const Badge: React.FC<BadgeProps> = memo(({ className, style, label, ...props }) =>
  typeof label === 'string' ? <StyledBadge {...withTransients(props)}>{label}</StyledBadge> : null,
);

Badge.displayName = 'Badge';
