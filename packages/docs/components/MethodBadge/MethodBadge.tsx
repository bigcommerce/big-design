import { MarginProps } from '@bigcommerce/big-design';
import React, { ComponentPropsWithoutRef } from 'react';

import { StyledMethodBadge } from './styled';

export interface MethodBadgeProps extends ComponentPropsWithoutRef<'div'>, MarginProps {
  readonly label: string;
}

export const MethodBadge: React.FC<MethodBadgeProps> = ({ className, style, label, ...props }) => (
  <StyledMethodBadge {...props}>{label}</StyledMethodBadge>
);
