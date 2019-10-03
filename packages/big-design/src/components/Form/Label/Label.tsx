import React from 'react';

import { StyledLabel, StyledSpan } from './styled';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  renderOptional?: boolean;
}

export const Label: React.FC<LabelProps> = ({ children, className, renderOptional, style, ...props }) => (
  <StyledLabel {...props}>
    {children}
    {renderOptional && <StyledSpan> (optional)</StyledSpan>}
  </StyledLabel>
);
