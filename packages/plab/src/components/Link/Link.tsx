import React from 'react';

import { StyledLink } from './styled';

export const Link: React.FunctionComponent<React.AnchorHTMLAttributes<{}>> = ({ className, style, ...props }) => (
  <StyledLink {...props} />
);
