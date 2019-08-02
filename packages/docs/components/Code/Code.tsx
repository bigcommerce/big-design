import React from 'react';

import { StyledCode } from './styled';

export interface CodeProps {
  primary?: boolean;
  highlight?: boolean;
}

export const Code: React.FC<CodeProps> = props => <StyledCode {...props} />;

Code.defaultProps = { highlight: true };
