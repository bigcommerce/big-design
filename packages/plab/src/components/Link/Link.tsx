import React from 'react';

import { StyledLink } from './styled';

export const Link: React.FunctionComponent<React.AnchorHTMLAttributes<{}>> = props => <StyledLink {...props} />;
