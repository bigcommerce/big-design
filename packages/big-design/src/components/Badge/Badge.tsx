import { ThemeInterface } from '@bigcommerce/big-design-theme';
import React, { memo } from 'react';

import { MarginProps } from '../../mixins';

import { StyledBadge } from './styled';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, MarginProps {
  theme?: ThemeInterface;
  variant?: 'danger' | 'secondary' | 'success' | 'warning';
}

export const Badge: React.FC<BadgeProps> = memo(({ className, style, ...props }) => <StyledBadge {...props} />);

Badge.displayName = 'Badge';
