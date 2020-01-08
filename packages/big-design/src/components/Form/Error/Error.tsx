import React from 'react';

import { Small, TextProps } from '../../Typography';

export const FormControlError: React.FC<TextProps> = ({ className, style, ...props }) => (
  <Small color="danger" margin="none" marginLeft="xxSmall" {...props} />
);
