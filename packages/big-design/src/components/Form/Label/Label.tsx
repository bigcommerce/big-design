import React from 'react';

import { StyledLabel, StyledOptionalSpan } from './styled';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  renderOptional?: boolean;
}

export const Label: React.FC<LabelProps> = ({ children, className, renderOptional, style, ...props }) => (
  <StyledLabel {...props}>
    {children}
    {renderOptional && <StyledOptionalSpan> (optional)</StyledOptionalSpan>}
  </StyledLabel>
);
