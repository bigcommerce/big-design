import React, { type ComponentPropsWithoutRef, memo } from 'react';

import type { MarginProps } from '../../helpers';
import { toTransientMarginProps } from '../../helpers/margins/margins';

import { StyledBadge } from './styled';

export interface BadgeProps extends ComponentPropsWithoutRef<'span'>, MarginProps {
  label: string;
  variant?: 'danger' | 'secondary' | 'success' | 'warning' | 'primary' | 'primary-subtle';
  size?: 'small' | 'normal';
}

export const Badge: React.FC<BadgeProps> = memo((props) => {
  const {
    className,
    style,
    label,
    variant,
    size,
    margin,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    marginVertical,
    marginHorizontal,
    ...domProps
  } = props;

  return typeof label === 'string' ? (
    <StyledBadge
      {...domProps}
      {...toTransientMarginProps(props)}
      $size={size ?? 'normal'}
      $variant={variant ?? 'secondary'}
    >
      {label}
    </StyledBadge>
  ) : null;
});

Badge.displayName = 'Badge';
