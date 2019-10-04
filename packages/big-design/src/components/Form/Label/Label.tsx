import React from 'react';

import { StyledLabel } from './styled';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  renderOptional?: boolean;
}

export const Label: React.FC<LabelProps> = ({ className, style, ...props }) => <StyledLabel {...props} />;
