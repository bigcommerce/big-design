import React, { memo } from 'react';

import { Small, TextProps } from '../../Typography';

export const FieldsetDescription: React.FC<TextProps> = memo(({ className, style, ...props }) => (
  <Small {...props} />
));
