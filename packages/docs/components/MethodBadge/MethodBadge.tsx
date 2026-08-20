import { type MarginProps } from '@bigcommerce/big-design';
import React, { type ComponentPropsWithoutRef } from 'react';

import { StyledMethodBadge } from './styled';

export interface MethodBadgeProps extends ComponentPropsWithoutRef<'div'>, MarginProps {
  label: string;
}

export const MethodBadge: React.FC<MethodBadgeProps> = ({
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
