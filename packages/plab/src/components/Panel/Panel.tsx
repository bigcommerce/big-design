import React from 'react';

import { StyledPanel } from './styled';

export const Panel: React.FC<React.HTMLAttributes<HTMLElement>> = ({ className, ...props }) => (
  <StyledPanel {...props} />
);
