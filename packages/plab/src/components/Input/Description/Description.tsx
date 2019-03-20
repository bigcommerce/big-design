import React from 'react';

import { StyledDescription } from './styled';

export const Description: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ className, ...props }) => (
  <StyledDescription {...props} />
);
