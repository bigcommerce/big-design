import React, { memo } from 'react';

import { StyledLabel, StyledLabelProps } from './styled';

export const RadioLabel: React.FC<StyledLabelProps> = memo(({ className, style, ...props }) => (
  // @ts-expect-error @todo refactor styled label types
  <StyledLabel {...props} />
));
