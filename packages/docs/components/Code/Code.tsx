import React from 'react';

import { StyledCode } from './styled';

export interface CodeProps {
  children?: React.ReactNode;
  primary?: boolean;
  highlight?: boolean;
}

export const Code: React.FC<CodeProps> = ({ highlight = true, primary, ...domProps }) => (
  <StyledCode $highlight={highlight} $primary={primary} {...domProps} />
);
