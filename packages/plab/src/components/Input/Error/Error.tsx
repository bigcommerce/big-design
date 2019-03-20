import React from 'react';

import { StyledError } from './styled';

export const Error: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ className, ...props }) => (
  <StyledError {...props} />
);
