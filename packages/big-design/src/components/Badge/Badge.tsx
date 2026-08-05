import React, { ComponentPropsWithoutRef, memo } from 'react';

import { excludeMarginProps, MarginProps } from '../../helpers';
import { cn } from '../../helpers/cn';
import { marginPropsToClassName } from '../../helpers/margins/marginClasses';

export interface BadgeProps extends ComponentPropsWithoutRef<'span'>, MarginProps {
  label: string;
  variant?: 'danger' | 'secondary' | 'success' | 'warning' | 'primary';
}

const variantClasses: Record<NonNullable<BadgeProps['variant']>, string> = {
  secondary: 'bg-secondary60 text-white',
  success: 'bg-success50 text-white',
  warning: 'bg-warning40 text-secondary70',
  danger: 'bg-danger40 text-white',
  primary: 'bg-primary40 text-white',
};

export const Badge: React.FC<BadgeProps> = memo(
  ({ className, style, label, variant = 'secondary', ...props }) => {
    if (typeof label !== 'string') {
      return null;
    }

    const marginClassName = marginPropsToClassName(props);
    const domProps = excludeMarginProps(props);

    return (
      <span
        {...domProps}
        className={cn(
          'inline-block rounded-normal px-xSmall text-center text-badge font-semiBold leading-small uppercase align-middle',
          variantClasses[variant],
          marginClassName,
        )}
      >
        {label}
      </span>
    );
  },
);

Badge.displayName = 'Badge';
