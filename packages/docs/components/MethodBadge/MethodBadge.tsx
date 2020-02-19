import { MarginProps } from '@bigcommerce/big-design';
import React from 'react';

import { StyledMethodBadge } from './styled';

export interface MethodBadgeProps extends React.HTMLAttributes<HTMLDivElement>, MarginProps {
  label: string;
}

export const MethodBadge: React.FC<MethodBadgeProps> = ({ className, style, label, ...props }) => (
  <StyledMethodBadge {...props}>{label}</StyledMethodBadge>
);
