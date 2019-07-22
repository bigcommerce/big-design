import React from 'react';

import { StyledCode } from './styled';

export interface CodeProps {
  variant?: 'primary' | 'secondary';
  highlight?: boolean;
}

export const Code: React.FC<CodeProps> = props => <StyledCode {...props} />;
