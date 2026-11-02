import React, { type ComponentPropsWithoutRef, memo } from 'react';

import type { MarginProps } from '../../helpers';
import { toTransientMarginProps } from '../../helpers/margins/margins';

import { StyledBadge } from './styled';

export type BadgeVariant = 'danger' | 'secondary' | 'success' | 'warning' | 'primary';

// Variants that support `subtle`. `getVariantColors` is typed against this, so it must define a
// `subtle` style for exactly these variants.
export type SubtleBadgeVariant = Extract<BadgeVariant, 'primary'>;

type BadgeVariantProps =
  | { variant: SubtleBadgeVariant; subtle?: boolean }
  | { variant?: Exclude<BadgeVariant, SubtleBadgeVariant>; subtle?: never };

export type BadgeProps = ComponentPropsWithoutRef<'span'> &
  MarginProps &
  BadgeVariantProps & {
    label: string;
    size?: 'small' | 'medium';
  };

export const Badge: React.FC<BadgeProps> = memo((props) => {
  const {
    className,
    style,
    label,
    variant,
    size,
    subtle,
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
      $size={size ?? 'medium'}
      $subtle={subtle}
      $variant={variant ?? 'secondary'}
    >
      {label}
    </StyledBadge>
  ) : null;
});

Badge.displayName = 'Badge';
