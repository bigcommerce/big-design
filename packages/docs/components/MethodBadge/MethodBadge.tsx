import type { MarginProps } from '@bigcommerce/big-design';
// eslint-disable-next-line import/no-duplicates -- React below is a genuine value import; the rest is type-only
import React from 'react';
// eslint-disable-next-line import/no-duplicates -- see above
import type { ComponentPropsWithoutRef, FC } from 'react';

import { StyledMethodBadge } from './styled';

export interface MethodBadgeProps extends ComponentPropsWithoutRef<'div'>, MarginProps {
  label: string;
}

export const MethodBadge: FC<MethodBadgeProps> = ({
  className,
  style,
  label,
  margin,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  marginVertical,
  marginHorizontal,
  ...props
}) => (
  <StyledMethodBadge
    {...props}
    $margin={margin}
    $marginBottom={marginBottom}
    $marginHorizontal={marginHorizontal}
    $marginLeft={marginLeft}
    $marginRight={marginRight}
    $marginTop={marginTop}
    $marginVertical={marginVertical}
  >
    {label}
  </StyledMethodBadge>
);
