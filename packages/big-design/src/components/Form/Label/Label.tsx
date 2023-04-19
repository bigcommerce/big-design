import React, { LabelHTMLAttributes } from 'react';

import { StyledLabel } from './styled';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  renderOptional?: boolean;
  optionalLabel?: string;
}

export const FormControlLabel: React.FC<LabelProps> = ({ className, style, ...props }) => (
  <StyledLabel {...props} />
);
