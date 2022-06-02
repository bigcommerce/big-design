import React, { memo } from 'react';

import { StyledLabel, StyledLabelProps } from './styled';

export const CheckboxLabel: React.FC<StyledLabelProps> = memo(({ className, style, ...props }) => (
  // @ts-expect-error @todo refactor types
  <StyledLabel {...props} />
));
