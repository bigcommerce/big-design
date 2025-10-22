import React from 'react';

import { StyledCode } from './styled';

export interface CodeProps {
  readonly children?: React.ReactNode;
  readonly primary?: boolean;
  readonly highlight?: boolean;
}

export const Code: React.FC<CodeProps> = (props) => <StyledCode {...props} />;

Code.defaultProps = { highlight: true };
