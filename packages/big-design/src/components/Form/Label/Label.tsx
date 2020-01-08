import React from 'react';

import { StyledLabel } from './styled';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  renderOptional?: boolean;
}

export const FormControlLabel: React.FC<LabelProps> = ({ className, style, ...props }) => <StyledLabel {...props} />;
