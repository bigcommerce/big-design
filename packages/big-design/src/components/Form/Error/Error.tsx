import React from 'react';

import { Small, SmallProps } from '../../Typography';

export const Error: React.FC<SmallProps> = ({ className, style, ...props }) => (
  <Small color="danger" margin="none" marginLeft="xxSmall" {...props} />
);
