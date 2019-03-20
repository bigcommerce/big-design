import React from 'react';

import { StyledPanel } from './styled';

export const Panel: React.FC<React.HTMLAttributes<HTMLElement>> = ({ className, style, ...props }) => (
  <StyledPanel {...props} />
);
