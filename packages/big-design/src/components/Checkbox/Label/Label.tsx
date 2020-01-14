import React, { memo } from 'react';

import { StyledLabel, StyledLabelProps } from './styled';

export const CheckboxLabel: React.FC<StyledLabelProps> = memo(({ className, style, ...props }) => (
  <StyledLabel {...props} />
));
