import React from 'react';

import { MarginProps } from '../../mixins';

import { StyledLink } from './styled';

export type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & MarginProps;

export const Link: React.FunctionComponent<LinkProps> = ({ className, style, ...props }) => <StyledLink {...props} />;
